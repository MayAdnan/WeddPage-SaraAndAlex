import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change this to your GitHub repository name
  // Format: '/<repository-name>/'
  // Example: If your repo is 'my-wedding-page', use '/my-wedding-page/'
  base: '/Wedd-Page-SaraAndAlex/',
  build: {
    outDir: 'dist',
  },
})
