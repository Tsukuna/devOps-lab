import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // you already have this
    port: 5173,
    watch: {
      usePolling: true,   // FIX: detect file changes in Docker on Windows
      interval: 300,      // optional: ms between checks
    },
    hmr: {
      clientPort: 5173,   // FIX: HMR websocket through mapped port
    },
  },
})