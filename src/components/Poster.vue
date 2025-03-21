<template>
  <!-- banner -->
  <section class="sb-banner" >
    <div class="sb-bg-1">
      <div></div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <!-- main title -->
          <div class="sb-main-title-frame">
            <div class="sb-main-title">
              <span class="sb-suptitle sb-mb-20">臺灣大學師培中心</span>
              <h1 class="sb-mb-30">生醫探索與科技<br>結合假日營隊</h1>
              <h3 class="sb-mb-30">開放中等學校申請</h3>
              <p class="sb-text sb-text-lg sb-mb-30">
                想幫助學生了解食物與葡萄糖的關係嗎?<br>
                希望學生可以運用自製Arduino葡萄糖檢測器進行濃度檢測實驗嗎?
              </p>
              <!-- button -->
              <a href="calculator" data-no-swup class="sb-btn">
                <span class="sb-icon">
                  <img src="../assets/img/ui/icons/menu.svg" alt="icon">
                </span>
                <span>營養計算機</span>
              </a>
              <!-- button end -->
              <!-- button -->
              <a href="about" data-no-swup class="sb-btn sb-btn-2 sb-btn-gray">
                <span class="sb-icon">
                  <img src="../assets/img/ui/icons/arrow.svg" alt="icon">
                </span>
                <span>關於我們</span>
              </a>
              <!-- button end -->
            </div>
          </div>
          <!-- main title end -->
        </div>
        <div class="col-lg-6">
          <div class="sb-illustration-1">
            <img src="../assets/images/girl.png" alt="girl" class="sb-girl">
            <div class="sb-cirkle-1"></div>
            <div class="sb-cirkle-2"></div>
            <div class="sb-cirkle-3"></div>
            <div class="sb-cirkle-4"></div>
            <div class="sb-cirkle-5"></div>
            <img src="../assets/img/illustrations/3.svg" alt="phones" class="sb-pik-1">
            <img src="../assets/img/illustrations/1.svg" alt="phones" class="sb-pik-2">
            <img src="../assets/img/illustrations/2.svg" alt="phones" class="sb-pik-3">
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
          <h2 class="sb-mb-60">以葡萄糖檢測生醫技術為主軸的中學生跨領域探索課程</h2>
          <ul class="sb-features">
            <li class="sb-features-item sb-mb-60">
              <div class="sb-number">01</div>
              <div class="sb-feature-text">
                <h3 class="sb-mb-15">食物營養攝取</h3>
                <p class="sb-text">讓學生了解食物的營養成分以及每日營養素需求</p>
              </div>
            </li>
            <li class="sb-features-item sb-mb-60">
              <div class="sb-number">02</div>
              <div class="sb-feature-text">
                <h3 class="sb-mb-15">人體血糖運作</h3>
                <p class="sb-text">讓學生了解食物攝取後體內葡萄糖的變化</p>
              </div>
            </li>
            <li class="sb-features-item sb-mb-60">
              <div class="sb-number">03</div>
              <div class="sb-feature-text">
                <h3 class="sb-mb-15">Arduino 葡萄糖檢測</h3>
                <p class="sb-text">Arduino軟硬體與葡萄糖檢測的生醫檢測原理</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-lg-6 align-self-center">
          <div class="sb-illustration-2 sb-mb-90">
            <div class="sb-interior-frame">
              <img src="../assets/images/boy.png" alt="interior" class="sb-interior">
            </div>
            <div class="sb-square"></div>
            <div class="sb-cirkle-1"></div>
            <div class="sb-cirkle-2"></div>
            <div class="sb-cirkle-3"></div>
            <div class="sb-cirkle-4"></div>
            <div class="sb-experience">
              <div class="sb-exp-content">
                <img src="../assets/images/Arduino.png">
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
            <h2 class="sb-mb-15"><font-awesome-icon :icon="['fas', 'bullhorn']" /> 活動資訊</h2>
            <h3 class="sb-mb-15">葡萄糖探測之旅</h3>
            <!-- filepath: /e:/code/NTU-Nutrition-DB/Nutrition_Query_FE/src/components/Poster.vue -->
            <div class="sb-text sb-mb-30">
              <font-awesome-icon :icon="['fas', 'user']" class="fa-icon"      style="width: 1.5rem;" /> 對象： 國高中學生<br>
              <font-awesome-icon :icon="['fas', 'users']" class="fa-icon"     style="width: 1.5rem;" /> 人數： 每場20~24人<br>
              <font-awesome-icon :icon="['fas', 'school']" class="fa-icon"    style="width: 1.5rem;" /> 場次： 國高中各一場<br>
              <font-awesome-icon :icon="['fas', 'calendar']" class="fa-icon"  style="width: 1.5rem;" /> 日期： 民國114~115<br>
              <font-awesome-icon :icon="['fas', 'clock']" class="fa-icon"     style="width: 1.5rem;" /> 時間： 09:00-16:30<br>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="sb-cta-text mt-5">
            <br>
            <h3 class="sb-mb-15">營隊行程</h3>
            <ul>
              <li>09:00-10:30 食物營養與體內葡萄糖</li>
              <li>10:40-12:00 血糖與生醫檢測原理</li>
              <li>12:00-13:00 午餐</li>
              <li>13:00-14:00 Arduino 溫度心跳檢測</li>
              <li>14:00-15:00 葡萄糖溶液檢測實驗</li>
              <li>15:00-16:00 實驗結果分析</li>
              <li>16:00-16:30 血糖量測(需父母同意書)</li>
            </ul>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="sb-illustration-6">
            <img src="../assets/images/classroom.png" alt="活動資訊" class="sb-burger">
            <div class="sb-cirkle-1"></div>
            <div class="sb-cirkle-2"></div>
            <div class="sb-cirkle-3"></div>
            <div class="sb-cirkle-4"></div>
            <div class="sb-cirkle-5"></div>
            <img src="../assets/img/illustrations/2.svg" alt="phones" class="sb-pik-2">
            <img src="../assets/img/illustrations/3.svg" alt="phones" class="sb-pik-3">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- call to action end -->

  <ContactUs />
</template>

<script setup lang="ts">
import Panel from "primevue/panel";
import Card from "primevue/card";
import ContactUs from "./common/ContactUs.vue";
</script>

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
    border-left: solid 15px #FFFFFF;
    border-right: solid 15px #FFFFFF;
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
