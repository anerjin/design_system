import { Icon } from './Icon';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { cx } from './utils';
import { Select } from './Select';
import { Dropdown } from './Dropdown';
import { Swap } from './Swap';

/** daisyUI 내장 테마 35종 */
export const DAISY_THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
  'caramellatte',
  'abyss',
  'silk',
] as const;

export type DaisyTheme = (typeof DAISY_THEMES)[number];

export type ThemeControllerVariant = 'select' | 'dropdown' | 'toggle';

/**
 * DOI INC 기본 테마.
 * `src/styles/bricks.css`의 `--default` 지정과 같은 값이어야 한다.
 */
export const DEFAULT_THEME = 'bricks-light';
const BRICKS_THEMES = ['bricks-light', 'bricks-dark', ...DAISY_THEMES];

const DEFAULT_STORAGE_KEY = 'bricks-theme';

export interface ThemeControllerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * 고를 수 있는 테마 목록
   * @default 내장 35종 전부
   */
  themes?: readonly string[];

  /** 선택된 테마 (제어) */
  value?: string;

  /**
   * 처음 테마. 저장된 값이 있으면 그쪽이 우선한다.
   * @default 'bricks-light'
   */
  defaultValue?: string;

  /**
   * 표시 형태.
   * `toggle`은 밝은 테마와 어두운 테마 둘 사이만 오간다.
   * @default 'select'
   */
  variant?: ThemeControllerVariant;

  /** `variant="toggle"`에서 쓸 두 테마 */
  toggleThemes?: [light: string, dark: string];

  /**
   * localStorage 키. `null`을 주면 저장하지 않는다.
   * @default 'bricks-theme'
   */
  storageKey?: string | null;

  /** 테마가 바뀔 때 호출된다 */
  onChange?: (theme: string) => void;
}

/**
 * DOI INC ThemeController — daisyUI 테마 전환
 *
 * daisyUI의 `.theme-controller` 클래스는 CSS만으로 동작하지만, daisyUI가
 * `:has()` 셀렉터를 **기본 테마와 prefersdark 테마 두 개에만** 내보낸다.
 * 35종 전부를 고를 수 있게 하려면 `data-theme`을 직접 세팅해야 해서
 * 이 컴포넌트는 JS로 동작한다.
 *
 * @example
 * ```tsx
 * <ThemeController />
 * <ThemeController variant="toggle" />
 * <ThemeController variant="dropdown" themes={['light', 'dark', 'nord', 'dracula']} />
 * ```
 */
export const ThemeController = forwardRef<HTMLDivElement, ThemeControllerProps>(
  (
    {
      themes = BRICKS_THEMES,
      value,
      defaultValue = DEFAULT_THEME,
      variant = 'select',
      toggleThemes = [DEFAULT_THEME, 'bricks-dark'],
      storageKey = DEFAULT_STORAGE_KEY,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [innerTheme, setInnerTheme] = useState(defaultValue);
    const theme = isControlled ? value : innerTheme;

    // 저장된 테마를 처음 한 번 읽어 온다
    useEffect(() => {
      if (isControlled || !storageKey) return;
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) setInnerTheme(saved);
      } catch {
        // 저장소를 막아 둔 브라우저에서는 그냥 기본값을 쓴다
      }
    }, [isControlled, storageKey]);

    // 실제 적용
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const apply = useCallback(
      (next: string) => {
        if (!isControlled) setInnerTheme(next);
        if (storageKey) {
          try {
            localStorage.setItem(storageKey, next);
          } catch {
            // 저장 실패는 무시한다 — 화면 전환에는 영향이 없다
          }
        }
        onChange?.(next);
      },
      [isControlled, storageKey, onChange],
    );

    if (variant === 'toggle') {
      const [lightTheme, darkTheme] = toggleThemes;

      return (
        <div ref={ref} className={className} {...props}>
          <Swap
            effect="rotate"
            label="테마 전환"
            checked={theme === darkTheme}
            onChange={(checked) => apply(checked ? darkTheme : lightTheme)}
            on={<Icon name="moon" size="1em" className="text-xl" />}
            off={<Icon name="sun" size="1em" className="text-xl" />}
          />
        </div>
      );
    }

    if (variant === 'dropdown') {
      return (
        <div ref={ref} className={className} {...props}>
          <Dropdown
            label={theme}
            align="end"
            menuClassName="max-h-80 flex-nowrap overflow-y-auto"
            items={themes.map((name) => ({
              key: name,
              label: name,
              active: name === theme,
              onClick: () => apply(name),
            }))}
          />
        </div>
      );
    }

    return (
      <div ref={ref} className={cx('inline-block', className)} {...props}>
        <Select
          aria-label="테마 선택"
          value={theme}
          onChange={(event) => apply(event.target.value)}
          options={themes.map((name) => ({ value: name, label: name }))}
        />
      </div>
    );
  },
);

ThemeController.displayName = 'ThemeController';

export default ThemeController;
