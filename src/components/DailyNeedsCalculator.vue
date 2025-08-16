<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

import { onMounted } from "vue";

import RadioButton from "primevue/radiobutton";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

import type { nutrient } from "@/interfaces/Calculator";
import { useProductStore } from "@/stores/productStore";
const productStore = useProductStore();
import { usePersonalInfoStore } from "@/stores/personInfoStore";
const personalInfoStore = usePersonalInfoStore();
import { uploadPersonalInfo } from "@/apis/uploadPersonalInfo";
const toast = useToast();

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);

const isExpanded = ref<boolean>(false);

const dailyNeeds = ref<nutrient>({
  calories: 0,
  carbohydrate: 0,
  protein: 0,
  fat: 0,
});

const height = ref<string>("");
const weight = ref<string>("");
const age = ref<string>("");

onMounted(() => {
  if (personalInfoStore.checkCookieExists()) {
    age.value = personalInfoStore.personInfo.age.toString();
    height.value = personalInfoStore.personInfo.height.toString();
    weight.value = personalInfoStore.personInfo.weight.toString();
  }
});

const nextOnClicked = () => {
  if (!personalInfoStore.personInfo.gender) {
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
  if (!personalInfoStore.personInfo.activityFactor) {
    toast.add({
      severity: "error",
      summary: "",
      detail: "請選擇活動因子",
      life: 2000,
    });
    return;
  }
  personalInfoStore.personInfo.age = parseInt(age.value);
  personalInfoStore.personInfo.height = parseInt(height.value);
  personalInfoStore.personInfo.weight = parseInt(weight.value);
  personalInfoStore.savePersonInfoToCookie();
  isExpanded.value = true;
  productStore.calculateDailyNeeds(personalInfoStore.personInfo);
  uploadPersonalInfo();
};

const closeDialog = () => {
  emit("update:visible", false);
};
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="emit('update:visible', $event)"
    :header="t('calculator_input.title')"
    :modal="true"
    @hide="closeDialog"
    style="overflow-x: scroll; width: 80%"
  >
    <section>
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
                        <!-- <input class="form-check-input check-activity" type="radio" name="gender" id="boy" value="boy"> -->
                        <RadioButton
                          v-model="personalInfoStore.personInfo.gender"
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
                        <!-- <input class="form-check-input check-activity" type="radio" name="gender" id="girl" value="girl"> -->
                        <RadioButton
                          v-model="personalInfoStore.personInfo.gender"
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
                          v-model="personalInfoStore.personInfo.activityFactor"
                          value="1.3"
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
                          value="1.5"
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
                          value="2"
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
                  v-for="(value, key) in dailyNeeds"
                  :key="key"
                >
                  <div class="sb-card-tp">
                    <h4 class="sb-card-title">{{ $t(key) }}:</h4>
                    <div class="sb-price">
                      {{ value.toFixed(2) }} ({{
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
                  v-for="(value, key) in dailyNeeds"
                  :key="key"
                >
                  <div class="sb-card-tp">
                    <h4 class="sb-card-title">{{ $t(key) }}:</h4>
                    <div class="sb-price">
                      {{ (value / 3.0).toFixed(2) }} ({{
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
                    @click="closeDialog"
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
  </Dialog>
</template>

<style scoped>
.calculator-content {
  padding: 1rem;
}

.field {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.field label {
  min-width: 80px;
  font-weight: 500;
}

.calc-gender-select {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.calc-InputNum {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0.5rem;
  width: 120px;
  text-align: center;
}

.calc-InputNum:focus {
  border-color: #3498db;
  outline: none;
}

.calc-InputNum-label {
  min-width: 80px;
  text-align: right;
}

.calc-InputNum-unit {
  min-width: 50px;
  text-align: left;
}

.activity-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.activity-radio-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.results {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.result-item {
  margin: 0.5rem 0;
  font-weight: 500;
}

.button-group {
  margin-top: 2rem;
  text-align: center;
}

.submit-btn {
  background-color: #f5c332;
  color: #444444;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #e6b12f;
}
</style>
