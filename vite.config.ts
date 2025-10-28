import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
    build: {
        outDir: 'public/build',
        manifest: true,
        rollupOptions: {
            input: {
                app: 'resources/js/app.jsx',
            },
        },
    },
    server: {
<<<<<<< Updated upstream
        host: 'localhost',
=======
        host: '10.180.32.43',
>>>>>>> Stashed changes
        port: 5173,
        cors: {
            origin: true,
            credentials: true,
        },
        hmr: {
<<<<<<< Updated upstream
            host: 'localhost',
=======
            host: '10.180.32.43',
>>>>>>> Stashed changes
        },
    },
});
