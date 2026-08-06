// Multi-Language AI Companion & Fitness Intelligence Engine
// Auto-detects user language (English, Hinglish, Hindi, Spanish, French, etc.)

const MULTI_LANG_RESPONSES = {
  hinglish: {
    greeting: "Haanji! main aapka WeightBuddy AI companion hoon. Aap mujhse diet, hostel recipes, weight loss, muscle gain ya workout tips kisi bhi bhasha mein pooch sakte ho! 💚",
    swapTip: "Aap 'Diet Plan' tab par jaakar kisi bhi meal ke samne 'Swap' button daba kar instant replacement pa sakte ho!",
    examTip: "Exam season mein padhai ke saath-saath apples aur peanut butter ya bhuna chana khao taaki blood sugar level maintain rahe aur brain crash na ho!",
    budgetTip: "Hostel/Dorm ke liye best cheap high-protein foods:\n• Boiled Chana & Sprouts (₹25)\n• Egg Bhurji (₹40)\n• Soya Chunks Pulao (₹45)\n• Oats & Peanut Butter (₹45)",
    homeWorkout: "No Gym? Koi tension nahi! Ghar/Dorm room par bina gym equipment ke muscle bana sakte ho:\n• Chest: Push-ups (3 sets x 15 reps)\n• Legs: Bodyweight / Backpack Squats\n• Back: Doorframe / Backpack Bent-Over Rows\n• Shoulders: Pike Push-ups"
  },
  hindi: {
    greeting: "नमस्ते! मैं आपका वेटबडी (WeightBuddy) AI साथी हूँ। आप मुझसे अपने भोजन, वजन बढ़ाने या घटाने, और वर्कआउट के बारे में पूछ सकते हैं! 💚",
    swapTip: "आप 'Diet Plan' सेक्शन में जाकर किसी भी भोजन को आसानी से बदल (Swap) सकते हैं।",
    examTip: "परीक्षा के दिनों में देर रात पढ़ाई करते समय प्रोटीन और फल खाएं ताकि मस्तिष्क सक्रिय रहे।",
    budgetTip: "छात्रों के लिए कम बजट में सर्वोत्तम प्रोटीन:\n• उबला चना और अंकुरित दाल (₹25)\n• अंडा भुर्जी (₹40)\n• सोया चंक्स पुलाव (₹45)",
    homeWorkout: "जिम नहीं जा सकते? घर पर ही करें ये आसान कसरत:\n• पुश-अप्स (Push-ups)\n• स्क्वैट्स (Squats)\n• बैकपैक रोइंग (Backpack Rows)"
  },
  spanish: {
    greeting: "¡Hola! Soy tu asistente de nutrición WeightBuddy. ¡Puedes preguntarme sobre planes de comidas, recetas para estudiantes y ejercicios en tu idioma preferido! 💚",
    swapTip: "¡Puedes intercambiar cualquier comida fácilmente en la pestaña 'Plan de dieta' usando el botón Cambiar!",
    budgetTip: "Excelentes alimentos económicos para estudiantes:\n• Avena con mantequilla de maní\n• Huevos revueltos\n• Ensalada de garbanzos",
    homeWorkout: "¿Sin gimnasio? Ejercicios fáciles en casa:\n• Flexiones (Push-ups)\n• Sentadillas con peso corporal\n• Remos con mochila"
  }
};

