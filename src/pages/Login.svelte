<script lang="ts">
    import { useFocus } from 'svelte-navigator';
    import { login } from '../services/auth';
    import { addToast } from '../services/toasts';

    const registerFocus = useFocus();

    let username: string;
    let password: string;

    const onSubmitHandler = async () => {
        try {
            await login(username, password);
        } catch(e) {
            addToast({
                id: new Date().getTime(),
                type: 'danger',
                body: 'Unable to login. Invalid credentials.',
                durationInMs: 3000
            });
        }
    }
</script>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col-xs-12 offset-md-4 col-md-4 offset-xl-5 col-xl-2">
            <form on:submit|preventDefault={onSubmitHandler}>
                <div class="text-center">
                    <img src="gfx/pooper.png" alt="Pooper" class="img-fluid" style="height:150px"/>
                </div>

                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" id="username" class="form-control" bind:value={username} autocomplete="username" use:registerFocus />
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" class="form-control" bind:value={password} autocomplete="current-password" />
                    <div id="forgottenPassword" class="form-text">Click <a href="reset-password/">here</a> if you've forgotten your password</div>
                </div>
                <div class="d-grid">
                    <button type="submit" class="btn btn-success">Log in</button>
                </div>
            </form>
        </div>
    </div>
</div>