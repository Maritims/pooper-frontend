<script lang="ts">
    import { onMount } from "svelte";
    import { useFocus } from "svelte-navigator";
    import type { UserCreate, UserRead } from "../api";
    import { UsersService } from "../api";
    import { addToast } from "../services/toasts";
    import Map from '../components/Map.svelte';
    import { getCurrentPosition, type Position } from "../models/Position";
    import type { MapMouseEvent } from "mapbox-gl";

    let map: Map;
    let position: Position;
    let userRead: UserRead;
    let userUpdate: UserCreate;

    const focus = useFocus();

    onMount(async () => {
        userRead = await UsersService.getMeUsersMeGet();
        userUpdate = {
            ...userRead,
            password: '',
            password_repeated: ''
        };
    });

    async function handleOnSubmit(): Promise<void> {
        try {
            userRead = await UsersService.updateUsersUpdatePatch(userUpdate);
            userUpdate = {
                ...userRead,
                password: '',
                password_repeated: ''
            };
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

    function handleMapMouseEvent(e: CustomEvent<MapMouseEvent>): void {
        map.setCenter(e.detail.lngLat);
        userUpdate.home_longitude = e.detail.lngLat.lng;
        userUpdate.home_latitude = e.detail.lngLat.lat;
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
                    <div class="form-floating">
                        <input type="text" class="form-control" id="longitude" bind:value={userUpdate.home_longitude} readonly />
                        <label for="longitude">Longitude</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <input type="text" class="form-control" bind:value={userUpdate.home_latitude} readonly />
                        <label for="latitude">Latitude</label>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    {#if position}
                        <Map bind:this={map} center={position} on:click={handleMapMouseEvent} />
                    {:else}
                        <button type="button" class="btn btn-lg btn-primary w-100" on:click={async () => position = await getCurrentPosition()}>Load map</button>
                    {/if}
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