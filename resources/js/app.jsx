import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../css/app.css';

// Fix for Inertia.js: Initialize history state if null
// This prevents "can't access property scrollRegions, window.history.state is null" error
if (typeof window !== 'undefined' && window.history.state === null) {
    window.history.replaceState({ page: null, scrollRegions: [], documentScrollPosition: { top: 0, left: 0 } }, '');
}

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'etixss';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob('./pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: 'rgb(255,255,255)',
    },
});

// This will set light / dark mode on load...
