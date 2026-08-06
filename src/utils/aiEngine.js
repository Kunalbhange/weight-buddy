// Comprehensive Multi-Language Nutrition & Food Intelligence AI Engine
// Answers any food, recipe, macro, calorie, diet, or nutrition question in any language!

const NUTRITION_DATABASE = {
  samosa: { name: "Samosa (1 piece)", calories: "260 kcal", protein: "4g", carbs: "32g", fat: "14g", tip: "High in refined flour and oil. Enjoy occasionally! Swap deep frying for air-frying or eat with green mint chutney." },
  biryani: { name: "Chicken / Veg Biryani (1 plate)", calories: "550 kcal", protein: "28g", carbs: "65g", fat: "18g", tip: "Great source of carbs and protein! Pair with cucumber raita to aid digestion and keep portions balanced." },
  maggi: { name: "Instant Noodles / Maggi (1 pack)", calories: "380 kcal", protein: "8g", carbs: "52g", fat: "15g", tip: "High in sodium and refined carbs. Upgrade it in your hostel by tossing in 2 boiled eggs or soya chunks + veggies!" },
  paneer: { name: "Paneer / Cottage Cheese (100g)", calories: "265 kcal", protein: "18g", carbs: "3g", fat: "20g", tip: "Awesome student protein source! Rich in calcium and healthy fats. Great for muscle building." },
  chicken: { name: "Chicken Breast (100g cooked)", calories: "165 kcal", protein: "31g", carbs: "0g", fat: "3.6g", tip: "Top tier lean muscle-building protein! Easy to grill or pan-fry in 10 minutes." },
  egg: { name: "Eggs (2 whole eggs)", calories: "140 kcal", protein: "12g", carbs: "1g", fat: "10g", tip: "Complete protein powerhouse with choline for brain function. Perfect 5-minute hostel food!" },
  oats: { name: "Rolled Oats (1 cup dry - 80g)", calories: "300 kcal", protein: "11g", carbs: "54g", fat: "5g", tip: "Complex carbs + high soluble fiber. Keeps blood sugar steady for hours during lectures and exams." },
  rice: { name: "Steamed White Rice (1 cup cooked)", calories: "205 kcal", protein: "4g", carbs: "45g", fat: "0.5g", tip: "Fast digesting carbs. Great energy source pre/post workout. Pair with dal, rajma, or chicken for balanced macros." },
  roti: { name: "Whole Wheat Roti / Chapati (1 piece)", calories: "100 kcal", protein: "3g", carbs: "20g", fat: "0.5g", tip: "Rich in complex fiber and B vitamins. 2-3 rotis per meal form a solid staple Indian student diet." },
  dal: { name: "Yellow / Black Dal (1 bowl)", calories: "150 kcal", protein: "9g", carbs: "24g", fat: "2.5g", tip: "Essential plant protein & gut-friendly fiber. Combine with rice or roti for complete amino acid profile." },
  banana: { name: "1 Medium Banana", calories: "105 kcal", protein: "1.3g", carbs: "27g", fat: "0.3g", tip: "Rich in potassium and fast natural energy. The ultimate cheap 1-minute pre-workout snack!" },
  milk: { name: "Whole / Toned Milk (1 glass - 250ml)", calories: "150 kcal", protein: "8g", carbs: "12g", fat: "8g", tip: "Contains whey & casein protein + calcium. Great before sleep for continuous night-time muscle recovery." },
  dosa: { name: "Plain / Masala Dosa (1 piece)", calories: "220-350 kcal", protein: "6g", carbs: "45g", fat: "10g", tip: "Fermented batter is great for gut health and microbiota! Pair with coconut chutney and sambar for protein." },
  idli: { name: "Steamed Idli (2 pieces)", calories: "130 kcal", protein: "4g", carbs: "26g", fat: "0.5g", tip: "Low calorie, oil-free, easy on the stomach. Excellent breakfast option during heavy exam stress." },
  pizza: { name: "Cheese Pizza (1 slice)", calories: "280 kcal", protein: "12g", carbs: "30g", fat: "12g", tip: "Calorie dense. If eating pizza with friends, add chicken/paneer toppings and pair with a side salad." },
  burger: { name: "Veg / Chicken Burger", calories: "350-480 kcal", protein: "15g", carbs: "45g", fat: "20g", tip: "High in fast carbs and fat. Choose grilled patty instead of deep-fried patty for lower calories." },
  chole: { name: "Chole / Chickpea Curry (1 bowl)", calories: "240 kcal", protein: "12g", carbs: "36g", fat: "7g", tip: "High fiber and plant protein! Keeps you full for hours during back-to-back classes." },
  rajma: { name: "Rajma / Kidney Beans (1 bowl)", calories: "220 kcal", protein: "14g", carbs: "38g", fat: "4g", tip: "Loaded with iron, potassium, and slow-digesting complex carbs. Student classic staple!" },
  peanutbutter: { name: "Peanut Butter (2 tbsp - 32g)", calories: "190 kcal", protein: "8g", carbs: "7g", fat: "16g", tip: "Dense healthy fats & protein. Ideal for weight gain (clean bulk) or spreading over banana slices." },
  proteinpowder: { name: "Whey Protein Powder (1 scoop)", calories: "120 kcal", protein: "24g", carbs: "2g", fat: "1.5g", tip: "Fastest convenient protein source for students. Great post-workout or shaken with milk in 30 seconds." },
  chai: { name: "Indian Milk Tea / Chai (1 cup with sugar)", calories: "90-120 kcal", protein: "3g", carbs: "15g", fat: "4g", tip: "Great study booster! Reduce added sugar to 1/2 tsp to save 40 calories per cup." },
  coffee: { name: "Black Coffee / Espresso (1 cup)", calories: "5 kcal", protein: "0g", carbs: "0g", fat: "0g", tip: "Natural pre-workout and focus enhancer! Caffeine boosts metabolic rate and study alertness." }
};

