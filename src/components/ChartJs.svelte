<script lang="ts">
    import { Chart, registerables, type ChartDataset, type ChartTypeRegistry } from 'chart.js';
    import annotationPlugin, { type AnnotationOptions } from 'chartjs-plugin-annotation';
    import { getChart } from './loaders/ChartJs';

    Chart.register(...registerables);
    Chart.register(annotationPlugin);

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

    let canvas: HTMLCanvasElement;
    let chart: Chart | undefined;

    $: if(canvas && datasets && labels) {
        chart?.destroy();
        chart = getChart(canvas, annotations, datasets, labels, title, type, x, y, yMin, yMax, yStep);
    }
</script>

<div class="container-fluid">
    <div class="row mt-2">
        <div class="col">
            <canvas bind:this={canvas} width="800" height="600" />
        </div>
    </div>
</div>