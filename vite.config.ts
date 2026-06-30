import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor'
            }
            if (id.includes('framer-motion')) return 'animations'
            if (id.includes('firebase')) return 'firebase'
            if (id.includes('@iconify/react') || id.includes('lucide-react')) return 'ui'
            if (id.includes('@tiptap')) return 'editor'
            if (id.includes('three') || id.includes('@react-three')) return 'three'
          }
        }
      }
    }
  }
})