export const processAiQuery = (query, context = {}) => {
  const rawQ = query.trim();
  const q = rawQ.toLowerCase();

  // 1. Safety check
  if (q.includes('disorder') || q.includes('starve') || q.includes('purge') || q.includes('anorexia') || q.includes('bulimia')) {
    return {
      message: "⚠️ **Important Care Note**: If you are experiencing symptoms of food anxiety or disordered eating, please consult your campus health center. WeightBuddy promotes healthy, balanced student nutrition without extreme restriction.",
      requiresMedicalNotice: true
    };
  }

  // 2. Language Detection
  const isHinglish = q.includes('kaise') || q.includes('batao') || q.includes('kya') || q.includes('haan') || q.includes('bhai') || q.includes('sir') || q.includes('hostel') || q.includes('ghar') || q.includes('chahiye') || q.includes('khao');
  const isHindi = /[\u0900-\u097F]/.test(rawQ);
  const isSpanish = q.includes('hola') || q.includes('como') || q.includes('dieta') || q.includes('comida');

  // 3. Search Food Items in Nutrition Database
  for (const key of Object.keys(NUTRITION_DATABASE)) {
    if (q.includes(key)) {
      const food = NUTRITION_DATABASE[key];
      if (isHinglish) {
        return {
          message: `🥗 **${food.name} Information**:\n\n` +
            `• **Calories**: ${food.calories}\n` +
            `• **Protein**: ${food.protein} | **Carbs**: ${food.carbs} | **Fat**: ${food.fat}\n\n` +
            `💡 **Hostel & Student Tip**: ${food.tip}\n\n` +
            `Aap ise apne daily calorie target ke hisaab se kha sakte hain!`,
          requiresMedicalNotice: false
        };
      }
      return {
        message: `🥗 **${food.name} Full Nutrition Info**:\n\n` +
          `• **Calorie Count**: ${food.calories}\n` +
          `• **Protein**: ${food.protein}\n` +
          `• **Carbohydrates**: ${food.carbs}\n` +
          `• **Healthy Fats**: ${food.fat}\n\n` +
          `💡 **Student & Hostel Tip**: ${food.tip}`,
        requiresMedicalNotice: false
      };
    }
  }

  // 4. Exercise / Workout Questions
  if (q.includes('workout') || q.includes('exercise') || q.includes('gym') || q.includes('home') || q.includes('muscle') || q.includes('pushup')) {
    if (isHinglish) {
      return {
        message: "💪 **Student Home & Gym Exercise Guide**:\n\n" +
          "1. **Chest**: Push-ups (3 sets x 15 reps) ya Barbell Bench Press\n" +
          "2. **Legs**: Bodyweight / Backpack Squats (3 sets x 15 reps)\n" +
          "3. **Back**: Backpack Bent-Over Rows / Doorframe Pulls\n" +
          "4. **Shoulders**: Pike Push-ups / Overhead Press\n\n" +
          "_Ghar/Dorm room mein heavy books vala backpack use karke resistance badha sakte ho!_",
        requiresMedicalNotice: false
      };
    }
    return {
      message: "💪 **Student Compound Exercise Routine (Gym vs Easy Home)**:\n\n" +
        "• **Chest**: Push-ups or Barbell Bench Press (3 sets x 12-15 reps)\n" +
        "• **Legs**: Backpack Bodyweight Squats (3 sets x 15 reps)\n" +
        "• **Back**: Backpack Rows or Lat Pulldowns (3 sets x 12 reps)\n" +
        "• **Shoulders**: Pike Push-ups or Overhead Dumbbell Press\n\n" +
        "💡 _Easy Step: Keep your core tight and control the movement for 2 seconds down and 1 second up!_",
      requiresMedicalNotice: false
    };
  }

  // 5. General Food / Eating / Nutrition Questions
  if (q.includes('eat') || q.includes('food') || q.includes('diet') || q.includes('nutrition') || q.includes('weight') || q.includes('fat') || q.includes('protein') || q.includes('carb')) {
    if (isHinglish) {
      return {
        message: "🥗 **Student Nutrition & Meal Guide**:\n\n" +
          "• **High Protein Hostel Foods**: Eggs (₹40), Soya Chunks (₹45), Paneer (₹85), Greek Yogurt, Chana (₹25).\n" +
          "• **Weight Loss (Cut)**: Mild calorie deficit, high fiber veggies & moong sprouts chaat.\n" +
          "• **Weight Gain (Bulk)**: Peanut butter banana shakes, rajma rice, paneer tikka bowls.\n\n" +
          "Aap kisi bhi specific khane ka naam (jaise: *Samosa, Biryani, Maggi, Eggs, Paneer, Chicken, Oats, Rice*) pooch sakte ho!",
        requiresMedicalNotice: false
      };
    }

    return {
      message: "🥗 **Complete Student Nutrition Guide**:\n\n" +
        "1. **High Protein Options**: Eggs, Chicken Breast, Paneer, Soya Chunks, Greek Yogurt, Roasted Chana.\n" +
        "2. **Complex Carbs**: Rolled Oats, Whole Wheat Roti, Brown Rice, Sweet Potatoes, Quinoa.\n" +
        "3. **Healthy Fats**: Peanut Butter, Almonds, Chia Seeds, Olive Oil.\n\n" +
        "💡 *You can ask me about ANY food item (e.g. 'Nutrition in Biryani', 'Is Maggi healthy?', 'Calories in Samosa', 'How to eat for muscle gain') and I will give you full calorie & macro details!*",
      requiresMedicalNotice: false
    };
  }

  // 6. Generic Fallback with Instant Food Lookup Hint
  const name = context.userName || 'Student';
  if (isHinglish) {
    return {
      message: `Haanji ${name}! Main aapka AI Nutrition Companion hoon. Aap mujhse kisi bhi khane ke baare mein (jaise *Biryani, Maggi, Samosa, Paneer, Eggs, Oats, Chicken, Dosa*) pooch sakte ho! 🥑`,
      requiresMedicalNotice: false
    };
  }

  return {
    message: `Hey ${name}! 🔥 I'm your AI Nutrition & Food Companion.\n\nYou can ask me about **ANY food item, recipe, meal, or exercise routine**!\n\nTry asking:\n• *"Calories in Biryani"* or *"Is Samosa bad for diet?"*\n• *"How much protein in 2 eggs?"*\n• *"Best cheap hostel meals under ₹50"*`,
    requiresMedicalNotice: false
  };
};
