import type { UserCreate } from "../api";

export function getUserCreate(): UserCreate {
    return {
        first_name: '',
        last_name: '',
        email_address: '',
        password: '',
        password_repeated: ''
    }
}