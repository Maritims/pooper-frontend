import { NotificationsService } from "../api/services/NotificationsService";

function arrayBufferToBase64(buffer: ArrayBuffer ): string {
    // https://stackoverflow.com/a/9458996
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

async function subscribeToPushNotifications(pushManager: PushManager): Promise<PushSubscription | null> {
    const vapidPublicKey = globalThis['VAPID_PUBLIC_KEY'];
    if(!vapidPublicKey) {
        console.error('Unable to subscribe to push notifications. Missing application server key.');
        return null;
    }

    const subscription = await pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey
    });

    const notificationSubscription = await NotificationsService.subscribeNotificationsSubscribePost({
        endpoint: subscription?.endpoint,
        public_key: arrayBufferToBase64(subscription.getKey('p256dh')!),
        authentication_secret: arrayBufferToBase64(subscription.getKey('auth')!)
    });
    if(!notificationSubscription) {
        console.error('Unable to store notification subscription');
        return null;
    }

    return subscription;
}

export default async function registerServiceWorker(): Promise<void> {
    if(!navigator.serviceWorker) {
        console.warn("Your browser does not support service workers. Are you sure you're accessing the site over HTTPS?");
        return;
    }

    window.addEventListener('load', async () => {
        const serviceWorker = await navigator.serviceWorker.register('/build/serviceWorker.js');
        await serviceWorker.pushManager.getSubscription() || await subscribeToPushNotifications(serviceWorker.pushManager);

        console.log('ServiceWorker registration successful with scope: ', serviceWorker.scope);
    });
}