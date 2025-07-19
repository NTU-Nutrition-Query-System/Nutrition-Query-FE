<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted, ref, watch, nextTick } from "vue";
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import OverlayBadge from "primevue/overlaybadge";
import FoodTable from "@/components/FoodTable.vue";
import CaloricResult from "@/components/CaloricResult.vue";
import type { nutrient } from "@/interfaces/Calculator";
import { getTableData } from "@/apis/tableData";
import { useToast } from "primevue/usetoast";
import { useProductStore } from "@/stores/productStore";
import { usePersonInfoStore } from "@/stores/personInfoStore";

import { uploadPersonalInfo } from "@/apis/uploadPersonalInfo";

import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import {
  faSortDown,
  faCalendarDay,
  faBurger,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
faLibrary.add(faSortDown, faCalendarDay, faBurger);

const productStore = useProductStore();
const personalInfoStore = usePersonInfoStore();
const isExpanded = ref<boolean>(false);
const showResult = ref<boolean>(false);
const dailyNeeds = ref<nutrient>({
  calories: 0,
  carbohydrate: 0,
  protein: 0,
  fat: 0,
});
const toast = useToast();
const calculateDailyNeed = () => {
  if (personalInfoStore.personInfo.gender == 1) {
    dailyNeeds.value.calories =
      (66 +
        13.7 * personalInfoStore.personInfo.weight +
        5 * personalInfoStore.personInfo.height -
        6.8 * personalInfoStore.personInfo.age) *
      personalInfoStore.personInfo.activityFactor;
  } else {
    dailyNeeds.value.calories =
      (665 +
        9.6 * personalInfoStore.personInfo.weight +
        1.8 * personalInfoStore.personInfo.height -
        4.7 * personalInfoStore.personInfo.age) *
      personalInfoStore.personInfo.activityFactor;
  }

  dailyNeeds.value.protein = personalInfoStore.personInfo.weight * 1;

  dailyNeeds.value.carbohydrate = (dailyNeeds.value.calories * 0.5) / 4;

  dailyNeeds.value.fat = (dailyNeeds.value.calories * 0.3) / 9;

  productStore.setDailyNeeds(dailyNeeds.value);
};

const calculate = () => {
  showResult.value = true;
  // console.log(selectedProduct.value);
};

const nextOnClicked = () => {
  isExpanded.value = true;
  calculateDailyNeed();
  uploadPersonalInfo();
};
const selectedProduct = ref([]);

const { locale } = useI18n();

const foodTableLoaded = ref<boolean>(false);
const foodTableDisplay = ref<boolean>(false);
const calculatorDisplay = ref<boolean>(false);
const loadTableData = async () => {
  foodTableLoaded.value = true;
  productStore.loadTableData(getTableData, locale.value);
};

// TODO: dont use watch
watch(
  locale,
  () => {
    productStore.loadTableData(getTableData, locale.value);
  },
  { immediate: true }
);

const targetSection = ref<HTMLElement | null>(null);
const itemSelect = (e: any) => {
  console.log("Row clicked");
  console.log(e);
  const success = productStore.updateRow(e.data);
  if (success) {
    // Toast 提示
    toast.add({
      severity: "success",
      summary: "",
      detail: `${e?.data.item} is added`,
      life: 1000,
    });
  } else {
    toast.add({
      severity: "warn",
      summary: "",
      detail: `${e?.data.item} is removed`,
      life: 2000,
    });
  }
};
const scrollDown = () => {
  foodTableDisplay.value = true;
  calculatorDisplay.value = true;
  nextTick(() => {
    targetSection.value?.scrollIntoView({ behavior: "smooth" });
  });
};

onMounted(() => {
  loadTableData();
});
</script>

<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>

  <!-- TODO: fix the margin  -->
  <section style="margin-top: 10rem">
    <!-- 計算機 -->
    <div class="container">
      <div
        class="row d-flex justify-content-center align-items-center bg-yellow"
      >
        <div class="col-lg-7">
          <div class="sb-contact-form-frame">
            <div class="sb-illustration-9">
              <img
                src="../assets/images/boy_milk.png"
                alt="envelope"
                class="sb-envelope-1"
              />
              <img
                src="../assets/images/caculator.png"
                alt="envelope"
                class="sb-envelope-2"
              />
              <div class="sb-cirkle-1"></div>
              <div class="sb-cirkle-2"></div>
              <div class="sb-cirkle-3"></div>
            </div>
            <div class="sb-form-content">
              <div class="sb-main-content">
                <div class="sb-features-item mb-3">
                  <div class="sb-number">Step 1</div>
                </div>
                <h3 class="sb-mb-30" style="font-size: 30px">
                  {{ $t("calculator_input.title") }}
                </h3>
                <form id="form">
                  <div class="mb-3">
                    <div class="form-check form-check-inline">
                      <!-- <input class="form-check-input check-activity" type="radio" name="gender" id="boy" value="boy"> -->
                      <RadioButton
                        v-model="personalInfoStore.personInfo.gender"
                        value=1
                        style="margin-left: 1rem"
                      />
                      <label
                        class="form-check-label"
                        style="margin-left: 0.3rem; font-size: 24px"
                        >{{ $t("calculator_input.gender.male") }}</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <!-- <input class="form-check-input check-activity" type="radio" name="gender" id="girl" value="girl"> -->
                      <RadioButton
                        v-model="personalInfoStore.personInfo.gender"
                        value=0
                        style="margin-left: 1rem"
                      />
                      <label
                        class="form-check-label"
                        style="margin-left: 0.3rem; font-size: 24px"
                        >{{ $t("calculator_input.gender.female") }}</label
                      >
                    </div>
                  </div>
                  <!-- age -->
                  <div
                    class="sb-group-input"
                    style="
                      width: 150px;
                      text-align: center;
                      margin: 2.5rem auto;
                    "
                  >
                    <input
                      v-model="personalInfoStore.personInfo.age"
                      type="text"
                      name="age"
                      required
                    />
                    <span class="sb-bar"></span>
                    <label>{{ $t("calculator_input.age") }}</label>
                  </div>

                  <!-- height -->
                  <div
                    class="sb-group-input"
                    style="
                      width: 150px;
                      text-align: center;
                      margin: 2.5rem auto;
                    "
                  >
                    <input
                      v-model="personalInfoStore.personInfo.height"
                      type="text"
                      name="height"
                      required
                    />
                    <span class="sb-bar"></span>
                    <label
                      >{{ $t("calculator_input.height") }}({{
                        $t("calculator_input.centimeter")
                      }})</label
                    >
                  </div>

                  <!-- weight -->
                  <div
                    class="sb-group-input"
                    style="
                      width: 150px;
                      text-align: center;
                      margin: 2.5rem auto;
                    "
                  >
                    <input
                      v-model="personalInfoStore.personInfo.weight"
                      type="text"
                      name="weight"
                      required
                    />
                    <span class="sb-bar"></span>
                    <label
                      >{{ $t("calculator_input.weight") }}({{
                        $t("calculator_input.kilogram")
                      }})</label
                    >
                  </div>

                  <!-- activity_factor -->
                  <div class="mb-3">
                    <h3
                      style="
                        margin-top: 1.5rem;
                        margin-bottom: 0rem;
                        font-size: 30px;
                      "
                    >
                      {{ $t("calculator_input.activity_factor.title") }}
                    </h3>

                    <div
                      class="form-check text-left"
                      style="margin-top: 0.5rem"
                    >
                      <!-- <input v-model="activityFactor" value="1.3" class="form-check-input check-activity" type="radio" name="intensity" id="mild"> -->
                      <RadioButton
                        v-model="personalInfoStore.personInfo.activityFactor"
                        value=1.3
                        class="form-check-input check-activity"
                      />
                      <label
                        class="ml-1 form-check-label"
                        for="mild"
                        style="font-size: 24px; font-weight: bold"
                      >
                        {{ $t("calculator_input.activity_factor.mild") }}
                      </label>
                      <p class="ml-1 sb-text" style="font-size: 18px">
                        {{ $t("calculator_input.activity_factor.tips.mild") }}
                      </p>
                    </div>

                    <div
                      class="form-check text-left"
                      style="margin-top: 0.5rem"
                    >
                      <!-- <input v-model="activityFactor" value="1.5" class="form-check-input check-activity" type="radio" name="intensity" id="moderate"> -->
                      <RadioButton
                        v-model="personalInfoStore.personInfo.activityFactor"
                        value=1.5
                        class="form-check-input check-activity"
                      />
                      <label
                        class="ml-1 form-check-label"
                        for="moderate"
                        style="font-size: 24px; font-weight: bold"
                      >
                        {{ $t("calculator_input.activity_factor.moderate") }}
                      </label>
                      <p class="ml-1 sb-text" style="font-size: 18px">
                        {{
                          $t("calculator_input.activity_factor.tips.moderate")
                        }}
                      </p>
                    </div>

                    <div
                      class="form-check text-left"
                      style="margin-top: 0.5rem"
                    >
                      <!-- <input v-model="activityFactor" value="2" class="form-check-input check-activity" type="radio" name="intensity" id="severe"> -->
                      <RadioButton
                        v-model="personalInfoStore.personInfo.activityFactor"
                        value=2
                        class="form-check-input check-activity"
                      />
                      <label
                        class="ml-1 form-check-label"
                        for="severe"
                        style="font-size: 24px; font-weight: bold"
                      >
                        {{ $t("calculator_input.activity_factor.severe") }}
                      </label>
                      <p class="ml-1 sb-text" style="font-size: 18px">
                        {{ $t("calculator_input.activity_factor.tips.severe") }}
                      </p>
                    </div>
                  </div>

                  <!-- button -->
                  <button
                    class="sb-btn sb-cf-submit sb-show-success"
                    type="button"
                    id="calculateButton"
                    :label="$t('calculator_input.calculate')"
                    @click="nextOnClicked"
                  >
                    <span class="sb-icon">
                      <img
                        src="@/assets/images/ui/icon/tableware.svg"
                        alt="icon"
                      />
                    </span>
                    <span>{{ $t("calculator_input.calculate") }}</span>
                  </button>
                  <br />
                  <span
                    class="sb-text sb-text"
                    id="scrollHint"
                    v-if="isExpanded"
                    >{{ $t("calculator_input.scroll_down") }}
                    <FontAwesomeIcon :icon="['fas', 'sort-down']" />
                  </span>
                  <!-- button end -->
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 計算機End -->

    <!-- 我的營養素 -->
    <div class="container" id="Nutrients" v-if="isExpanded">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-lg-5">
          <div class="sb-illustration-9">
            <div class="sb-cirkle-1"></div>
            <div class="sb-cirkle-2"></div>
            <div class="sb-cirkle-3"></div>
          </div>
          <div class="sb-form-content">
            <div class="sb-main-content">
              <h3 class="sb-mb-30">
                <FontAwesomeIcon :icon="['fas', 'calendar-day']" />
                {{ $t("calculator_result_title_my") }}
                <span class="text-yellow">{{
                  $t("calculator_result_title_daily")
                }}</span>
                {{ $t("calculator_result_title_nutrient") }}
              </h3>
              <div
                class="sb-menu-item sb-menu-item-sm"
                v-for="(value, key) in dailyNeeds"
                :key="key"
              >
                <div class="sb-card-tp">
                  <h4 class="sb-card-title">{{ $t(key) }}:</h4>
                  <div class="sb-price">
                    {{ value.toFixed(2) }} ({{ key === "calories" ? "kcal" : "g" }})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="sb-illustration-9">
            <div class="sb-cirkle-1"></div>
            <div class="sb-cirkle-2"></div>
            <div class="sb-cirkle-3"></div>
          </div>
          <div class="sb-form-content">
            <div class="sb-main-content">
              <h3 class="sb-mb-30">
                <FontAwesomeIcon :icon="['fas', 'burger']" />
                {{ $t("calculator_result_title_my") }}
                <span class="text-yellow">{{
                  $t("calculator_result_title_meal")
                }}</span>
                {{ $t("calculator_result_title_nutrient") }}
              </h3>
              <div
                class="sb-menu-item sb-menu-item-sm"
                v-for="(value, key) in dailyNeeds"
                :key="key"
              >
                <div class="sb-card-tp">
                  <h4 class="sb-card-title">{{ $t(key) }}:</h4>
                  <div class="sb-price">
                    {{ (value / 3.0).toFixed(2)}} ({{ key === "calories" ? "kcal" : "g" }})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row d-flex justify-content-center align-items-center align-items-center"
      >
        <div class="col-lg-7">
          <div class="sb-contact-form-frame">
            <div class="sb-illustration-9">
              <img
                src="../assets/images/hamburger.png"
                alt="envelope"
                class="sb-envelope-1"
              />
              <img
                src="../assets/images/fruit.png"
                alt="envelope"
                class="sb-envelope-2"
              />
              <div class="sb-cirkle-1"></div>
              <div class="sb-cirkle-2"></div>
              <div class="sb-cirkle-3"></div>
            </div>
            <div class="sb-form-content">
              <div class="sb-main-content">
                <div class="sb-features-item mb-3">
                  <div class="sb-number">Step 2</div>
                </div>
                <h3 class="sb-mb-30">
                  {{ $t("calculator_input.food_selection_prompt") }}
                  <span class="sb-text"
                    ><br />{{ $t("calculator_input.view_selected_food") }}</span
                  >
                </h3>

                <!-- button -->
                <button
                  class="sb-btn sb-cf-submit sb-show-success"
                  @click="scrollDown"
                >
                  <span class="sb-icon">
                    <i class="pi pi-arrow-up-right" />
                  </span>
                  <span>{{ $t("calculator_input.choosing") }}</span>
                </button>
                <!-- button end -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div ref="targetSection" v-if="foodTableLoaded && foodTableDisplay">
    <!--
    A fixed positioned overlay badge component in the bottom-right corner of the screen
    with a circular shape.
    @property {string} value - Number displayed in the badge.
    -->
    <OverlayBadge
      v-if="productStore.selectedProducts.length > 0"
      class="overlaybadge-calc-btn"
      size="large"
      severity="danger"
      style="
        position: fixed;
        bottom: 1.2rem;
        right: 1.2rem;
        z-index: 1000;
        margin-right: 1rem;
      "
      :value="productStore.selectedProducts.length"
    >
      <Button
        class="calculator-btn"
        icon="pi pi-calculator"
        :label="$t('calculate')"
        @click="calculate"
      />
    </OverlayBadge>
    <FoodTable />
  </div>
  <CaloricResult
    v-if="showResult"
    v-model:visible="showResult"
    v-model:needData="dailyNeeds"
  ></CaloricResult>
</template>

<style>
.bg-yellow {
  background-image: url(../assets/images/bg-yellow.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}

@media (max-width: 480px) {
  .bg-yellow {
    background-color: #f5c332;
    background-image: none;
  }
}

.text-yellow {
  background-color: #f5c332;
  padding: 2px 4px;
  margin: auto 2px;
  border-radius: 3px;
}

.calculator-description-title {
  text-align: center;
}

.calculator-description-content {
  text-align: center;
}

.calculator {
  max-width: 35rem;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: max-content;
  transition: background-color 0.3s ease;
  font-size: 18px;
}

.calculator.expanded {
  height: max-content;
}

.activity-radio-btn {
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0 1rem;
}

.activity-tips {
  margin-left: 2.8rem;
  font-size: 16px;
}

.display-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.calculator .result {
  margin: 0 5rem;
  padding: 10px;
  color: black;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.calc-gender-select {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.calc-InputNum-label {
  min-width: 5rem;
  text-align: right;
}

.calc-InputNum-unit {
  min-width: 5rem;
  text-align: left;
}

.calc-InputNum {
  border-radius: 4px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
  margin: 0 0.5rem;
  height: 2.3rem;
  width: 7rem;
}

.calc-InputNum:focus {
  border-color: #3498db;
}

.calc-InputNum .p-inputtext {
  text-align: center;
  font-size: 20px;
  width: 5rem;
}

.overlaybadge-calc-btn:hover {
  transform: scale(1.05);
}

.calculator-btn {
  display: flex;
  flex-direction: column;
  border-radius: 25px !important;
  height: 5rem;
  width: 5rem;
  border: none !important;
  color: #444444 !important;
  background-color: #f5c332 !important;
}

.calculator-btn .p-button-icon {
  font-size: 2rem;
  margin-right: 0 !important;
  /* Remove default icon spacing */
  margin-bottom: -0.2rem;
  /* Space between icon and text */
}
</style>
