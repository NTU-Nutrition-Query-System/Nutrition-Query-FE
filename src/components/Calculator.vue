<template>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <div class="unit-converter">
      <div class="tabs">
        <button class="tab active">Metric Units</button>
        <button class="tab">US Units</button>
        <!-- <button class="tab">Other Units</button> -->
      </div>
      <div  v-if="currentTab === 'Metric Units'" class="form-container">
        <div class="form-group">
          <label for="age">Age</label>
          <input type="number" id="age" v-model="age" min="2" max="120">
          <span class="range">ages: 2 - 120</span>
        </div>
        <div class="form-group">
            <label>Gender</label><br>
            <form>
                <label class="radio-inline">
                    <input type="radio" id="male" value="male"  v-model="gender">Male
                </label>
                <label class="radio-inline">
                    <input type="radio" id="female" value="female"  v-model="gender">Female
                </label>
            </form>


            
            <!-- <div class="radio-inline">
                <input type="radio" id="male" value="male" v-model="gender"><label for="male">Male</label>
                <input type="radio" id="female" value="female" v-model="gender"><label for="female">Female</label>
            </div> -->
        </div>
        <div class="form-group">
          <label for="height-feet">Height</label>
          <div class="input-group">
            <!-- <input type="number" id="height-feet" v-model="heightFeet" min="0">
            <span>feet</span>
            <input type="number" id="height-inches" v-model="heightInches" min="0" max="11">
            <span>inches</span> -->
            <input type="number" id="height-feet" v-model="heightCm" min="0">
            <span>cm</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="weight">Weight</label>
          <div class="input-group">
            <input type="number" id="weight" v-model="weight" min="0">
            <span>kg</span>
          </div>
          
        </div>


        <div class="button-group">
          <label> Daily caloric needs:</label><span>{{ caloric_needs > -1 ? caloric_needs : '' }}</span>
        </div>


        <div class="button-group">
          <button class="calculate" @click="calculate">Calculate</button>
          <button class="clear" @click="clear">Clear</button>
        </div>

        
      </div>
    </div>


    
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        age: 15,
        gender: 'male',
        heightFeet: 5,
        heightInches: 10,
        heightCm: 150,
        weight: 50,
        currentTab: 'Metric Units',
        caloric_needs: -1,
      }
    },
    methods: {
      calculate() {
        // Implement calculation logic here
        console.log('Calculating...');
        if(this.gender==='male'){
            this.caloric_needs = 66+13.7*this.weight + 5*this.heightCm-6.8*this.age
        }
        else {
            this.caloric_needs = 655 + 9.6 * this.weight + 1.8 * heightCm - 4.7 * this.age;
        }
        console.log(this.caloric_needs);
      },
      clear() {
        this.age = 25;
        this.gender = 'male';
        this.heightFeet = 5;
        this.heightInches = 10;
        this.weight = 160;
      }
    }
  }
  </script>
  
  <style>
  .unit-converter {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
  }
  
  .tabs {
    display: flex;
    margin-bottom: 20px;
  }
  
  .tab {
    flex: 1;
    padding: 10px;
    background-color: #4a6da7;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .tab.active {
    background-color: #2c4a7c;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="number"], input[type="radio"] {
    margin-right: 5px;
  }
  .input-group {
    display: flex;
    align-items: center;
  }
  
  .input-group input, .input-group span {
    margin-right: 10px;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  .calculate {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .clear {
    background-color: #f1f1f1;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>