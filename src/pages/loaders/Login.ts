import { login } from "../../services/auth";
import { addToast } from "../../services/toasts";

export const onSubmitHandler = async (username: string, password: string) => {
    try {
        await login(username, password);
    } catch(e) {
        addToast({
            id: new Date().getTime(),
            type: 'danger',
            body: 'Unable to login. Invalid credentials.',
            durationInMs: 3000
        });
    }
}