<script lang="ts">
    import { onMount } from "svelte";
    import { AuthService, UserRead, UsersService } from "../api";
    import Confirmation from "../components/Confirmation.svelte";
    import Modal from "../components/Modal.svelte";

    let users: Array<UserRead> = [];
    let newUserFirstName: string;
    let newUserLastName: string;
    let newUserEmailAddress: string;
    let newUserPassword: string;
    let newUserPasswordRepeated: string;
    let modal: Modal;
    let confirmation: Confirmation;

    onMount(async () => users = await UsersService.getAllUsersUsersGet());

    async function handleOnSubmit(): Promise<void> {
        await UsersService.createUsersPost({
            first_name: newUserFirstName,
            last_name: newUserLastName,
            email_address: newUserEmailAddress,
            password: newUserPassword,
            password_repeated: newUserPasswordRepeated
        });
        newUserFirstName = '';
        newUserLastName = '';
        newUserEmailAddress = '';
        newUserPassword = '';
        newUserPasswordRepeated = '';
        users = await UsersService.getAllUsersUsersGet();
    };

    function handleOnClick(id: number): void {
        confirmation.confirm(async () => {
            await UsersService.deleteUsersIdDelete(id);
            users = await UsersService.getAllUsersUsersGet();
        });
    };
</script>

<Confirmation bind:this={confirmation} />

<Modal bind:this={modal}>
    <span slot="title">Create new user</span>
    <form slot="body" on:submit|preventDefault={handleOnSubmit}>
        <div class="row mb-2">
            <label for="firstName" class="col-sm-4 col-form-label">First name</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" bind:value={newUserFirstName} autocomplete="given-name" />
            </div>
        </div>
        <div class="row mb-2">
            <label for="lastName" class="col-sm-4 col-form-label">Last name</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" bind:value={newUserLastName} autocomplete="family-name" />
            </div>
        </div>
        <div class="row mb-2">
            <label for="emailAddress" class="col-sm-4 col-form-label">E-mail address</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" bind:value={newUserEmailAddress} autocomplete="email" />
            </div>
        </div>
        <div class="row mb-2">
            <label for="password" class="col-sm-4 col-form-label">Password</label>
            <div class="col-sm-8">
                <input type="password" class="form-control" bind:value={newUserPassword} autocomplete="new-password" />
            </div>
        </div>
        <div class="row mb-2">
            <label for="passwordRepeated" class="col-sm-4 col-form-label">Repeat password</label>
            <div class="col-sm-8">
                <input type="password" class="form-control" bind:value={newUserPasswordRepeated} autocomplete="new-password" />
            </div>
        </div>
    </form>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={modal.hide}>Cancel</button>
        <button type="submit" class="btn btn-success" on:click={handleOnSubmit}>Submit</button>
    </span>
</Modal>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <button class="btn btn-lg btn-success" on:click={modal.show}>Create user</button>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>E-mail address</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each users as user}
                        <tr>
                            <td class="align-middle">{user.first_name}</td>
                            <td class="align-middle">{user.last_name}</td>
                            <td class="align-middle">{user.email_address}</td>
                            <td class="align-middle">{user.created}</td>
                            <td class="align-middle">{user.updated}</td>
                            <td class="align-middle">
                                <button class="btn btn-lg btn-danger" on:click={() => handleOnClick(user.id)}>Remove</button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>