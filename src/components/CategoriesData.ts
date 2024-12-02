import { ref, computed, watch } from "vue";
import { FilterMatchMode } from "@primevue/core/api";

type range = {
  [key: string]: [number, number]; // For keys like "low", "medium", etc.
  default: [number, number]; // A required fallback range
};

const computeRange = (optionValue: string, ranges: range) => {
  if (optionValue === undefined) return ranges.default;
  return ranges[optionValue] || ranges.default;
};

const proteinOption = ref();
const carbOption = ref();
const caloriesOption = ref();
const fatOption = ref();
const subclassOption = ref();
const proteinRange = computed(() =>
  computeRange(proteinOption.value?.value, {
    low: [0, 18],
    medium: [18, 30],
    high: [30, 1000],
    default: [0, 1000],
  })
);

const carbRange = computed(() =>
  computeRange(carbOption.value?.value, {
    low: [0, 50],
    medium: [50, 100],
    high: [100, 1000],
    default: [0, 1000],
  })
);

const caloriesRange = computed(() =>
  computeRange(caloriesOption.value?.value, {
    low: [0, 200],
    medium: [200, 500],
    high: [500, 1000],
    default: [0, 1000],
  })
);

const fatRange = computed(() =>
  computeRange(fatOption.value?.value, {
    low: [0, 10],
    medium: [10, 20],
    high: [20, 1000],
    default: [0, 1000],
  })
);
const subclassRange = computed(() => {
  return subclassOption.value?.value;
});
const proteinFilterOptions = ref([
  { name: "< 18(g)", value: "low" },
  { name: "18~30(g)", value: "medium" },
  { name: "> 30(g)", value: "high" },
]);

const carbFilterOptions = ref([
  { name: "< 50(g)", value: "low" },
  { name: "50~100(g)", value: "medium" },
  { name: "> 100(g)", value: "high" },
]);

const caloriesFilterOptions = ref([
  { name: "< 200(cal)", value: "low" },
  { name: "200~500(cal)", value: "medium" },
  { name: "> 500(cal)", value: "high" },
]);

const fatFilterOptions = ref([
  { name: "< 10(g)", value: "low" },
  { name: "10~20(g)", value: "medium" },
  { name: "> 20(g)", value: "high" },
]);

export const subclassOptions = ref<
  Array<Array<{ name: string; value: string }>>
>([
  [
    { name: "三明治", value: "三明治" },
    { name: "漢堡", value: "漢堡" },
  ],
  [{ name: "水果", value: "水果" }],
  [
    { name: "雞肉", value: "雞肉" },
    { name: "豬肉", value: "豬肉" },
    { name: "海鮮", value: "海鮮" },
  ],
  [{ name: "青菜類", value: "青菜類" }],
]);
watch(subclassOption, () => {
  console.log("Subclass option changed!");
});
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  protein: { value: proteinRange, matchMode: FilterMatchMode.BETWEEN },
  carbohydrate: { value: carbRange, matchMode: FilterMatchMode.BETWEEN },
  calories: { value: caloriesRange, matchMode: FilterMatchMode.BETWEEN },
  fat: { value: fatRange, matchMode: FilterMatchMode.BETWEEN },
  subclass: { value: subclassRange, matchMode: FilterMatchMode.CONTAINS },
});

const clearFilter = () => {
  proteinOption.value =
    carbOption.value =
    caloriesOption.value =
    fatOption.value =
    subclassOption.value =
      undefined;
};

export {
  proteinOption,
  carbOption,
  caloriesOption,
  fatOption,
  subclassOption,
  proteinRange,
  carbRange,
  caloriesRange,
  fatRange,
  proteinFilterOptions,
  carbFilterOptions,
  caloriesFilterOptions,
  fatFilterOptions,
  filters,
  clearFilter,
};
