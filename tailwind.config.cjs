/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.2s ease-in'
      }
    },
	},
	plugins: [],
}
