<script lang="ts">
    import { Chart, registerables, type ChartDataset, type ChartTypeRegistry } from 'chart.js';
    import annotationPlugin, { type AnnotationOptions } from 'chartjs-plugin-annotation';
    import { onMount } from 'svelte';

    export let annotations: Array<AnnotationOptions> = [];
    export let datasets: Array<ChartDataset>;
    export let labels: Array<string>;
    export let title: string;    
    export let type: keyof ChartTypeRegistry;
    
    export let x: string;
    export let y: string;

    export let yMin: number | undefined = undefined;
    export let yMax: number | undefined = undefined;
    export let yStep: number | undefined = undefined;

    Chart.register(...registerables);
    Chart.register(annotationPlugin);

    let canvas: HTMLCanvasElement;
    let chart: Chart;

    onMount(() => configureChart());

    function configureChart() {
        if(chart) chart.destroy();
        
        const context = canvas.getContext('2d');
        if(!context) return;

        chart = new Chart(context, {
            type: type,
            data: {
                labels: labels,
                datasets: datasets
            },
            options: type === 'line' ? {
                responsive: true,
                plugins: {
                    annotation: {
                        annotations: annotations
                    },
                    title: {
                        display: true,
                        text: title
                    }
                },
                scales: {
                    xAxis: {
                        display: true,
                        title: {
                            display: true,
                            text: x
                        }
                    },
                    y: {
                        display: true,
                        min: yMin,
                        max: yMax,
                        ticks: {
                            stepSize: yStep
                        },
                        title: {
                            display: true,
                            text: y
                        }
                    }
                }
            } : {}
        });
    };

    $: if(canvas && datasets && labels) configureChart();
</script>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <canvas bind:this={canvas} width="800" height="600" />
        </div>
    </div>
</div>