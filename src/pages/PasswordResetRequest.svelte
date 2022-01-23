<script lang="ts">
    import { AuthService } from '../api';
    import Confirmation from '../components/Confirmation.svelte';

    let confirmation: Confirmation;
    let emailAddress: string;
    let success: boolean;

    async function handleOnSubmit(): Promise<void> {
        confirmation.confirm(async () => {
            success = (await AuthService.resetPasswordAuthResetPasswordPost({
                email_address: emailAddress
            })).success;
        });
    }
</script>

<Confirmation bind:this={confirmation} />

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col-12 offset-md-4 col-md-4 offset-xl-5 col-xl-2">
            {#if success}
                <p>Successfully requested password reset.</p>
                <p>A confirmation link has been sent to your e-mail address.</p>
            {:else}
                <form on:submit|preventDefault={handleOnSubmit}>
                    <div class="mb-3">
                        <label for="newPasswordRepeated" class="form-label">E-mail address</label>
                        <input type="emailAddress" class="form-control" bind:value={emailAddress} autocomplete="email" />
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-success">Reset password</button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</div>
