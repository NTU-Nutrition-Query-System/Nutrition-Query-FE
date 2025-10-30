<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

import Button from "primevue/button";
import OverlayBadge from "primevue/overlaybadge";
import RadioButton from "primevue/radiobutton";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
const toast = useToast();

import { getTableData } from "@/apis/tableData";
import { uploadPersonalInfo } from "@/apis/uploadPersonalInfo";

import FoodTable from "@/components/FoodTable.vue";
import CaloricResult from "@/components/CaloricResult.vue";

import { useProductStore } from "@/stores/productStore";
const productStore = useProductStore();

import { usePersonalInfoStore } from "@/stores/personalInfoStore";
const personalInfoStore = usePersonalInfoStore();

import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import {
  faSortDown,
  faCalendarDay,
  faBurger,
} from "@fortawesome/free-solid-svg-icons";
faLibrary.add(faSortDown, faCalendarDay, faBurger);

const showResult = ref<boolean>(false);


const resultShow = () => {
  showResult.value = true;
};

const foodTableLoaded = ref<boolean>(false);

const loadTableData = async () => {
  foodTableLoaded.value = true;
  productStore.loadTableData(getTableData, locale.value);
};

import { watch } from "vue";

watch(locale, () => {
  loadTableData();
});

const activityFactor = ref<string>("");
const height = ref<string>("");
const weight = ref<string>("");
const age = ref<string>("");
const gender = ref<string>("");

const foodTableSection = ref<HTMLElement>();

const scrollToFoodTable = () => {
  nextTick(() => {
    foodTableSection.value?.scrollIntoView({ behavior: "smooth", block: "end" });
  });
};

onMounted(() => {
  if (personalInfoStore.checkCookieExists()) {
    age.value = personalInfoStore.personalInfo.age.toString();
    height.value = personalInfoStore.personalInfo.height.toString();
    weight.value = personalInfoStore.personalInfo.weight.toString();
    gender.value = personalInfoStore.personalInfo.gender.toString();
    activityFactor.value = personalInfoStore.personalInfo.activityFactor.toString();
  }
});

const isExpanded = ref<boolean>(false);

const nextOnClicked = () => {
  if (gender.value === "") {
    toast.add({
      severity: "error",
      summary: "",
      detail: "請選擇性別",
      life: 2000,
    });
    return;
  }
  if (age.value === "") {
    toast.add({
      severity: "error",
      summary: "",
      detail: "請輸入年齡",
      life: 2000,
    });
    return;
  }
  if (height.value === "") {
    toast.add({
      severity: "error",
      summary: "",
      detail: "請輸入身高",
      life: 2000,
    });
    return;
  }
  if (weight.value === "") {
    toast.add({
      severity: "error",
      summary: "",
      detail: "請輸入體重",
      life: 2000,
    });
    return;
  }
  if (activityFactor.value === "") {
    toast.add({
      severity: "error",
      summary: "",
      detail: "請選擇活動因子",
      life: 2000,
    });
    return;
  }
  personalInfoStore.personalInfo.gender = parseInt(gender.value);
  personalInfoStore.personalInfo.age = parseInt(age.value);
  personalInfoStore.personalInfo.height = parseInt(height.value);
  personalInfoStore.personalInfo.weight = parseInt(weight.value);
  personalInfoStore.personalInfo.activityFactor = parseFloat(activityFactor.value);
  isExpanded.value = true;
  if(authStore.isLoggedIn){
    personalInfoStore.saveToCookie();
    uploadPersonalInfo();
  }
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
                <Toast
                  position="top-center"
                  :baseZIndex="1500"
                  style="width: 20rem"
                />
                <div class="sb-features-item mb-3">
                  <div class="sb-number">Step 1</div>
                </div>
                <h3 class="sb-mb-30" style="font-size: 30px">
                  {{ $t("calculator_input.title") }}
                </h3>
                <form id="form">
                  <div class="mb-3">
                    <div class="form-check form-check-inline">
                      <RadioButton
                        v-model="gender"
                        value="1"
                        style="margin-left: 1rem"
                      />
                      <label
                        class="form-check-label"
                        style="margin-left: 0.3rem; font-size: 24px"
                        >{{ $t("calculator_input.gender.male") }}</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <RadioButton
                        v-model="gender"
                        value="0"
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
                    <input v-model="age" type="text" name="age" required />
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
                      v-model="height"
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
                      v-model="weight"
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
                        v-model="
                          activityFactor
                        "
                        value="1.15"
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
                        v-model="
                          activityFactor
                        "
                        value="1.28"
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
                        v-model="
                          activityFactor
                        "
                        value="1.5"
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
                        {{
                          $t("calculator_input.activity_factor.tips.severe")
                        }}
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
                v-for="(value, key) in personalInfoStore.dailyRequirement"
                :key="key"
              >
                <div class="sb-card-tp">
                  <h4 class="sb-card-title">{{ $t(key) }}:</h4>
                  <div class="sb-price">
                    {{ value.toFixed(0) }} ({{
                      key === "calories" ? "kcal" : "g"
                    }})
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
                v-for="(value, key) in personalInfoStore.dailyRequirement"
                :key="key"
              >
                <div class="sb-card-tp">
                  <h4 class="sb-card-title">{{ $t(key) }}:</h4>
                  <div class="sb-price">
                    {{ (value / 3.0).toFixed(0) }} ({{
                      key === "calories" ? "kcal" : "g"
                    }})
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
                    ><br />{{
                      $t("calculator_input.view_selected_food")
                    }}</span
                  >
                </h3>

                <!-- button -->
                <button
                  class="sb-btn sb-cf-submit sb-show-success"
                  @click="scrollToFoodTable"
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

  <div ref="foodTableSection" v-if="foodTableLoaded && isExpanded">
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
        @click="resultShow"
      />
    </OverlayBadge>
    <section style="margin-top: 10rem">
      <!-- 計算機 -->
      <FoodTable />
    </section>
  </div>

  

  <CaloricResult
    v-if="showResult"
    v-model:visible="showResult"
  />
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

.calculator-btn:hover {
  transform: scale(1.05);
}

.overlaybadge-calc-btn:hover {
  transform: scale(1.05);
}
</style>
