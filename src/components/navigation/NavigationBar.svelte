<script lang="ts">
    import { authStore, logout } from '../../services/auth';
    import { setMode, themeStore } from '../../services/themes';
    import NavLink from './NavLink.svelte';

    export let bottom = false;
    let show = false;

    function toggleNavbar(): void {
		show = !show;
	}
</script>

<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
        {#if !bottom}
            <a class="navbar-brand" href="/">Pooper</a>
        {/if}

        <div class="collapse navbar-collapse {show ? "show" : ""}">
            {#if $authStore}
                <ul class="navbar-nav me-auto">
                    {#if bottom}
                        <li class="nav-item">
                            <NavLink to="profile" class="nav-link">
                                <div class="icon"><i class="fas fa-user-cog"></i></div> My profile
                            </NavLink>
                        </li>
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <li class="nav-item">
                            <a href="#" class="nav-link" on:click={logout}>
                                <div class="icon"><i class="fas fa-sign-out-alt"></i></div> Log out
                            </a>
                        </li>
                        <li><hr class="dropdown-divider text-white"></li>
                    {/if}
                    <li class="nav-item">
                        <NavLink to="animals" class="nav-link">
                            <div class="icon"><i class="fas fa-paw"></i></div> Animals
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/events" class="nav-link">
                            <div class="icon"><i class="fas fa-calendar-alt"></i></div> Events
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="statistics" class="nav-link">
                            <div class="icon"><i class="fas fa-chart-line"></i></div> Statistics
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/trips" class="nav-link">
                            <div class="icon"><i class="fas fa-hiking"></i> Trips</div>
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="users" class="nav-link">
                            <div class="icon"><i class="fas fa-users"></i></div> Users
                        </NavLink>
                    </li>
                    {#if bottom}
                        <li class="nav-item">
                            <NavLink to="/" class="nav-link">
                                <div class="icon"><i class="fas fa-home"></i></div> Home
                            </NavLink>
                        </li>
                    {:else}
                        <li class="nav-item">
                            <NavLink to="profile" class="nav-link">
                                <div class="icon"><i class="fas fa-user-cog"></i></div> My profile
                            </NavLink>
                        </li>
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <li class="nav-item">
                            <a href="#" class="nav-link" on:click={logout}>
                                <div class="icon"><i class="fas fa-sign-out-alt"></i></div> Log out
                            </a>
                        </li>
                    {/if}
                </ul>
            {/if}
            {#if $themeStore.mode == "dark"}
                <i class="fas fa-moon text-light" on:click={() => setMode('light')}></i>
            {/if}
            {#if $themeStore.mode == "light"}
                <i class="fas fa-sun text-light" on:click={() => setMode('dark')}></i>
            {/if}
        </div>

        {#if bottom}
            <button class="navbar-toggler" type="button" on:click={toggleNavbar}>
                <span class="navbar-toggler-icon"></span>
            </button>

            {#if $themeStore.mode == "dark"}
                <i class="fas fa-moon text-light" on:click={() => setMode('light')}></i>
            {/if}
            {#if $themeStore.mode == "light"}
                <i class="fas fa-sun text-light" on:click={() => setMode('dark')}></i>
            {/if}
        {/if}
    </div>
</nav>

<style lang="scss">
    .icon {
        display:inline-block;

        @media(max-width:576px) {
            text-align:center;
            width:30px;
        }
    }
</style>