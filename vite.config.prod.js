// Production configuration for IIFE web component
module.exports = async () => {
  const { defineConfig } = await import('vite')
  const preact = await import('@preact/preset-vite')
  
  return defineConfig({
  plugins: [preact.default()],
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/webview.tsx',
      name: 'CodeStateUI',
      fileName: 'codesate-ui',
      formats: ['iife']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    minify: 'esbuild',
    sourcemap: false,
    emptyOutDir: true
  },
  css: {
    devSourcemap: false
  },
  esbuild: {
    // Remove console.log statements in production build
    drop: ['console', 'debugger']
  }
  })
}