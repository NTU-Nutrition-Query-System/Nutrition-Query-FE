<script setup lang="ts">
import Banner from '@/components/common/Banner.vue';
import ContactUs from '@/components/common/ContactUs.vue';
</script>

<template>

  <head>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>

  <Banner title="關於我們" subtitle="" page="about"/>

  <!-- TODO: fix the margin  -->
  <section class="sb-about-text sb-p-90-0">
        <div class="sb-bg-2" style="margin-top: 90px">
          <div></div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-6 align-self-center">
              <div class="sb-illustration-2 sb-mb-90">
                <div class="sb-interior-frame">
                  <img src="../assets/images/food.jpg" alt="食物照片" class="sb-interior" style="object-position: center">
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
            <div class="col-lg-6 align-self-center sb-mb-60">
              <h2 class="sb-mb-60">生醫探索與科技<br>結合假日營隊</h2>
              <p class="sb-text sb-mb-30">本計畫透過國科會支持，近年來開發了結合科學與科技，以葡萄糖檢測生醫技術為主軸的中學生跨領域探索課程。目前的計畫名稱：跨領域STEM課程之開發：人體葡萄糖探測之旅的前端資料庫建立。 我們計畫的實施對象為國中或高中學生，目的在於鼓勵學生結合過去所學的生物、健體、化學、物理等課程，以及由此拓展到電子科技與程式設計的領域。這個營隊分為上下兩個部分，第一個部分為生物營養與血糖運作的探究，我們會使用自行開發的營養資料庫，提供給學生做探究使用；第二個部分為Arduino軟硬體與葡萄糖檢測的生醫檢測原理，以及葡萄糖檢測計建構，並且用這個感測計來進行葡萄糖濃度檢測的實驗。學生可以對於從食物、營養、到體內葡萄糖的變化有一個完整的了解，並且可以看到血糖檢測器背後的原理。</p>
              <p class="sb-text sb-mb-60">因為這是一個六個小時的一日營隊型的活動，因此可能會用到假日期間。如果學校認為這個營隊對於學生有幫助，我可以到貴校跟校長主任介紹更多課程的內容細節及所用的儀器。</p>
              <!-- <img src="../assets/images/signature.png" alt="Signature" class="sb-signature sb-mb-30"> -->
            </div>
          </div>
        </div>
      </section>

    <!-- call to action -->
      <ContactUs/>
    <!-- call to action end -->
  
    
</template>

<style>
.bg-yellow {
  background-image: url(../assets/images/bg-yellow.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}

@media (max-width: 480px) {
  .bg-yellow {
    background-color: #F5C332;
    background-image: none;
  }
}

.text-yellow{
  background-color: #F5C332; 
  padding:2px 4px; 
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
  width:  5rem;
  border: none !important;
  color: #444444 !important;
  background-color: #F5C332 !important;
}
.calculator-btn .p-button-icon {
  font-size: 2rem;
  margin-right: 0 !important;
  /* Remove default icon spacing */
  margin-bottom: -0.2rem;
  /* Space between icon and text */
}
</style>
