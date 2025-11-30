import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // ВМЕСТО alias используем dedupe.
    // Это решает проблему "Multiple instances", не ломая пути на Vercel.
    dedupe: ['three']
  },
  // На всякий случай включаем оптимизацию
  optimizeDeps: {
    include: ['three', 'react-force-graph-3d', 'three-spritetext']
  }
})
