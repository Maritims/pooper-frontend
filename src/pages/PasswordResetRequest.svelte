<script lang="ts">
    import { AuthService } from '../api';
    import Confirmation from '../components/Confirmation.svelte';
import { addToast } from '../services/toasts';

    let isConfirmationVisible = false;
    let emailAddress: string;
    let success: boolean;

    async function handleOnSubmit(): Promise<void> {
        isConfirmationVisible = true;
    }
</script>

<Confirmation bind:isVisible={isConfirmationVisible} on:confirm={async () => {
    success = (await AuthService.resetPasswordAuthResetPasswordPost({
        email_address: emailAddress
    })).success;

    if(!success) {
        addToast({
            id: new Date().getTime(),
            type: 'danger',
            body: 'Unable to request password reset',
            durationInMs: 3000
        });
    }
}} on:cancel={() => isConfirmationVisible = false} />

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col-12 offset-md-4 col-md-4 offset-xl-5 col-xl-2">
            {#if success}
                <p>Successfully requested password reset.</p>
                <p>A confirmation link has been sent to your e-mail address.</p>
            {:else}
                <form on:submit|preventDefault={handleOnSubmit}>
                    <div class="mb-3 form-floating">
                        <input type="emailAddress" class="form-control" bind:value={emailAddress} autocomplete="email" />
                        <label for="newPasswordRepeated">E-mail address</label>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-success">Reset password</button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</div>
