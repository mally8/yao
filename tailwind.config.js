/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				bg: '#d0d0d0',
				border: '#7c808d',
				'border-muted': '#9a9eab',
				text: '#292929',
				'text-muted': '#444753',
			},
			fontFamily: {
				Shantell: 'Shantell Sans, cursive',
			},
		},
	},
	plugins: [],
};
