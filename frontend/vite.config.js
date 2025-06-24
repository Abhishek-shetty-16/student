import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// replace `your-repo-name` with your GitHub repo name
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
