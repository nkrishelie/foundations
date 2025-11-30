import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { resolve } from 'path' // <-- Удаляем импорт resolve, он больше не нужен

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Полностью удаляем секцию resolve с alias
  // resolve: {
  //   alias: {
  //     three: resolve("./node_modules/three")
  //   }
  // }
})
