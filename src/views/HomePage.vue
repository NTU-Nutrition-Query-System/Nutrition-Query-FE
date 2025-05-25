<script setup lang="ts">
import ContactUs from "@/components/common/ContactUs.vue";
import { library as faLibrary } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faUsers,
  faSchool,
  faClock,
  faBullhorn,
  faCalendar,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
faLibrary.add(faUser, faUsers, faSchool, faClock, faBullhorn, faCalendar, faArrowRight);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<template>
  <!-- banner -->
  <section class="sb-banner">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <!-- main title -->
          <div class="sb-main-title-frame">
            <div class="sb-main-title">
              <span class="sb-suptitle sb-mb-20">
                {{ $t("page_content.home.organizer") }}
              </span>
              <h1 class="sb-mb-30">
                {{ $t("page_content.home.title_1") }}<br />
                {{ $t("page_content.home.title_2") }}
              </h1>
              <h3 class="sb-mb-30">{{ $t("page_content.home.subtitle") }}</h3>
              <p class="sb-text sb-text-lg sb-mb-30">
                {{ $t("page_content.home.intro_questions[0]") }}<br />
                {{ $t("page_content.home.intro_questions[1]") }}
              </p>
              <!-- button -->
              <router-link to="/Calculator" class="sb-btn">
                <span class="sb-icon">
                  <img src="@/assets/images/ui/icon/tableware.svg" alt="icon" />
                </span>
                <span data-no-swup>{{ $t(`button.calculator`) }}</span>
              </router-link>
              <!-- button end -->
              <!-- button -->
              <router-link
                to="/About"
                class="sb-btn sb-btn-2 sb-btn-gray"
                style="margin-left: 20px"
              >
                <span class="sb-icon">
                  <font-awesome-icon 
                    :icon="['fas', 'arrow-right']" 
                    style="transform: rotate(-45deg);"
                    size="xl" />
                </span>
                <span>{{ $t("page.about") }}</span>
              </router-link>
              <!-- button end -->
            </div>
          </div>
          <!-- main title end -->
        </div>
        <div class="col-lg-6">
          <div class="sb-illustration-1">
            <img src="@/assets/images/girl.png" alt="girl" class="sb-girl" />
            <div class="sb-cirkle-1"></div>
            <div class="sb-cirkle-2"></div>
            <div class="sb-cirkle-3"></div>
            <div class="sb-cirkle-4"></div>
            <div class="sb-cirkle-5"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- banner end -->

  <!-- features -->
  <section class="sb-p-60-0">
    <div class="container">
      <div class="row flex-md-row-reverse">
        <div class="col-lg-6 align-self-center sb-mb-30">
          <h2 class="sb-mb-60">
            {{ $t("page_content.home.program_intro.title") }}
          </h2>
          <ul class="sb-features">
            <li class="sb-features-item sb-mb-60">
              <div class="sb-number">01</div>
              <div class="sb-feature-text">
                <h3 class="sb-mb-15">
                  {{ $t("page_content.home.program_intro.sections[0].title") }}
                </h3>
                <p class="sb-text">
                  {{
                    $t("page_content.home.program_intro.sections[0].content")
                  }}
                </p>
              </div>
            </li>
            <li class="sb-features-item sb-mb-60">
              <div class="sb-number">02</div>
              <div class="sb-feature-text">
                <h3 class="sb-mb-15">
                  {{ $t("page_content.home.program_intro.sections[1].title") }}
                </h3>
                <p class="sb-text">
                  {{
                    $t("page_content.home.program_intro.sections[1].content")
                  }}
                </p>
              </div>
            </li>
            <li class="sb-features-item sb-mb-60">
              <div class="sb-number">03</div>
              <div class="sb-feature-text">
                <h3 class="sb-mb-15">
                  {{ $t("page_content.home.program_intro.sections[2].title") }}
                </h3>
                <p class="sb-text">
                  {{
                    $t("page_content.home.program_intro.sections[2].content")
                  }}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-lg-6 align-self-center">
          <div class="sb-illustration-2 sb-mb-90">
            <div class="sb-interior-frame">
              <img
                src="@/assets/images/boy.png"
                alt="interior"
                class="sb-interior"
              />
            </div>
            <div class="sb-square"></div>
            <div class="sb-cirkle-1"></div>
            <div class="sb-cirkle-2"></div>
            <div class="sb-cirkle-3"></div>
            <div class="sb-cirkle-4"></div>
            <div class="sb-experience">
              <div class="sb-exp-content">
                <img src="@/assets/images/Arduino.png" />
                <p class="sb-h3">Arduino</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- features end -->

  <!-- call to action -->
  <section class="sb-call-to-action mb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 align-self-center">
          <div class="sb-cta-text">
            <h2 class="sb-mb-15">
              <FontAwesomeIcon :icon="['fas', 'bullhorn']" />
              {{ $t("page_content.home.event") }}
            </h2>
            <h3 class="sb-mb-15">
              {{ $t("page_content.home.event_info.title") }}
            </h3>
            <!-- filepath: /e:/code/NTU-Nutrition-DB/Nutrition_Query_FE/src/components/Poster.vue -->
            <div class="sb-text sb-mb-30">
              <FontAwesomeIcon
                :icon="['fas', 'user']"
                class="fa-icon"
                style="width: 1.5rem"
              />
              {{ $t("page_content.home.event_info.target") }}<br />
              <FontAwesomeIcon
                :icon="['fas', 'users']"
                class="fa-icon"
                style="width: 1.5rem"
              />
              {{ $t("page_content.home.event_info.people") }}<br />
              <FontAwesomeIcon
                :icon="['fas', 'school']"
                class="fa-icon"
                style="width: 1.5rem"
              />
              {{ $t("page_content.home.event_info.sessions") }}<br />
              <FontAwesomeIcon
                :icon="['fas', 'calendar']"
                class="fa-icon"
                style="width: 1.5rem"
              />
              {{ $t("page_content.home.event_info.date") }}<br />
              <FontAwesomeIcon
                :icon="['fas', 'clock']"
                class="fa-icon"
                style="width: 1.5rem"
              />
              {{ $t("page_content.home.event_info.time") }}<br />
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="sb-cta-text mt-5">
            <br />
            <h3 class="sb-mb-15">
              {{ $t("page_content.home.schedule.title") }}
            </h3>
            <ul>
              <li>{{ $t("page_content.home.schedule.items[0]") }}</li>
              <li>{{ $t("page_content.home.schedule.items[1]") }}</li>
              <li>{{ $t("page_content.home.schedule.items[2]") }}</li>
              <li>{{ $t("page_content.home.schedule.items[3]") }}</li>
              <li>{{ $t("page_content.home.schedule.items[4]") }}</li>
              <li>{{ $t("page_content.home.schedule.items[5]") }}</li>
              <li>{{ $t("page_content.home.schedule.items[6]") }}</li>
            </ul>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="sb-illustration-6">
            <img
              src="@/assets/images/classroom.png"
              alt="活動資訊"
              class="sb-burger"
            />
            <div class="sb-cirkle-1"></div>
            <div class="sb-cirkle-2"></div>
            <div class="sb-cirkle-3"></div>
            <div class="sb-cirkle-4"></div>
            <div class="sb-cirkle-5"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- call to action end -->

  <ContactUs />
