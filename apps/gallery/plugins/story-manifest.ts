import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import type { Plugin } from 'vite';
const PUBLIC_ID = 'virtual:doi-stories';
const INTERNAL_ID = '\0' + PUBLIC_ID;

/** Build metadata without executing stories; load interactive code on demand. */
export function storyManifest(directory: string): Plugin {
  function manifest() {
    return fs
      .readdirSync(directory)
      .filter((file) => file.endsWith('.stories.tsx'))
      .map((file) => {
        const source = fs.readFileSync(path.join(directory, file), 'utf8');
        const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
        const variables = new Map<string, ts.Expression>();
        for (const statement of ast.statements) {
          if (!ts.isVariableStatement(statement)) continue;
          for (const declaration of statement.declarationList.declarations) {
            if (ts.isIdentifier(declaration.name) && declaration.initializer)
              variables.set(declaration.name.text, declaration.initializer);
          }
        }
        function resolve(
          node: ts.Expression | undefined,
          seen = new Set<string>(),
        ): ts.Expression | undefined {
          if (!node) return undefined;
          if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node))
            return resolve(node.expression, seen);
          if (ts.isIdentifier(node) && variables.has(node.text) && !seen.has(node.text)) {
            seen.add(node.text);
            return resolve(variables.get(node.text), seen);
          }
          return node;
        }
        function property(node: ts.Expression | undefined, name: string): ts.Expression | undefined {
          const resolved = resolve(node);
          if (!resolved || !ts.isObjectLiteralExpression(resolved)) return undefined;
          const found = resolved.properties.find(
            (prop) =>
              (ts.isPropertyAssignment(prop) || ts.isShorthandPropertyAssignment(prop)) &&
              (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) &&
              prop.name.text === name,
          );
          if (found && ts.isPropertyAssignment(found)) return found.initializer;
          if (found && ts.isShorthandPropertyAssignment(found)) return resolve(found.name);
          return undefined;
        }
        function literal(node: ts.Expression | undefined): unknown {
          const value = resolve(node);
          if (!value) return undefined;
          if (ts.isStringLiteralLike(value)) return value.text;
          if (ts.isNumericLiteral(value)) return Number(value.text);
          if (value.kind === ts.SyntaxKind.TrueKeyword) return true;
          if (value.kind === ts.SyntaxKind.FalseKeyword) return false;
          if (ts.isArrayLiteralExpression(value)) return value.elements.map((item) => literal(item));
          if (ts.isObjectLiteralExpression(value))
            return Object.fromEntries(
              value.properties.flatMap((prop) => {
                if (ts.isShorthandPropertyAssignment(prop)) return [[prop.name.text, literal(prop.name)]];
                if (
                  !ts.isPropertyAssignment(prop) ||
                  (!ts.isIdentifier(prop.name) && !ts.isStringLiteral(prop.name))
                )
                  return [];
                return [[prop.name.text, literal(prop.initializer)]];
              }),
            );
          return undefined;
        }
        const defaultExport = ast.statements.find(ts.isExportAssignment);
        const meta = defaultExport ? resolve(defaultExport.expression) : undefined;
        const title = literal(property(meta, 'title'));
        if (typeof title !== 'string') throw new Error(file + ': missing story title');
        const [category, name] = title.split('/');
        const id = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        const component = property(meta, 'component');
        const componentImport =
          component && ts.isIdentifier(component)
            ? ast.statements.filter(ts.isImportDeclaration).find((statement) => {
                const bindings = statement.importClause?.namedBindings;
                return (
                  bindings &&
                  ts.isNamedImports(bindings) &&
                  bindings.elements.some((element) => element.name.text === component.text)
                );
              })
            : undefined;
        const componentModule =
          componentImport && ts.isStringLiteral(componentImport.moduleSpecifier)
            ? componentImport.moduleSpecifier.text
            : undefined;
        const componentPath = componentModule?.startsWith('./')
          ? ['.tsx', '.ts']
              .map((extension) => path.resolve(directory, componentModule + extension))
              .find((candidate) => fs.existsSync(candidate))
          : undefined;
        const parameters = property(meta, 'parameters');
        const gallery = literal(property(parameters, 'gallery')) as Record<string, unknown> | undefined;
        const examples = ast.statements.flatMap((statement) => {
          if (
            !ts.isVariableStatement(statement) ||
            !statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
          )
            return [];
          return statement.declarationList.declarations.flatMap((declaration) => {
            if (
              !ts.isIdentifier(declaration.name) ||
              !declaration.type ||
              !/^Story(?:Obj)?(?:<|$)/.test(declaration.type.getText(ast))
            )
              return [];
            const exportName = declaration.name.text;
            const layout =
              literal(property(property(declaration.initializer, 'parameters'), 'layout')) ??
              literal(property(parameters, 'layout'));
            const comments = ts.getJSDocCommentsAndTags(statement).filter(ts.isJSDoc);
            const description = comments
              .map((comment) =>
                typeof comment.comment === 'string'
                  ? comment.comment
                  : (comment.comment?.map((part) => part.text).join('') ?? ''),
              )
              .join(' ')
              .trim();
            return [
              {
                exportName,
                title:
                  literal(property(declaration.initializer, 'name')) ??
                  exportName.replace(/_$/, '').replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
                description: description || undefined,
                // AST boundaries preserve braces inside JSX, strings and comments.
                code: statement.getText(ast),
                layout: layout === 'centered' || layout === 'fullscreen' ? layout : 'padded',
              },
            ];
          });
        });
        return {
          path: '../../../../packages/bricks/src/react/' + file,
          id,
          pageId: 'DOI-C-' + id.toUpperCase(),
          sourcePath: 'packages/bricks/src/react/' + file,
          componentPath: componentPath
            ? 'packages/bricks/src/react/' + path.basename(componentPath)
            : undefined,
          name,
          category,
          description: gallery?.description ?? '',
          daisyui: gallery?.daisyui,
          props: gallery?.props,
          storyId:
            title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '') + '--docs',
          examples,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  const isStory = (file: string) =>
    path.resolve(path.dirname(file)) === directory && file.endsWith('.stories.tsx');
  return {
    name: 'doi-story-manifest',
    resolveId(id) {
      return id === PUBLIC_ID ? INTERNAL_ID : undefined;
    },
    load(id) {
      if (id !== INTERNAL_ID) return undefined;
      this.addWatchFile(directory);
      return 'export default ' + JSON.stringify(manifest());
    },
    handleHotUpdate({ file, server }) {
      if (!isStory(file)) return;
      const module = server.moduleGraph.getModuleById(INTERNAL_ID);
      if (module) server.moduleGraph.invalidateModule(module);
      server.ws.send({ type: 'full-reload' });
    },
    configureServer(server) {
      const refresh = (file: string) => {
        if (!isStory(file)) return;
        const module = server.moduleGraph.getModuleById(INTERNAL_ID);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', refresh).on('unlink', refresh);
      server.httpServer?.once('close', () => {
        server.watcher.off('add', refresh).off('unlink', refresh);
      });
    },
  };
}
