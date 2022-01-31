import { writable } from "svelte/store";
import { AuthService, OpenAPI } from "../api";

let accessToken = localStorage.getItem('accessToken');

export const authStore = writable(accessToken);

export const login = async (username: string, password: string) => {
    const loginResponse = await AuthService.loginAuthTokenPost({
        username: username,
        password: password
    });
    authStore.set(loginResponse.access_token);
};

export const logout = () => authStore.set(null);

authStore.subscribe((value) => {
    if(value) {
        localStorage.setItem('accessToken', value);
        OpenAPI.TOKEN = value;
    } else {
        localStorage.removeItem('accessToken');
        OpenAPI.TOKEN = undefined;
    }
});