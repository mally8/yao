import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tanstackRouter from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({ autoCodeSplitting: true }),
		tailwindcss(),
		viteReact({
			// babel: {
			// 	plugins: ['babel-plugin-react-compiler'],
			// },
		}),
	],
});
