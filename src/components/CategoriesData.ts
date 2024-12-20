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
  [
    { name: "飯糰", value: "飯糰" },
    { name: "手卷", value: "手卷" },
    { name: "壽司", value: "壽司" },
  ],
  [
    { name: "白飯", value: "白飯" },
    { name: "包子饅頭", value: "包子饅頭" },
    { name: "小吃", value: "小吃" },
    { name: "燒餅油條", value: "燒餅油條" },
    { name: "涼麵", value: "涼麵" },
    { name: "義大利麵", value: "義大利麵" },
    { name: "其他", value: "其他" },
  ],
  [
    { name: "蛋", value: "蛋" },
    { name: "蛋餅", value: "蛋餅" },
  ],
  [
    { name: "麵包", value: "麵包" },
    { name: "蛋糕", value: "蛋糕" },
  ],
  [{ name: "燕麥", value: "燕麥" }],
  [
    { name: "茶", value: "茶" },
    { name: "乳品", value: "乳品" },
    { name: "米／豆漿", value: "米／豆漿" },
    { name: "果汁", value: "果汁" },
    { name: "咖啡", value: "咖啡" },
    { name: "燕麥", value: "燕麥" },
    { name: "可可", value: "可可" },
  ],
  [
    { name: "葉菜類", value: "葉菜類" },
    { name: "花類", value: "花類" },
    { name: "瓜果類", value: "瓜果類" },
    { name: "菇菌類", value: "菇菌類" },
    { name: "根莖類", value: "根莖類" },
    { name: "豆芽類", value: "豆芽類" },
    { name: "茄果類", value: "茄果類" },
  ],
  [
    { name: "綠色", value: "綠色" },
    { name: "紅色", value: "紅色" },
    { name: "黃色", value: "黃色" },
    { name: "紫色", value: "紫色" },
    { name: "橘色", value: "橘色" },
    { name: "棕色", value: "棕色" },
    { name: "黑色", value: "黑色" },
  ],
  [
    { name: "雞肉", value: "雞肉" },
    { name: "海鮮", value: "海鮮" },
    { name: "豬肉", value: "豬肉" },
  ],
  [
    { name: "中式點心", value: "中式點心" },
    { name: "西式點心", value: "西式點心" },
    { name: "水餃鍋貼餛飩", value: "水餃鍋貼餛飩" },
    { name: "湯品", value: "湯品" },
    { name: "日式點心", value: "日式點心" },
    { name: "沙拉", value: "沙拉" },
    { name: "熱狗", value: "熱狗" },
    { name: "速食點心", value: "速食點心" },
    { name: "鬆餅", value: "鬆餅" },
    { name: "堅果", value: "堅果" },
  ],
  [{ name: "醬料", value: "醬料" }],
  [
    { name: "三明治", value: "三明治" },
    { name: "漢堡", value: "漢堡" },
    { name: "飯糰", value: "飯糰" },
    { name: "手卷", value: "手卷" },
    { name: "壽司", value: "壽司" },
    { name: "白飯", value: "白飯" },
    { name: "包子饅頭", value: "包子饅頭" },
    { name: "小吃", value: "小吃" },
    { name: "燒餅油條", value: "燒餅油條" },
    { name: "涼麵", value: "涼麵" },
    { name: "義大利麵", value: "義大利麵" },
    { name: "其他", value: "其他" },
    { name: "蛋", value: "蛋" },
    { name: "蛋餅", value: "蛋餅" },
    { name: "麵包", value: "麵包" },
    { name: "蛋糕", value: "蛋糕" },
    { name: "燕麥", value: "燕麥" },
    { name: "茶", value: "茶" },
    { name: "乳品", value: "乳品" },
    { name: "米／豆漿", value: "米／豆漿" },
    { name: "果汁", value: "果汁" },
    { name: "咖啡", value: "咖啡" },
    { name: "燕麥", value: "燕麥" },
    { name: "可可", value: "可可" },
    { name: "葉菜類", value: "葉菜類" },
    { name: "花類", value: "花類" },
    { name: "瓜果類", value: "瓜果類" },
    { name: "菇菌類", value: "菇菌類" },
    { name: "根莖類", value: "根莖類" },
    { name: "豆芽類", value: "豆芽類" },
    { name: "茄果類", value: "茄果類" },
    { name: "綠色", value: "綠色" },
    { name: "紅色", value: "紅色" },
    { name: "黃色", value: "黃色" },
    { name: "紫色", value: "紫色" },
    { name: "橘色", value: "橘色" },
    { name: "棕色", value: "棕色" },
    { name: "黑色", value: "黑色" },
    { name: "雞肉", value: "雞肉" },
    { name: "海鮮", value: "海鮮" },
    { name: "豬肉", value: "豬肉" },
    { name: "中式點心", value: "中式點心" },
    { name: "西式點心", value: "西式點心" },
    { name: "水餃鍋貼餛飩", value: "水餃鍋貼餛飩" },
    { name: "湯品", value: "湯品" },
    { name: "日式點心", value: "日式點心" },
    { name: "沙拉", value: "沙拉" },
    { name: "熱狗", value: "熱狗" },
    { name: "速食點心", value: "速食點心" },
    { name: "鬆餅", value: "鬆餅" },
    { name: "堅果", value: "堅果" },
    { name: "醬料", value: "醬料" },
  ],
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
