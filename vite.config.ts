import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ СБОРКИ VERCEL:
      // Перенаправляем ошибочный импорт 'three/webgpu' на основной пакет 'three'.
      // Это устраняет ошибку "Missing ./webgpu specifier".
      'three/webgpu': 'three'
    },
    // КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ ОТОБРАЖЕНИЯ ТЕКСТА:
    // Принудительно объединяем все копии three в одну.
    // Это устраняет ошибку "Multiple instances of Three.js".
    dedupe: ['three']
  },
  optimizeDeps: {
    include: ['three', 'react-force-graph-3d', 'three-spritetext']
  }
})
