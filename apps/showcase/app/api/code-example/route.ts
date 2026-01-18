import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');

  if (!path) {
    return new NextResponse('Path is required', { status: 400 });
  }

  // Security: prevent path traversal
  if (path.includes('..')) {
    return new NextResponse('Invalid path', { status: 400 });
  }

  try {
    const filePath = join(process.cwd(), 'app', path);
    const content = await readFile(filePath, 'utf-8');
    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch {
    return new NextResponse('// Code example not found', { status: 404 });
  }
}
