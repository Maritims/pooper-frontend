<script lang="ts">
    import { onMount } from "svelte";
    import type { UserCreate, UserRead } from "../api";
    import { UsersService } from "../api";
    import Confirmation from "../components/Confirmation.svelte";
    import Modal from "../components/Modal.svelte";
import RemoveButton from "../components/RemoveButton.svelte";
    import { getUserCreate } from "../factories/UserCreateFactory";

    let idToRemove: number | undefined;
    let users: Array<UserRead> = [];
    let userCreate: UserCreate = getUserCreate();
    let isModalVisible = false;

    onMount(async () => users = await UsersService.getAllUsersUsersGet());

    async function handleOnSubmit(): Promise<void> {
        await UsersService.createUsersPost(userCreate);
        userCreate = getUserCreate();
        users = await UsersService.getAllUsersUsersGet();
        isModalVisible = false;
    };

    $: isConfirmationVisible = !!idToRemove;
</script>

<Confirmation bind:isVisible={isConfirmationVisible} on:confirm={async () => {
    await UsersService.deleteUsersIdDelete(idToRemove);
    users = await UsersService.getAllUsersUsersGet();
    idToRemove = undefined;
}} on:cancel={() => idToRemove = undefined}/>

<Modal bind:isVisible={isModalVisible}>
    <span slot="title">Create new user</span>
    <form slot="body" on:submit|preventDefault={handleOnSubmit}>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="text" class="form-control" id="firstName" bind:value={userCreate.first_name} autocomplete="given-name" />
                    <label for="firstName">First name</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="text" class="form-control" bind:value={userCreate.last_name} autocomplete="family-name" />
                    <label for="lastName">Last name</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="email" class="form-control" id="emailAddress" autocomplete="email" bind:value={userCreate.email_address} />
                    <label for="emailAddress">E-mail address</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="password" class="form-control" id="password" autocomplete="new-password" bind:value={userCreate.password} />
                    <label for="password">Password</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="password" class="form-control" id="passwordRepeated" autocomplete="new-password" bind:value={userCreate.password_repeated} />
                    <label for="passwordRepeated">Repeat password</label>
                </div>
            </div>
        </div>
    </form>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => isModalVisible = false}>Cancel</button>
        <button type="submit" class="btn btn-success" on:click={handleOnSubmit}>Submit</button>
    </span>
</Modal>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <button class="btn btn-lg btn-success" on:click={() => isModalVisible = true}>Create user</button>
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
                            <td class="align-middle">{new Date(Date.parse(user.created)).toLocaleString()}</td>
                            <td class="align-middle">{new Date(Date.parse(user.updated)).toLocaleString()}</td>
                            <td class="align-middle text-end">
                                <RemoveButton id={user.id} on:click={() => idToRemove = user.id} />
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>