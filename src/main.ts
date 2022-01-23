import App from './App.svelte';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import '@fortawesome/fontawesome-free/webfonts';
import { OpenAPI } from './api';

OpenAPI.BASE = globalThis['apiUrl'];

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;