</template>

<style scoped>
.poster-container {
  max-width: 900px;
  margin: 0 auto;
  background: #fdfdfd;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Inter", sans-serif;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.main-title {
  font-size: 2.2rem;
  font-weight: bold;
  color: #ffcc00;
}

.sub-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
}

/* 第一排圖片區域 */
.image-row {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-bottom: 30px;
  margin-top: 5rem;
}

.image-card {
  text-align: center;
  flex: 1;
}

.image-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.image {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

/* 第二排資訊區域 */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-section {
  text-align: center;
  margin-top: 10px;
}

.contact-section h4 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
}

.qr-code {
  width: 100px;
  margin-top: 10px;
}

.floating-text-container {
  display: flex;
  justify-content: space-between;
  /* 子元素分散放置在兩端 */
  align-items: center;
  /* 垂直居中對齊（可選） */
}

.floating-text-left {
  position: relative;
  color: white;
  top: 1.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.5);
  /* 半透明背景 */
  padding: 10px;
  border-radius: 8px;
  transform: rotate(-10deg);
  /* 斜角度調整 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  /* 陰影效果 */
  text-align: center;
  width: 40%;
}

.floating-text-right {
  position: relative;
  top: 1.5rem;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.5);
  /* 半透明背景 */
  padding: 10px;
  border-radius: 8px;
  transform: rotate(10deg);
  /* 斜角度調整 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  /* 陰影效果 */
  text-align: center;
  width: 40%;
}

.info-card-container {
  width: 100%;
  max-width: 400px;
  margin: 1rem auto;
}

.info-details p {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #333;
  /* 字體顏色 */
}

.title-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c;
  /* 標題顏色 */
}

@media (max-width: 768px) {
  .sb-bg-1 {
    border-left: solid 15px #ffffff;
    border-right: solid 15px #ffffff;
  }

  .sb-bg-1 div:after {
    height: 50vh;
    top: 450px;
  }

  .sb-bg-3 {
    width: 100%;
    border: none;
  }
}
</style>
