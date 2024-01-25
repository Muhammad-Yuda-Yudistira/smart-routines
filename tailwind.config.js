import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', 'Vina Sans',...defaultTheme.fontFamily.sans],
                main: ['Nova Square'],
                seconder: ['Grape Nuts'],
                tersier: ['Smooch Sans'],
            },
        },
    },

    plugins: [forms, require("daisyui")],
};
