// Tema de SkillUp Campus, opción 3 (Acompañamiento), para DaisyUI 4 (Tailwind v3).
// Instalación: npm i -D daisyui@4  → integrá este tema en tu tailwind.config.js existente.
import daisyui from 'daisyui'
// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{html,js}"],
    plugins: [require("daisyui")],
}

export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], titulo: ['Lexend', 'system-ui', 'sans-serif'] },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                skillup: {
                    'base-100': '#FFFFFF',
                    'base-200': '#F3F6F9',
                    'base-300': '#D8E1E8',
                    'base-content': '#243B53',
                    'primary': '#243B53',
                    'primary-content': '#FFFFFF',
                    // Naranja de marca con texto oscuro para mantener legibilidad.
                    'secondary': '#C16B28',
                    'secondary-content': '#111111',
                    'accent': '#F5E1D2',
                    'accent-content': '#243B53',
                    'neutral': '#172A3A',
                    'neutral-content': '#FFFFFF',
                    'info': '#0369A1',
                    'info-content': '#FFFFFF',
                    'success': '#15803D',
                    'success-content': '#FFFFFF',
                    'warning': '#A16207',
                    'warning-content': '#FFFFFF',
                    'error': '#B91C1C',
                    'error-content': '#FFFFFF',
                },
            },
        ],
    },
}