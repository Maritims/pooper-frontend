async function subscribeToPushNotifications(pushManager: PushManager): Promise<PushSubscription> {
    return await pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: globalThis['applicationServerKey']
    });
}

export default function registerServiceWorker(): void {
    if(!navigator.serviceWorker) {
        console.warn("Your browser does not support service workers. Are you sure you're accessing the site over HTTPS?");
        return;
    }

    window.addEventListener('load', async () => {
        const serviceWorker = await navigator.serviceWorker.register('/build/serviceWorker.js');
        const pushNotificationSubscription = (await serviceWorker.pushManager.getSubscription()) || (await subscribeToPushNotifications(serviceWorker.pushManager));
        console.log(pushNotificationSubscription);

        console.log('ServiceWorker registration successful with scope: ', serviceWorker.scope);
    });
}