<script lang="ts">
    import { useFocus } from "svelte-navigator";
    import { AuthService } from "../api";

    export let token: string;

    let newPassword: string;
    let newPasswordRepeated: string;
    const registerFocus = useFocus();
    let success = false;

    async function handleOnSubmit() {
        success = (await AuthService.confirmPasswordResetAuthConfirmPasswordResetPost({
            token: token,
            new_password: newPassword,
            new_password_repeated: newPasswordRepeated
        })).success;
    }
</script>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col-12 offset-md-4 col-md-4 offset-xl-5 col-xl-2">
            {#if success}
                <p>Password reset complete. Click <a href="/">here</a> to log in.</p>
            {:else}
                <form on:submit|preventDefault={handleOnSubmit}>
                    <div class="mb-3 form-floating">
                        <input type="password" class="form-control" bind:value={newPassword} autocomplete="new-password" use:registerFocus />
                        <label for="newPassword">New password</label>
                    </div>
                    <div class="mb-3">
                        <input type="password" class="form-control" bind:value={newPasswordRepeated} autocomplete="new-password" />
                        <label for="newPasswordRepeated">Confirm new password</label>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-success">Reset password</button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</div>
