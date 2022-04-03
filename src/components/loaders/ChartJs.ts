import { Chart, type ChartDataset, type ChartTypeRegistry } from "chart.js";
import type { AnnotationOptions } from 'chartjs-plugin-annotation';

export function getChart(canvas: HTMLCanvasElement,
    annotations: Array<AnnotationOptions>,
    datasets: Array<ChartDataset>,
    labels: Array<string>,
    title: string,
    type: keyof ChartTypeRegistry,
    x: string,
    y: string,
    yMin: number | undefined = undefined,
    yMax: number | undefined = undefined,
    yStep: number | undefined = undefined) {
    const context = canvas.getContext('2d');
    if(!context) return;

    return new Chart(context, {
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
}