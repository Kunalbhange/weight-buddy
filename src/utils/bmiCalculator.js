// WeightBuddy BMI & Unit Conversion Utilities

export const cmToInches = (cm) => parseFloat((Number(cm) / 2.54).toFixed(1));
export const inchesToCm = (inches) => parseFloat((Number(inches) * 2.54).toFixed(1));

export const kgToLbs = (kg) => parseFloat((Number(kg) * 2.20462).toFixed(1));
export const lbsToKg = (lbs) => parseFloat((Number(lbs) / 2.20462).toFixed(1));

export const calculateBmiDetails = (weightVal, heightVal, unitSystem = 'metric', sex = 'other', waistVal = null) => {
  let weightKg = Number(weightVal);
  let heightCm = Number(heightVal);
  let waistCm = waistVal ? Number(waistVal) : null;

  if (unitSystem === 'imperial') {
    weightKg = lbsToKg(weightVal);
    heightCm = inchesToCm(heightVal);
    if (waistVal) waistCm = inchesToCm(waistVal);
  }

  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? parseFloat((weightKg / (heightM * heightM)).toFixed(1)) : 22.0;

  let category = 'Normal';
  let categoryColor = '#10b981';
  let badgeClass = 'badge-emerald';
  let explanation = 'Your weight is in a healthy, balanced standard range for your height.';

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = '#f59e0b';
    badgeClass = 'badge-amber';
    explanation = 'Your BMI is below standard recommendations. Focus on nutrient-dense meals and steady energy.';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
    categoryColor = '#f59e0b';
    badgeClass = 'badge-amber';
    explanation = 'Your weight is slightly above average for your height. Small consistent diet tweaks will yield steady progress.';
  } else if (bmi >= 30) {
    category = 'Obese';
    categoryColor = '#ef4444';
    badgeClass = 'badge-zinc';
    explanation = 'Your BMI is elevated. Prioritize gradual, balanced nutrition without drastic skipping.';
  }

  let bodyFatPct = null;
  if (waistCm && heightCm) {
    if (sex === 'male') {
      bodyFatPct = parseFloat((64 - (20 * (heightCm / waistCm))).toFixed(1));
    } else {
      bodyFatPct = parseFloat((76 - (20 * (heightCm / waistCm))).toFixed(1));
    }
    if (bodyFatPct < 5) bodyFatPct = 5;
    if (bodyFatPct > 50) bodyFatPct = 50;
  }

  return {
    bmi,
    category,
    categoryColor,
    badgeClass,
    explanation,
    weightKg: parseFloat(weightKg.toFixed(1)),
    weightLbs: kgToLbs(weightKg),
    heightCm: parseFloat(heightCm.toFixed(1)),
    heightInches: cmToInches(heightCm),
    waistCm: waistCm ? parseFloat(waistCm.toFixed(1)) : null,
    waistInches: waistCm ? cmToInches(waistCm) : null,
    bodyFatPct,
    disclaimer: 'Note: BMI and estimated body fat percentages are basic statistical guides for general awareness and are explicitly not medical advice.'
  };
};
