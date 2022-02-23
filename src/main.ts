import App from './App.svelte';
import { OpenAPI } from './api';

Boolean.prototype.toYesNo = function(): string {
	return this ? 'Yes' : 'No';
}

OpenAPI.BASE = globalThis['API_BASE_URL'];

const app = new App({
	target: document.body,
	props: {
	}
});

export default app;