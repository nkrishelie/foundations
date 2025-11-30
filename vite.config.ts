import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
// 2. Добавь вот этот блок resolve:
  resolve: {
    alias: {
      // Это заставляет все импорты 'three' ссылаться на одну и ту же папку
      three: resolve(__dirname, './node_modules/three'), 
    },
  },
})
