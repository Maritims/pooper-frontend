import type { UserCreate, UserRead } from "../api";

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

export function getUserRead(): UserRead {
    return {
        id: 0,
        first_name: '',
        last_name: '',
        email_address: '',
        is_disabled: false,
        home_longitude: 0,
        home_latitude: 0,
        created: '',
        updated: ''
    }
}