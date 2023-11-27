import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$utils: path.resolve('./src/utils'),
			$lib: path.resolve('./src/lib'),
			'$lib/*': './src/lib/*',
			$api: path.resolve('./src/api')
		}
	}
});
