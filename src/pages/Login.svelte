<script lang="ts">
    import { onSubmitHandler } from './loaders/Login';
    import { useFocus } from 'svelte-navigator';

    export const registerFocus = useFocus();

    let username: string;
    let password: string;
</script>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col-xs-12 offset-md-4 col-md-4 offset-xl-5 col-xl-2">
            <form on:submit|preventDefault={() => onSubmitHandler(username, password)}>
                <div class="text-center">
                    <img src="gfx/pooper.png" alt="Pooper" class="img-fluid" style="height:150px"/>
                </div>

                <div class="mb-3 form-floating">
                    <input type="text" id="username" class="form-control" bind:value={username} autocomplete="username" use:registerFocus />
                    <label for="username">Username</label>
                </div>
                <div class="mb-3 form-floating">
                    <input type="password" id="password" class="form-control" bind:value={password} autocomplete="current-password" />
                    <label for="password">Password</label>
                    <div id="forgottenPassword" class="form-text">Click <a href="reset-password/">here</a> if you've forgotten your password</div>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-success">Log in</button>
                </div>
            </form>
        </div>
    </div>
</div>