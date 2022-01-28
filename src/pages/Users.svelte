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
            <div class="col">
                <div class="form-floating">
                    <input type="text" class="form-control" id="firstName" bind:value={newUserFirstName} autocomplete="given-name" />
                    <label for="firstName">First name</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="text" class="form-control" bind:value={newUserLastName} autocomplete="family-name" />
                    <label for="lastName">Last name</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="email" class="form-control" id="emailAddress" autocomplete="email" bind:value={newUserEmailAddress} />
                    <label for="emailAddress">E-mail address</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="password" class="form-control" id="password" autocomplete="new-password" bind:value={newUserPassword} />
                    <label for="password">Password</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="password" class="form-control" id="passwordRepeated" autocomplete="new-password" bind:value={newUserPasswordRepeated} />
                    <label for="passwordRepeated">Repeat password</label>
                </div>
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