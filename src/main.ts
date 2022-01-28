import App from './App.svelte';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OpenAPI } from './api';

OpenAPI.BASE = globalThis['apiUrl'];

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;