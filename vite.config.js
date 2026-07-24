import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          'ui': ['framer-motion', 'gsap'],
          'vendor': ['react', 'react-dom', 'zustand'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    sourcemap: true,
  }
})