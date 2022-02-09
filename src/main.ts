import App from './App.svelte';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OpenAPI } from './api';

OpenAPI.BASE = globalThis['API_BASE_URL'];

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;