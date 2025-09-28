// Overweight and Obesity Checking Utility

// BMI reference table (image provided) at 0.5 year intervals from 0 to 17.5.
// Columns per sex (from image headers):
// 1. (Underweight) -> BMI < underweightUpper
// 2. (Normal Range) -> [underweightUpper, overweightLower]
// 3. (Overweight) -> BMI ≥ overweightLower
// 4. (Obesity) -> BMI ≥ obeseLower
export interface BMICategoryThreshold {
  underweightUpper: number;          // BMI < this => underweight
  normalRange: [number, number];     // inclusive lower/upper of normal
  overweightLower: number;           // BMI ≥ this => overweight
  obeseLower: number;                // BMI ≥ this => obese
}

export interface AgeBMIRecord {
  age: number; // age in years (increments of 0.5)
  male: BMICategoryThreshold;
  female: BMICategoryThreshold;
}

export const BMI_TABLE: AgeBMIRecord[] = [
  { age: 0.0, male: { underweightUpper: 11.5, normalRange: [11.5, 14.8], overweightLower: 14.8, obeseLower: 15.8 }, 
            female: { underweightUpper: 11.5, normalRange: [11.5, 14.7], overweightLower: 14.7, obeseLower: 15.5 } },
  { age: 1.0, male: { underweightUpper: 14.8, normalRange: [14.8, 18.3], overweightLower: 18.3, obeseLower: 19.2 }, 
            female: { underweightUpper: 14.2, normalRange: [14.2, 17.9], overweightLower: 17.9, obeseLower: 19.0 } },
  { age: 2.0, male: { underweightUpper: 14.2, normalRange: [14.2, 17.4], overweightLower: 17.4, obeseLower: 18.3 }, 
            female: { underweightUpper: 13.7, normalRange: [13.7, 17.2], overweightLower: 17.2, obeseLower: 18.1 } },
  { age: 3.0, male: { underweightUpper: 13.7, normalRange: [13.7, 17.0], overweightLower: 17.0, obeseLower: 17.8 }, 
            female: { underweightUpper: 13.5, normalRange: [13.5, 16.9], overweightLower: 16.9, obeseLower: 17.8 } },
  { age: 4.0, male: { underweightUpper: 13.4, normalRange: [13.4, 16.7], overweightLower: 16.7, obeseLower: 17.6 }, 
            female: { underweightUpper: 13.2, normalRange: [13.2, 16.8], overweightLower: 16.8, obeseLower: 17.9 } },
  { age: 5.0, male: { underweightUpper: 13.3, normalRange: [13.3, 16.7], overweightLower: 16.7, obeseLower: 17.7 }, 
            female: { underweightUpper: 13.1, normalRange: [13.1, 17.0], overweightLower: 17.0, obeseLower: 18.1 } },
  { age: 6.0, male: { underweightUpper: 13.5, normalRange: [13.5, 16.9], overweightLower: 16.9, obeseLower: 18.5 }, 
            female: { underweightUpper: 13.1, normalRange: [13.1, 17.2], overweightLower: 17.2, obeseLower: 18.8 } },
  { age: 7.0, male: { underweightUpper: 13.8, normalRange: [13.8, 17.9], overweightLower: 17.9, obeseLower: 20.3 }, 
            female: { underweightUpper: 13.4, normalRange: [13.4, 17.7], overweightLower: 17.7, obeseLower: 19.6 } },
  { age: 8.0, male: { underweightUpper: 14.1, normalRange: [14.1, 19.0], overweightLower: 19.0, obeseLower: 21.6 }, 
            female: { underweightUpper: 13.8, normalRange: [13.8, 18.4], overweightLower: 18.4, obeseLower: 20.7 } },
  { age: 9.0, male: { underweightUpper: 14.3, normalRange: [14.3, 19.5], overweightLower: 19.5, obeseLower: 22.3 },
            female: { underweightUpper: 14.0, normalRange: [14.0, 19.1], overweightLower: 19.1, obeseLower: 21.3 } },
  { age: 10,  male: { underweightUpper: 14.5, normalRange: [14.5, 20.0], overweightLower: 20.0, obeseLower: 22.7 }, 
            female: { underweightUpper: 14.3, normalRange: [14.3, 19.7], overweightLower: 19.7, obeseLower: 22.0 } },
  { age: 11,  male: { underweightUpper: 14.8, normalRange: [14.8, 20.7], overweightLower: 20.7, obeseLower: 23.2 }, 
            female: { underweightUpper: 14.7, normalRange: [14.7, 20.5], overweightLower: 20.5, obeseLower: 22.7 } },
  { age: 12,  male: { underweightUpper: 15.2, normalRange: [15.2, 21.3], overweightLower: 21.3, obeseLower: 23.9 }, 
            female: { underweightUpper: 15.2, normalRange: [15.2, 21.3], overweightLower: 21.3, obeseLower: 23.5 } },
  { age: 13,  male: { underweightUpper: 15.7, normalRange: [15.7, 21.9], overweightLower: 21.9, obeseLower: 24.5 }, 
            female: { underweightUpper: 15.7, normalRange: [15.7, 21.9], overweightLower: 21.9, obeseLower: 24.3 } },
  { age: 14,  male: { underweightUpper: 16.3, normalRange: [16.3, 22.5], overweightLower: 22.5, obeseLower: 25.0 }, 
            female: { underweightUpper: 16.3, normalRange: [16.3, 22.5], overweightLower: 22.5, obeseLower: 24.9 } },
  { age: 15,  male: { underweightUpper: 16.9, normalRange: [16.9, 22.9], overweightLower: 22.9, obeseLower: 25.4 }, 
            female: { underweightUpper: 16.7, normalRange: [16.7, 22.7], overweightLower: 22.7, obeseLower: 25.2 } },
  { age: 16,  male: { underweightUpper: 17.4, normalRange: [17.4, 23.3], overweightLower: 23.3, obeseLower: 25.6 }, 
            female: { underweightUpper: 17.1, normalRange: [17.1, 22.7], overweightLower: 22.7, obeseLower: 25.3 } },
  { age: 17,  male: { underweightUpper: 17.8, normalRange: [17.8, 23.5], overweightLower: 23.5, obeseLower: 25.6 }, 
            female: { underweightUpper: 17.3, normalRange: [17.3, 22.7], overweightLower: 22.7, obeseLower: 25.3 } },
];

