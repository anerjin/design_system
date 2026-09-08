/// <reference types="vite/client" />

declare module 'virtual:doi-stories' {
  const manifest: import('./registry/stories').StoryManifest[];
  export default manifest;
}
