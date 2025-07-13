import { computed, ref } from "vue";
import { VueUiGauge } from "vue-data-ui";
import type { FormatterParams, VueUiGaugeConfig } from "vue-data-ui";
import type { VueUiGaugeDataset } from "vue-data-ui";
import "vue-data-ui/style.css"; // If you are using multiple components, place this style import in your main

const caloricResultConfig = ref<VueUiGaugeConfig>({
    style: {
        chart: {
            backgroundColor: 'transparent',
            animation: {
                use: true,
            },
            layout: {
                radiusRatio: 1,
                markers:{
                    show: false
                },
                segmentNames:{
                    fontSize: 48,
                    useSerieColor: false,
                    offsetRatio: 0.72,
                    bold: true,
                },
                pointer: {
                    stroke: '#2A2A2A',
                },
                track:{
                    size: 2,
                    useGradient: false,
                }
            },
            legend:{
                show: false,
            }
        }
    },
    userOptions:{
        show:false
    }
});

const caloricResultSeries = [
    {
        from: 0,
        to: 75,
        color: '#c2f24e',
        name: '太少'
    },
    {
        from: 75,
        to: 125,
        color: '#ffd21c',
        name: '剛好'
    },
    {
        from: 125,
        to: 200,
        color: '#ff8650',
        name: '太多'
    }
];

export {
    caloricResultConfig,
    caloricResultSeries,
}