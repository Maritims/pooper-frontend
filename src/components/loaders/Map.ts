import mapbox, { Marker, Popup } from "mapbox-gl";
import type { EventRead } from "../../api";
import type { Position } from "../../models/Position";

export function getEventMarkers(events: Array<EventRead>): Array<Marker> {
    const groupedEventsMap = events.reduce<Map<string, Array<EventRead>>>((acc, event) => {
        const coordinates = `${event.longitude},${event.latitude}`;
        const events = acc.get(coordinates) || [];
        events.push(event);
        acc.set(coordinates, events);
        return acc;
    }, new Map<string, EventRead[]>());

    const eventMarkers = [...groupedEventsMap.keys()].map(coordinates => {
        const events = groupedEventsMap.get(coordinates);
        const parts = coordinates.split(',').map(part => parseFloat(part));
        const marker = new Marker()
        .setLngLat([parts[0], parts[1]])
        .setPopup(new Popup().setHTML(`Count: ${events?.length}<br />Longitude: ${parts[0]}<br />Latitude:${parts[1]}`));
        return marker;
    });

    return eventMarkers;
}

export function addRoute(mapboxMap: mapbox.Map, positions: Array<Position>): void {
    new Marker({
        color: '#FF0000'
    })
    .setLngLat([positions[0].lng, positions[0].lat])
    .setPopup(new Popup().setHTML('Home'))
    .addTo(mapboxMap);

    const sourceId = new Date().getTime().toString();
    mapboxMap.addSource(sourceId, {
        type: 'geojson',
        data: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: positions.map(pos => [pos.lng, pos.lat])
            }
        }
    });
    mapboxMap.addLayer({
        id: sourceId,
        type: 'line',
        source: sourceId,
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#888',
            'line-width': 4
        }
    });
}