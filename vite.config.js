import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Add this line, using your exact repo name:
  base: '/air_indoor_qaulity/', 
  plugins: [react()],
})