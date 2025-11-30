
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // 'dedupe' forces Vite to resolve the listed dependencies to the same copy 
    // in node_modules, fixing the "Multiple instances of Three.js" warning.
    // Unlike 'alias', this preserves subpath imports (e.g. three/webgpu).
    dedupe: ['three', 'react', 'react-dom']
  }
})
