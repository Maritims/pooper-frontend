<script lang="ts">
    import 'mapbox-gl/dist/mapbox-gl.css';
    import mapboxgl, { Map, Marker, MapMouseEvent, MapboxEvent} from 'mapbox-gl';
    import { createEventDispatcher, onMount } from 'svelte';
    import type { Position } from '../models/Position';

    export let center: Position | undefined = undefined;
    export let markers: Array<Marker> = [];
    export let minHeightPx = 400;

    export function addMarker(marker: Marker): void {
        marker.addTo(map);
    }

    export function setCenter(position: Position): void {
        map.setCenter([position.lng, position.lat]);
        personalMarker.setLngLat([position.lng, position.lat]).addTo(map);
    }

    const dispatchOnLoadEvent = createEventDispatcher<{load: MapboxEvent}>();
    const dispatchMapMouseEvent = createEventDispatcher<{click: MapMouseEvent}>();
    const personalMarker = new Marker({ color: '#FF0000' });

    let mapContainer: HTMLDivElement;
    let map: mapboxgl.Map;

    onMount(async () => {
        mapboxgl.accessToken = globalThis['MAPBOX_ACCESS_TOKEN'];
        map = new Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 15
        });

        if(center) setCenter(center);
        if(markers) markers.forEach(marker => marker.addTo(map));

        map.on('click', (e: MapMouseEvent) => dispatchMapMouseEvent('click', e));
        map.on('load', (e: MapboxEvent) => dispatchOnLoadEvent('load', e));
    });
</script>

<div bind:this={mapContainer} class="mapbox-container w-100" style="min-height:{minHeightPx}px"></div>