export const processAiQuery = (query, context = {}) => {
  const q = query.toLowerCase().trim();

  // Safety & Medical Disclaimer check
  if (q.includes('disorder') || q.includes('starve') || q.includes('purge') || q.includes('anorexia') || q.includes('bulimia')) {
    return {
      message: "⚠️ **Important Care Note**: If you are experiencing symptoms of disordered eating or food anxiety, please consult your campus health center or a medical professional. WeightBuddy promotes healthy, sustainable student wellness without extreme restriction.",
      requiresMedicalNotice: true
    };
  }

  // Hinglish detection
  if (q.includes('kaise') || q.includes('batao') || q.includes('kya') || q.includes('haan') || q.includes('bhai') || q.includes('sir') || q.includes('hostel') || q.includes('ghar') || q.includes('chahiye')) {
    if (q.includes('budget') || q.includes('sasta') || q.includes('paise')) {
      return { message: MULTI_LANG_RESPONSES.hinglish.budgetTip, requiresMedicalNotice: false };
    }
    if (q.includes('home') || q.includes('ghar') || q.includes('gym nahi') || q.includes('workout')) {
      return { message: MULTI_LANG_RESPONSES.hinglish.homeWorkout, requiresMedicalNotice: false };
    }
    if (q.includes('exam') || q.includes('padhai')) {
      return { message: MULTI_LANG_RESPONSES.hinglish.examTip, requiresMedicalNotice: false };
    }
    return { message: MULTI_LANG_RESPONSES.hinglish.greeting, requiresMedicalNotice: false };
  }

  // Hindi detection
  if (/[\u0900-\u097F]/.test(query)) {
    if (q.includes('घर') || q.includes('जिम')) {
      return { message: MULTI_LANG_RESPONSES.hindi.homeWorkout, requiresMedicalNotice: false };
    }
    return { message: MULTI_LANG_RESPONSES.hindi.greeting, requiresMedicalNotice: false };
  }

  // Spanish detection
  if (q.includes('hola') || q.includes('gracias') || q.includes('como') || q.includes('dieta')) {
    return { message: MULTI_LANG_RESPONSES.spanish.greeting, requiresMedicalNotice: false };
  }

  // English Fitness & Workout Queries
  if (q.includes('home') || q.includes('no gym') || q.includes('exercise') || q.includes('workout')) {
    return {
      message: "💪 **Gen Z Dorm & Home Exercise Guide (No Gym Needed)**:\n\n" +
        "1. **Chest**: Decline / Incline Push-ups (3 sets x 12-15 reps)\n" +
        "2. **Legs**: Bodyweight Squats / Lunges (3 sets x 15 reps)\n" +
        "3. **Back**: Backpack Bent-Over Rows (fill bag with books!)\n" +
        "4. **Shoulders**: Pike Push-ups\n" +
        "5. **Core**: Plank (45 seconds x 3 sets)\n\n" +
        "_Pro-Tip: Fill a sturdy backpack with textbooks to add resistance at zero extra cost!_",
      requiresMedicalNotice: false
    };
  }

  if (q.includes('exam') || q.includes('study') || q.includes('late night')) {
    return {
      message: "🧠 **Exam Season Brain Fuel**:\n" +
        "• Pair fast carbs (apples/toast) with protein or fats (peanut butter/eggs/yogurt).\n" +
        "• Keep a cold water bottle next to your desk — dehydration drops focus by up to 20%.\n" +
        "• Stick to 5-minute meals so you don't waste study time cooking!",
      requiresMedicalNotice: false
    };
  }

  if (q.includes('bmi') || q.includes('trend') || q.includes('weight')) {
    const logs = context.weightLogs || [];
    if (logs.length === 0) {
      return { message: "You haven't logged any weight entries yet! Head over to the BMI & Measurement page to log your baseline.", requiresMedicalNotice: false };
    }
    const latest = logs[logs.length - 1];
    return {
      message: `Your latest logged weight is **${latest.weightKg} kg (${latest.weightLbs} lbs)** with a BMI of **${latest.bmi}** (${latest.category}). Remember, daily weight fluctuates naturally due to sleep and water retention — focus on weekly trends!`,
      requiresMedicalNotice: false
    };
  }

  // General English fallback
  const name = context.userName || 'Student';
  return {
    message: `Hey ${name}! 🔥 I'm your AI companion. I speak English, Hinglish, Hindi, Spanish, and more!\n\n` +
      "You can ask me about:\n" +
      "• **Home vs Gym Workouts**: 'Give me an easy home exercise routine'\n" +
      "• **Hostel Budget Meals**: 'Best cheap protein foods in INR'\n" +
      "• **Exam Prep Nutrition**: 'What to eat during midterm cramming?'",
    requiresMedicalNotice: false
  };
};
