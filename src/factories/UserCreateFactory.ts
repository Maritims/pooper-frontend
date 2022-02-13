import type { UserCreate } from "../api";

export function getUserCreate(): UserCreate {
    return {
        first_name: '',
        last_name: '',
        email_address: '',
        home_longitude: 0,
        home_latitude: 0,
        password: '',
        password_repeated: ''
    }
}