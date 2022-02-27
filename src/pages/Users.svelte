<script lang="ts">
    import { onMount } from "svelte";
    import type { UserCreate, UserRead } from "../api";
    import { UsersService } from "../api";
    import Confirmation from "../components/Confirmation.svelte";
    import Modal from "../components/Modal.svelte";
    import RemoveButton from "../components/RemoveButton.svelte";
    import { getUserCreate } from "../factories/UserFactory";
    import { t } from "../translations";

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
                    <label for="firstName">{$t({ key: 'first.name' })}</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="text" class="form-control" bind:value={userCreate.last_name} autocomplete="family-name" />
                    <label for="lastName">{$t({ key: 'last.name' })}</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="email" class="form-control" id="emailAddress" autocomplete="email" bind:value={userCreate.email_address} />
                    <label for="emailAddress">{$t({ key: 'email.address' })}</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="password" class="form-control" id="password" autocomplete="new-password" bind:value={userCreate.password} />
                    <label for="password">{$t({ key: 'password' })}</label>
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="form-floating">
                    <input type="password" class="form-control" id="passwordRepeated" autocomplete="new-password" bind:value={userCreate.password_repeated} />
                    <label for="passwordRepeated">{$t({key: 'users.create.user.repeat.password' })}</label>
                </div>
            </div>
        </div>
    </form>
    <span slot="footer">
        <button type="button" class="btn btn-danger" on:click={() => isModalVisible = false}>{$t({ key: 'cancel' })}</button>
        <button type="submit" class="btn btn-success" on:click={handleOnSubmit}>{$t({ key: 'submit' })}</button>
    </span>
</Modal>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <button class="btn btn-lg btn-success" on:click={() => isModalVisible = true}>{$t({ key: 'users.create.user' })}</button>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>{$t({ key: 'first.name' })}</th>
                        <th>{$t({ key: 'last.name' })}</th>
                        <th>{$t({ key: 'email.address' })}</th>
                        <th>{$t({ key: 'created' })}</th>
                        <th>{$t({ key: 'updated' })}</th>
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