import { computed, ref } from "vue";
import type { FormatterParams, VueUiGaugeConfig } from "vue-data-ui";
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

export {
    caloricResultConfig,
}