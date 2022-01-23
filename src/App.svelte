<script lang="ts">
	import { authStore } from './services/auth';
	import { modalStore } from './services/modals';
	import { Router, Route, useParams } from 'svelte-navigator';
	import Animals from './pages/Animals.svelte';
	import Events from './pages/Events.svelte';
	import Home from './pages/Home.svelte';
	import Login from './pages/Login.svelte';
	import Logout from './pages/Logout.svelte';
	import NavLink from './components/NavLink.svelte';
	import PasswordResetConfirmation from './pages/PasswordResetConfirmation.svelte';
	import PasswordResetRequest from './pages/PasswordResetRequest.svelte';
	import Statistics from './pages/Statistics.svelte';
	import Toasts from './components/Toasts.svelte';
	import Users from './pages/Users.svelte';
	import { logout } from './services/auth';

	let show = false;

	function toggleNavbar(): void {
		show = !show;
	}
</script>

<Toasts />

<Router>
	<nav class="navbar navbar-expand-md navbar-dark bg-dark">
		<div class="container-fluid">
			<a class="navbar-brand" href="/">Pooper</a>
	
			<button class="navbar-toggler" type="button" on:click={toggleNavbar}>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse {show ? "show" : ""}">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					{#if $authStore}
						<li class="nav-item">
							<NavLink to="animals">Animals</NavLink>
						</li>
						<li class="nav-item">
							<NavLink to="/events">Events</NavLink>
						</li>
						<li>
							<NavLink to="users">Users</NavLink>
						</li>
						<li class="nav-item">
							<NavLink to="statistics">Statistics</NavLink>
						</li>
						<li class="nav-item">
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a href="#" class="nav-link" on:click={logout}>Log out</a>
						</li>
					{/if}
				</ul>
			</div>
		</div>
	</nav>

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
		<Route path="/users">
			<Users />
		</Route>
		<Route path="/statistics">
			<Statistics />
		</Route>
		<Route path="/logout">
			<Logout />
		</Route>
	{:else}
		<Route path="/reset-password">
			<PasswordResetRequest />
		</Route>
		<Route path="/confirm-password-reset/:token" let:params>
			<PasswordResetConfirmation token={params.token} />
		</Route>
		<Route primary={true}>
			<Login />
		</Route>
	{/if}
</Router>

{#if $modalStore.isBackdropVisible}
	<div class="modal-backdrop fade show"></div>>
{/if}

<style>
</style>