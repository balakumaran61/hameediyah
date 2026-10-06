import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // tokens.css lives in docs/design (HAM-12), one level above site/
  server: { fs: { allow: ['..'] } },
})
