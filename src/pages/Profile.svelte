<script lang="ts">
    import { onMount } from "svelte";
    import { useFocus } from "svelte-navigator";
    import { UserCreate, UserRead, UsersService } from "../api";
    import { addToast } from "../services/toasts";

    let userRead: UserRead;
    let userUpdate: UserCreate;

    const focus = useFocus();

    function getUserUpdate(): UserCreate {
        return {
            first_name: userRead.first_name,
            last_name: userRead.last_name,
            email_address: userRead.email_address,
            password: '',
            password_repeated: ''
        };
    }

    onMount(async () => {
        userRead = await UsersService.getMeUsersMeGet();
        userUpdate = getUserUpdate();
    });

    async function handleOnSubmit(): Promise<void> {
        try {
            userRead = await UsersService.updateUsersUpdatePatch(userUpdate);
            userUpdate = getUserUpdate();
        } catch(e) {
            addToast({
                id: new Date().getTime(),
                type: 'danger',
                body: 'Unable to update profile',
                durationInMs: 3000
            });
            return;
        }

        addToast({
            id: new Date().getTime(),
            type: 'success',
            body: 'Succesfully updated profile',
            durationInMs: 3000
        });
    }
</script>

<div class="container-fluid">
    {#if userRead}
        <form on:submit|preventDefault={handleOnSubmit}>
            <div class="row mt-2">
                <div class="col">
                    <div class="form-floating">
                        <input type="text" readonly class="form-control" id="firstName" bind:value={userUpdate.first_name} autocomplete="given-name" />
                        <label for="firstName">First name</label>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <div class="form-floating">
                        <input type="text" readonly class="form-control" id="lastName" bind:value={userUpdate.last_name} autocomplete="family-name" />
                        <label for="lastName">Last name</label>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <div class="form-floating">
                        <input type="email" readonly class="form-control" id="emailAddress" bind:value={userUpdate.email_address} autocomplete="email" />
                        <label for="emailAddress">E-mail address</label>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <div class="form-floating">
                        <input type="password" class="form-control" id="password" bind:value={userUpdate.password} autocomplete="new-password" use:focus />
                        <label for="password">Password</label>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <div class="form-floating">
                        <input type="password" class="form-control" id="passwordRepeated" bind:value={userUpdate.password_repeated} autocomplete="new-password" />
                        <label for="passwordRepeated">Repeat password</label>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <button type="submit" class="btn btn-lg btn-success">Save changes</button>
                </div>
            </div>
        </form>
    {/if}
</div>