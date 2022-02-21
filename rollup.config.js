import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import replace from '@rollup/plugin-replace';
import preprocess from 'svelte-preprocess';
import dotenv from 'dotenv';

dotenv.config();

const production = !process.env.ROLLUP_WATCH;

const envVars = {
	API_BASE_URL: process.env.API_BASE_URL,
	MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
	VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY
};
console.log(envVars);
Object.entries(envVars).forEach(entry => {
	const [key, val] = entry;
	if(!val) throw new Error(`Environment variable ${key} is not set. Unable to continue bundling process.`);
});

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev', '--single'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default [{
	input: 'src/serviceWorker.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'serviceWorker',
		file: 'public/serviceWorker.js'
	},
	plugins: [
		replace({
			globalThis: JSON.stringify({
				
			})
		}),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		})
	]
}, {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		replace({
			preventAssignment: true,
			globalThis: JSON.stringify({
				API_BASE_URL: process.env.API_BASE_URL,
				VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
				MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN
			})
		}),
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
			preprocess: preprocess()
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		scss({
			output: 'public/build/bundle.css',
			watch: 'src'
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production,
			noEmitOnError: true
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}];
