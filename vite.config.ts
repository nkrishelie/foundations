
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
resolve: {
    // Вместо жестких алиасов используем dedupe.
    // Это говорит Vite: "Если разные пакеты просят 'three', дай им всем одну и ту же копию".
    dedupe: ['three', 'react', 'react-dom'],
  },
  // Опционально: отключаем слишком строгие проверки чанков, если они мешают
  build: {
    chunkSizeWarningLimit: 1600,
  }
})
