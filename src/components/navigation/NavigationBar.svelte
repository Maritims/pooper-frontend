<script lang="ts">
    import { authStore, logout } from '../../services/auth';
    import ColorThemeButton from '../ColorThemeButton.svelte';
    import NavLink from './NavLink.svelte';
    import { navigationBarStore } from './loaders/NavigationBar';
    import { t } from '../../translations';
    import LanguageSelector from '../LanguageSelector.svelte';

    export let showBrand = true;
    export let showToggleButton = false;
    let clazz: string = '';
    export { clazz as class };
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        {#if showBrand}
            <a class="navbar-brand" href="/">Pooper</a>
        {/if}

        <div class="collapse navbar-collapse mt-1 {$navigationBarStore.show ? "show" : ""} {clazz}">
            <ul class="navbar-nav me-auto">
                {#if $authStore}
                    {#if showToggleButton}
                        <li class="nav-item">
                            <NavLink to="profile" class="nav-link">
                                <div class="icon"><i class="fas fa-user-cog"></i></div> {$t({ key: 'navigation.bar.my.profile' })}
                            </NavLink>
                        </li>
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <li class="nav-item">
                            <a href="#" class="nav-link" on:click={logout}>
                                <div class="icon"><i class="fas fa-sign-out-alt"></i></div> {$t({ key: 'navigation.bar.log.out' })}
                            </a>
                        </li>
                        <li><hr class="dropdown-divider text-white"></li>
                    {/if}
                    <li class="nav-item">
                        <NavLink to="animals" class="nav-link">
                            <div class="icon"><i class="fas fa-paw"></i></div> {$t({ key: 'animal' })}
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/events" class="nav-link">
                            <div class="icon"><i class="fas fa-calendar-alt"></i></div> {$t({ key: 'navigation.bar.events' })}
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="statistics" class="nav-link">
                            <div class="icon"><i class="fas fa-chart-line"></i></div> {$t({ key: 'navigation.bar.statistics' })}
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/trips" class="nav-link">
                            <div class="icon"><i class="fas fa-hiking"></i></div> {$t({ key: 'navigation.bar.trips' })}
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="users" class="nav-link">
                            <div class="icon"><i class="fas fa-users"></i></div> {$t({ key: 'navigation.bar.users' })}
                        </NavLink>
                    </li>
                    {#if showToggleButton}
                        <li class="nav-item">
                            <NavLink to="/" class="nav-link">
                                <div class="icon"><i class="fas fa-home"></i></div> {$t({ key: 'navigation.bar.home' })}
                            </NavLink>
                        </li>
                    {:else}
                        <li class="nav-item">
                            <NavLink to="profile" class="nav-link">
                                <div class="icon"><i class="fas fa-user-cog"></i></div> {$t({ key: 'navigation.bar.my.profile' })}
                            </NavLink>
                        </li>
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <li class="nav-item">
                            <a href="#" class="nav-link" on:click={logout}>
                                <div class="icon"><i class="fas fa-sign-out-alt"></i></div> {$t({ key: 'navigation.bar.log.out' })}
                            </a>
                        </li>
                    {/if}
                {/if}
                <li class="nav-item">
                    <NavLink to="about" class="nav-link">
                        <div class="icon"><i class="fas fa-info"></i></div> {$t({ key: 'navigation.bar.about' })}
                    </NavLink>
                </li>
            </ul>

            <LanguageSelector class="d-none d-lg-block w-10 mx-2" />
            <ColorThemeButton class="d-none d-lg-block" />
        </div>

        {#if showToggleButton}
            <button class="navbar-toggler" type="button" on:click={() => navigationBarStore.update(context => {
                context.show = !context.show;
                return context;
            })}>
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="d-flex align-items-center">
                <LanguageSelector class="d-lg-none mx-2" />
                <ColorThemeButton />
            </div>
        {/if}
    </div>
</nav>

<style lang="scss">
    .icon {
        display:inline-block;

        @media(max-width:768px) {
            text-align:center;
            width:30px;
        }
    }
</style>