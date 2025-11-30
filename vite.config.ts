import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Critical fix: forces all imports of 'three' to use the same instance.
      // This fixes the "Multiple instances of Three.js" warning and makes SpriteText work in production.
      three: resolve("./node_modules/three")
    }
  }
})