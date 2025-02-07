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
    low: [0, 7],
    medium: [7, 14],
    high: [14, 1000],
    default: [0, 1000],
  })
);

const carbRange = computed(() =>
  computeRange(carbOption.value?.value, {
    low: [0, 30],
    medium: [30, 60],
    high: [60, 1000],
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
    low: [0, 5],
    medium: [5, 10],
    high: [10, 1000],
    default: [0, 1000],
  })
);
const subclassRange = computed(() => {
  return subclassOption.value?.value;
});
const proteinFilterOptions = ref([
  { name: "< 7(g)", value: "low" },
  { name: "7~14(g)", value: "medium" },
  { name: "> 14(g)", value: "high" },
]);

const carbFilterOptions = ref([
  { name: "< 30(g)", value: "low" },
  { name: "30~60(g)", value: "medium" },
  { name: "> 60(g)", value: "high" },
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
    { name: "小吃", value: "小吃" },
    { name: "中式湯品", value: "中式湯品" },
    { name: "手卷", value: "手卷" },
    { name: "水餃鍋貼餛飩", value: "水餃鍋貼餛飩" },
    { name: "包子饅頭", value: "包子饅頭" },
    { name: "玉米", value: "玉米" },
    { name: "地瓜", value: "地瓜" },
    { name: "涼麵", value: "涼麵" },
    { name: "蛋餅", value: "蛋餅" },
    { name: "飯與粥", value: "飯與粥" },
    { name: "飯糰", value: "飯糰" },
    { name: "義大利麵", value: "義大利麵" },
    { name: "壽司", value: "壽司" },
    { name: "漢堡", value: "漢堡" },
    { name: "燒餅油條", value: "燒餅油條" },
    { name: "鐵板麵", value: "鐵板麵" },
    { name: "蘿蔔糕", value: "蘿蔔糕" },
  ],
  [
    { name: "三明治", value: "三明治" },
    { name: "西式湯品", value: "西式湯品" },
    { name: "乳酪餅", value: "乳酪餅" },
    { name: "起司", value: "起司" },
    { name: "馬鈴薯", value: "馬鈴薯" },
    { name: "速食點心", value: "速食點心" },
    { name: "漢堡", value: "漢堡" },
    { name: "燕麥", value: "燕麥" },
    { name: "點心", value: "點心" },
    { name: "鬆餅", value: "鬆餅" },
  ],
  [{ name: "飯糰", value: "飯糰" }],
  [
    { name: "牛肉", value: "牛肉" },
    { name: "海鮮", value: "海鮮" },
    { name: "蛋", value: "蛋" },
    { name: "豬肉", value: "豬肉" },
    { name: "鴨肉", value: "鴨肉" },
    { name: "雞肉", value: "雞肉" },
  ],
  [
    { name: "瓜果類", value: "瓜果類" },
    { name: "沙拉", value: "沙拉" },
    { name: "豆芽類", value: "豆芽類" },
    { name: "花類", value: "花類" },
    { name: "茄果類", value: "茄果類" },
    { name: "根莖類", value: "根莖類" },
    { name: "菇菌類", value: "菇菌類" },
    { name: "葉菜類", value: "葉菜類" },
  ],
  [
    { name: "紅色", value: "紅色" },
    { name: "棕色", value: "棕色" },
    { name: "紫色", value: "紫色" },
    { name: "黃色", value: "黃色" },
    { name: "黑色", value: "黑色" },
    { name: "綠色", value: "綠色" },
    { name: "橘色", value: "橘色" },
  ],
  [
    { name: "吐司", value: "吐司" },
    { name: "貝果", value: "貝果" },
    { name: "蛋糕", value: "蛋糕" },
    { name: "麵包", value: "麵包" },
  ],
  [
    { name: "可可", value: "可可" },
    { name: "米／豆漿", value: "米／豆漿" },
    { name: "乳品", value: "乳品" },
    { name: "咖啡", value: "咖啡" },
    { name: "果汁", value: "果汁" },
    { name: "茶", value: "茶" },
    { name: "養樂多", value: "養樂多" },
    { name: "燕麥飲", value: "燕麥飲" },
    { name: "碳酸飲料", value: "碳酸飲料" },
  ],
  [
    { name: "油", value: "油" },
    { name: "堅果", value: "堅果" },
    { name: "酪梨", value: "酪梨" },
  ],
  [
    { name: "巧克力", value: "巧克力" },
    { name: "布丁", value: "布丁" },
    { name: "泡麵", value: "泡麵" },
    { name: "洋芋片", value: "洋芋片" },
  ],
  [
    { name: "沙拉醬", value: "沙拉醬" },
    { name: "果醬", value: "果醬" },
    { name: "芝麻醬", value: "芝麻醬" },
    { name: "花生醬", value: "花生醬" },
    { name: "蜂蜜", value: "蜂蜜" },
  ],
  [
    { name: "三明治", value: "三明治" },
    { name: "小吃", value: "小吃" },
    { name: "中式湯品", value: "中式湯品" },
    { name: "手卷", value: "手卷" },
    { name: "水餃鍋貼餛飩", value: "水餃鍋貼餛飩" },
    { name: "包子饅頭", value: "包子饅頭" },
    { name: "玉米", value: "玉米" },
    { name: "地瓜", value: "地瓜" },
    { name: "涼麵", value: "涼麵" },
    { name: "蛋餅", value: "蛋餅" },
    { name: "飯與粥", value: "飯與粥" },
    { name: "飯糰", value: "飯糰" },
    { name: "義大利麵", value: "義大利麵" },
    { name: "壽司", value: "壽司" },
    { name: "漢堡", value: "漢堡" },
    { name: "燒餅油條", value: "燒餅油條" },
    { name: "鐵板麵", value: "鐵板麵" },
    { name: "蘿蔔糕", value: "蘿蔔糕" },
    { name: "西式湯品", value: "西式湯品" },
    { name: "乳酪餅", value: "乳酪餅" },
    { name: "起司", value: "起司" },
    { name: "馬鈴薯", value: "馬鈴薯" },
    { name: "速食點心", value: "速食點心" },
    { name: "燕麥", value: "燕麥" },
    { name: "點心", value: "點心" },
    { name: "鬆餅", value: "鬆餅" },
    { name: "牛肉", value: "牛肉" },
    { name: "海鮮", value: "海鮮" },
    { name: "蛋", value: "蛋" },
    { name: "豬肉", value: "豬肉" },
    { name: "鴨肉", value: "鴨肉" },
    { name: "雞肉", value: "雞肉" },
    { name: "瓜果類", value: "瓜果類" },
    { name: "沙拉", value: "沙拉" },
    { name: "豆芽類", value: "豆芽類" },
    { name: "花類", value: "花類" },
    { name: "茄果類", value: "茄果類" },
    { name: "根莖類", value: "根莖類" },
    { name: "菇菌類", value: "菇菌類" },
    { name: "葉菜類", value: "葉菜類" },
    { name: "紅色", value: "紅色" },
    { name: "棕色", value: "棕色" },
    { name: "紫色", value: "紫色" },
    { name: "黃色", value: "黃色" },
    { name: "黑色", value: "黑色" },
    { name: "綠色", value: "綠色" },
    { name: "橘色", value: "橘色" },
    { name: "吐司", value: "吐司" },
    { name: "貝果", value: "貝果" },
    { name: "蛋糕", value: "蛋糕" },
    { name: "麵包", value: "麵包" },
    { name: "可可", value: "可可" },
    { name: "米／豆漿", value: "米／豆漿" },
    { name: "乳品", value: "乳品" },
    { name: "咖啡", value: "咖啡" },
    { name: "果汁", value: "果汁" },
    { name: "茶", value: "茶" },
    { name: "養樂多", value: "養樂多" },
    { name: "燕麥飲", value: "燕麥飲" },
    { name: "碳酸飲料", value: "碳酸飲料" },
    { name: "油", value: "油" },
    { name: "堅果", value: "堅果" },
    { name: "酪梨", value: "酪梨" },
    { name: "巧克力", value: "巧克力" },
    { name: "布丁", value: "布丁" },
    { name: "泡麵", value: "泡麵" },
    { name: "洋芋片", value: "洋芋片" },
    { name: "沙拉醬", value: "沙拉醬" },
    { name: "果醬", value: "果醬" },
    { name: "芝麻醬", value: "芝麻醬" },
    { name: "花生醬", value: "花生醬" },
    { name: "蜂蜜", value: "蜂蜜" },
  ],
]);

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

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
};