// Adult (age > 18) BMI category thresholds (WHO Asian references commonly use 18.5 / 24 / 27 cutoffs)
export const ADULT_BMI_THRESHOLD: BMICategoryThreshold = {
  underweightUpper: 18.5,
  normalRange: [18.5, 24],
  overweightLower: 24,
  obeseLower: 27
};

export type Sex = 'male' | 'female';
// Return BMI category thresholds for given age & sex; if age > 17, use adult thresholds.
export function getBMICategoryThreshold(age: number, sex: Sex): BMICategoryThreshold | undefined {
  if (age > 17) return ADULT_BMI_THRESHOLD;
  const record = BMI_TABLE.find(r => r.age === age);
  return record ? record[sex] : undefined;
}

export function getRecommendedWeight(weightKg: number, heightCm: number, age: number, sex: Sex): number | undefined {
  const bmiThreshold = getBMICategoryThreshold(age, sex);
  if (!bmiThreshold) return undefined;

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < bmiThreshold.underweightUpper) {
    // Underweight - recommend weight to reach normal range lower bound
    return weightKg * 1.1;
  } else if (bmi >= bmiThreshold.overweightLower) {
    // Overweight or obese - recommend weight to reach normal range upper bound
    return weightKg * 0.9;
  } else {
    // Already in normal range
    return weightKg;
  }
}
