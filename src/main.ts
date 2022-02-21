import './main.scss';
import App from './App.svelte';
import { OpenAPI } from './api';

OpenAPI.BASE = globalThis['API_BASE_URL'];

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;