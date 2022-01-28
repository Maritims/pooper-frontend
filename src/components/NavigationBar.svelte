<script lang="ts">
    import { authStore, logout } from '../services/auth';
    import NavLink from './NavLink.svelte';

    let show = false;

    function toggleNavbar(): void {
		show = !show;
	}
</script>

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
                        <NavLink to="animals" class="nav-link">Animals</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/events" class="nav-link">Events</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="users" class="nav-link">Users</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="statistics" class="nav-link">Statistics</NavLink>
                    </li>
                {/if}
            </ul>
            {#if $authStore}
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <NavLink to="profile" class="nav-link">
                            <i class="fas fa-user-cog"></i> My profile
                        </NavLink>
                    </li>
                    <!-- svelte-ignore a11y-invalid-attribute -->
                    <li class="nav-item">
                        <a href="#" class="nav-link" on:click={logout}>
                            <i class="fas fa-sign-out-alt"></i> Log out
                        </a>
                    </li>
                </ul>
            {/if}
        </div>
    </div>
</nav>