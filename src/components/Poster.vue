<template>
  <div class="poster-container">
    <!-- 標題區 -->
    <div class="header">
      <h1 class="main-title">113-2 台灣大學師培中心</h1>
      <h2 class="sub-title">
        生醫探索與科技結合假日營隊<br />
        開放中等學校申請
      </h2>
    </div>
    <div class="floating-text-container">
      <div class="floating-text-left">
        想幫助學生了解<br />食物與葡萄糖的關係嗎?
      </div>
      <div class="floating-text-right">
        想幫助學生了解<br />食物與葡萄糖的關係嗎?
      </div>
    </div>

    <!-- 第一排：三張圖片區域 -->
    <div class="image-row">
      <div class="image-card">
        <h3 class="image-title">食物營養攝取</h3>
        <img
          src="../assets/imgs/Poster/img1.png"
          alt="食物"
          class="info-image"
        />
      </div>
      <div class="image-card">
        <h3 class="image-title">人體血糖運作</h3>
        <img
          src="../assets/imgs/Poster/img2.png"
          alt="人體血糖運作"
          class="info-image"
        />
      </div>
      <div class="image-card">
        <h3 class="image-title">Arduino 葡萄糖檢測</h3>
        <img
          src="../assets/imgs/Poster/img3.jpg"
          alt="葡萄糖檢測"
          class="info-image"
        />
      </div>
    </div>

    <!-- 第二排：活動資訊與聯絡資訊 -->
    <div class="info-section">
      <Card>
        <template #title>
          <span class="title-text">活動資訊</span>
        </template>
        <template #content>
          <div class="info-details" style="background-color: #f0f0f0">
            <p><strong>對象：</strong> 國高中學生</p>
            <p><strong>人數：</strong> 每場 <b>20-24</b> 人</p>
            <p><strong>場次：</strong> 國高中各一場</p>
            <p><strong>日期：</strong> 114 年 2-4 月</p>
            <p><strong>時間：</strong> 09:00-16:00</p>
          </div>
        </template>
      </Card>

      <div style="margin-top: 1rem">
        <Panel header="更多資訊!" toggleable collapsed="true">
          <p class="m-0">
            本計畫透過國科會支持，近年來開發了結合科學與科技，以葡萄糖檢測生醫技術為主軸的中學生跨領域探索課程。目前的計畫名稱：跨領域<b>STEM</b>課程之開發：人體葡萄糖探測之旅的前端資料庫建立。
            我們計畫的實施對象為國中或高中學生，目的在於鼓勵學生結合過去所學的生物、健體、化學、物理等課程，以及由此拓展到電子科技與程式設計的領域。這個營隊分為上下兩個部分，第一個部分為生物營養與血糖運作的探究，我們會使用自行開發的營養資料庫，提供給學生做探究使用；第二個部分為<b>Arduino</b>軟硬體與葡萄糖檢測的生醫檢測原理，以及葡萄糖檢測計建構，並且用這個感測計來進行葡萄糖濃度檢測的實驗。學生可以對於從食物、營養、到體內葡萄糖的變化有一個完整的了解，並且可以看到血糖檢測器背後的原理。
          </p>
          <br />
          <p>
            因為這是一個六個小時的一日營隊型的活動，因此可能會用到假日期間。如果學校認為這個營隊對於學生有幫助，我可以到貴校跟校長主任介紹更多課程的內容細節及所用的儀器。
          </p>
        </Panel>
      </div>

      <!-- 聯絡資訊與 QR Code -->
      <div class="contact-section">
        <h4>歡迎國高中學校與本計畫聯繫！</h4>
        <p>
          <i>
            聯絡信箱：<strong>skhsu900@gmail.com</strong><br />
            或掃 QR Code 填表單</i
          >
        </p>
        <img src="../assets/imgs/Poster/img4.png" alt="食物" class="qr-code" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Panel from "primevue/panel";
import Card from "primevue/card";
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
  justify-content: space-between; /* 子元素分散放置在兩端 */
  align-items: center; /* 垂直居中對齊（可選） */
}
.floating-text-left {
  position: relative;
  color: white;
  top: 1.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  padding: 10px;
  border-radius: 8px;
  transform: rotate(-10deg); /* 斜角度調整 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* 陰影效果 */
  text-align: center;
  width: 40%;
}
.floating-text-right {
  position: relative;
  top: 1.5rem;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  padding: 10px;
  border-radius: 8px;
  transform: rotate(10deg); /* 斜角度調整 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* 陰影效果 */
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
  color: #333; /* 字體顏色 */
}

.title-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e74c3c; /* 標題顏色 */
}
</style>
