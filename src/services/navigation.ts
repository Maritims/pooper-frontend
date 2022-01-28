export type Position = {
    lng: number,
    lat: number
};

export async function getCurrentPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position =>  {
            resolve({
                lng: position.coords.longitude,
                lat: position.coords.latitude
            });
        });
    });
};