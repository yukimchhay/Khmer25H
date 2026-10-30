import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Import ចូល

// https://vite.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. បន្ថែមវាទៅក្នុង plugins array
  ],
})
