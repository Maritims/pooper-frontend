<script lang="ts">
    import 'mapbox-gl/dist/mapbox-gl.css';
    import mapboxgl, { Map, Marker, MapMouseEvent} from 'mapbox-gl';
    import { createEventDispatcher, onMount } from 'svelte';
    import type { Position } from '../models/Position';

    export let center: Position = undefined;
    export let markers: Array<Marker> = [];
    export let minHeightPx: number = 400;

    export function addMarker(marker: Marker): void {
        marker.addTo(map);
    };

    export function setCenter(position: Position): void {
        map.setCenter([position.lng, position.lat]);
        personalMarker.setLngLat([position.lng, position.lat]).addTo(map);
    };

    const dispatch = createEventDispatcher<{click: MapMouseEvent}>();
    const personalMarker = new Marker({ color: '#FF0000' });

    let mapContainer: HTMLDivElement;
    let map: mapboxgl.Map;

    onMount(async () => {
        mapboxgl.accessToken = globalThis['mapboxAccessToken'];
        map = new Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 15
        });

        if(center) setCenter(center);
        if(markers) markers.forEach(marker => marker.addTo(map));

        map.on('click', (e: MapMouseEvent) => dispatch('click', e));
    });
</script>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <div bind:this={mapContainer} class="mapbox-container w-100" style="min-height:{minHeightPx}px"></div>
        </div>
    </div>
</div>