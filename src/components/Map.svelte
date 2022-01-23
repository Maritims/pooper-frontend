<script lang="ts">
    import mapboxgl from 'mapbox-gl';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import type { EventRead } from '../api';

    export let accessToken: string;
    export let events: Array<EventRead>;
    export let minHeightPx: number;

    mapboxgl.accessToken = accessToken;

    let mapContainer: HTMLDivElement;

    function configureMap(): Promise<mapboxgl.Map> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const map = new mapboxgl.Map({
                        container: mapContainer,
                        style: 'mapbox://styles/mapbox/streets-v11',
                        center: [position.coords.longitude, position.coords.latitude],
                        zoom: 15
                    })

                    if (events) {
                        const groupedEvents = events.reduce((acc, event) => {
                            const key = `${event.longitude},${event.latitude},${event.event_type}`;
                            if(!acc[key]) acc[key] = 0;
                            acc[key]++;
                            return acc;
                        }, {});
                        Object.keys(groupedEvents).forEach(key => {
                            const keyParts = key.split(',');
                            const lng = parseFloat(keyParts[0]);
                            const lat = parseFloat(keyParts[1]);
                            const eventType = keyParts[2];
                            new mapboxgl.Marker()
                            .setLngLat([lng, lat])
                            .setPopup(new mapboxgl.Popup().setHTML(`Count: ${groupedEvents[key]} - Type: ${eventType}`))
                            .addTo(map);
                        });
                    }

                    new mapboxgl.Marker({ color: '#FF0000' })
                    .setLngLat([position.coords.longitude, position.coords.latitude])
                    .addTo(map);
                
                    resolve(map);
                }, error => {
                    console.warn('Unable to get geolocation');
                    reject(error);
                });
        });
    };

    $: if(events?.length) configureMap();
</script>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <div bind:this={mapContainer} class="mapbox-container w-100" style="min-height:{minHeightPx}px"></div>
        </div>
    </div>
</div>