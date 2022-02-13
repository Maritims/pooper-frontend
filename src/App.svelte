<script lang="ts">
	import { authStore } from './services/auth';
	import { modalStore } from './services/modals';
	import { Router, Route } from 'svelte-navigator';
	import Animals from './pages/Animals.svelte';
	import Events from './pages/Events.svelte';
	import Home from './pages/Home.svelte';
	import Login from './pages/Login.svelte';
	import Logout from './pages/Logout.svelte';
	import NavigationBar from './components/navigation/NavigationBar.svelte';
	import PasswordResetConfirmation from './pages/PasswordResetConfirmation.svelte';
	import PasswordResetRequest from './pages/PasswordResetRequest.svelte';
	import Profile from './pages/Profile.svelte';
	import Statistics from './pages/Statistics.svelte';
	import Toasts from './components/Toasts.svelte';
	import Users from './pages/Users.svelte';
	import registerServiceWorker from './utils/ServiceWorkerUtil';
	import Trips from './pages/Trips.svelte';

	registerServiceWorker();
</script>

<Toasts />

<Router>
	<header>
		<NavigationBar />
	</header>

	<main class="flex-shrink-0 pt-2">
		{#if $authStore}
			<Route path="/" primary={false}>
				<Home />
			</Route>
			<Route path="/animals">
				<Animals />
			</Route>
			<Route path="/events">
				<Events />
			</Route>
			<Route path="/logout">
				<Logout />
			</Route>
			<Route path="/profile">
				<Profile />
			</Route>
			<Route path="/statistics">
				<Statistics />
			</Route>
			<Route path="/trips">
				<Trips />
			</Route>
			<Route path="/users">
				<Users />
			</Route>			
		{:else}
			<Route path="/confirm-password-reset/:token" let:params>
				<PasswordResetConfirmation token={params.token} />
			</Route>
			<Route path="/reset-password">
				<PasswordResetRequest />
			</Route>
			<Route primary={true}>
				<Login />
			</Route>
		{/if}
	</main>

	<footer class="footer mt-auto bg-light d-sm-none fixed-bottom" style="z-index:1002">
		<NavigationBar bottom={true} />
	</footer>
</Router>

{#if $modalStore.isBackdropVisible}
	<div class="modal-backdrop fade show"></div>>
{/if}