import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // زيد هاد السطر

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // وزيد هادي هنا
  ],
})