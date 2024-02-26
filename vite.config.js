import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        chunkSizeWarningLimit: 800,
        rollupOptions: {
            external: ['/node_modules/shepherd.js/dist/css/shepherd.css'],
            output: {
                    manualChunks(id) {
                    if (id.includes('node_modules/jodit-react')) {
                        return 'jodit-react';
                    }
                }
            }
        }
    }
});
