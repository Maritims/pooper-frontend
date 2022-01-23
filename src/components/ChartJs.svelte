<script lang="ts">
    import { Chart, registerables } from 'chart.js'
    import { onMount } from 'svelte';
    import type { EventRead } from "../api";
    import { getAllEventTypes } from "../services/events";

    export let events: Array<EventRead>;
    export let days: number;

    Chart.register(...registerables);

    let canvas: HTMLCanvasElement;
    let chart: any;

    onMount(() => configureChart());

    function getDates() {
        return [...Array(days).keys()].map(day => {
            const date = new Date();
            date.setDate(date.getDate() - day);
            date.setHours(0, 0, 0, 0);
            return date;
        }).reverse();
    }

    function getDataSets() {
        if(!events?.length) return;

        return getAllEventTypes().map(enrichedEventType => {
            const counts = getDates().map(date => {       
                return events.filter(event => {
                    const eventDate = new Date(Date.parse(event.created));
                    eventDate.setHours(0, 0, 0, 0)
                    return event.event_type === enrichedEventType.eventType && eventDate.getTime() === date.getTime();
                }).length;
            });

            return {
                label: enrichedEventType.eventType,
                data: counts,
                backgroundColor: enrichedEventType.color,
                borderColor: enrichedEventType.color
            };
        });
    }

    function configureChart() {
        if(chart) chart.destroy();
        const context = canvas.getContext('2d');
        chart = new Chart(context, {
            type: 'line',
            data: {
                labels: getDates().map(date => date.toLocaleString()),
                datasets: getDataSets()
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Events'
                    }
                },
                scales: {
                    xAxis: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    yAxis: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Amount'
                        }
                    }
                }
            }
        });
    };

    $: if(canvas && events && days) configureChart();
</script>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <canvas bind:this={canvas} width="800" height="600" />
        </div>
    </div>
</div>