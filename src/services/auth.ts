import { writable } from "svelte/store";
import { AuthService, OpenAPI, type UserRead } from "../api";
import { getUserRead } from "../factories/UserReadFactory";

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

export function getDecodedToken(): {
    user: UserRead
} {
    if(!OpenAPI.TOKEN) return {
        user: getUserRead()
    };
    
    const payload = JSON.parse(window.atob(OpenAPI.TOKEN?.toString().split('.')[1]));
    return {
        user: JSON.parse(payload.user)
    };
}

authStore.subscribe((value) => {
    if(value) {
        localStorage.setItem('accessToken', value);
        OpenAPI.TOKEN = value;
    } else {
        localStorage.removeItem('accessToken');
        OpenAPI.TOKEN = undefined;
    }
});