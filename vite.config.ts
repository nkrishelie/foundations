import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Эта настройка критична для устранения ошибки "Multiple instances"
    alias: {
      'three': resolve(__dirname, './node_modules/three')
    }
  },
  // Принудительная оптимизация зависимостей
  optimizeDeps: {
    include: ['three', 'react-force-graph-3d', 'three-spritetext']
  }
})
