// Self-contained in-house NLP & Nutrition Companion Engine
// Runs locally without external API dependencies

const NUTRITION_KNOWLEDGE = [
  {
    keywords: ['bmi', 'weight trend', 'trend', 'number', 'meaning', 'scale'],
    handler: (ctx) => {
      const logs = ctx.weightLogs || [];
      if (logs.length === 0) {
        return "You haven't logged any weight entries yet! Head over to the BMI & Metrics page to add your first entry, and I'll help you track your progress over time.";
      }
      const latest = logs[logs.length - 1];
      const initial = logs[0];
      const diff = parseFloat((latest.weightKg - initial.weightKg).toFixed(1));
      
      let trendText = diff < 0 
        ? `You have lost ${Math.abs(diff)} kg since starting.` 
        : diff > 0 
        ? `You have gained ${diff} kg since starting.` 
        : `Your weight has remained stable since your first log.`;

      return `Based on your logs, your current weight is ${latest.weightKg} kg with a BMI of ${latest.bmi} (${latest.category}). ${trendText} Remember, day-to-day weight fluctuates naturally due to water retention and sleep. Consistency matters far more than daily numbers!`;
    }
  },
  {
    keywords: ['exam', 'study', 'exam week', 'late night', 'stress', 'cramming'],
    handler: (ctx) => {
      return "Exam season can be tough on your schedule! Here are 3 student-friendly quick nutrition tips for exam weeks:\n" +
        "1. **Brain Fuel Snacks**: Grab apples with peanut butter or salted edamame instead of sugary energy drinks.\n" +
        "2. **Hydration First**: Dehydration feels a lot like mental fatigue. Keep a water bottle at your desk.\n" +
        "3. **Quick Prep Meals**: Stick to 5-10 minute meals like microwave oatmeal or black bean wraps so you save time without skipping meals.";
    }
  },
  {
    keywords: ['budget', 'cheap', 'dorm', 'hostel', 'money', 'afford', 'cost'],
    handler: (ctx) => {
      return "WeightBuddy was designed specifically for college budgets! All our 'Student Budget' tagged meals cost under $2.50 per serving. Great staples to stock up on in your dorm include:\n" +
        "• Rolled oats, peanut butter, and canned chickpeas\n" +
        "• Eggs and whole wheat tortillas\n" +
        "• Frozen edamame and frozen berries\n" +
        "• Canned tuna and microwave brown rice";
    }
  },
  {
    keywords: ['swap', 'dont like', 'hate', 'change meal', 'replace'],
    handler: (ctx) => {
      return "You can easily swap any meal you don't like! Go to the 'Diet Plan' tab, click the 'Swap Meal' button next to breakfast, lunch, or dinner, and WeightBuddy will instantly generate a delicious, budget-friendly replacement matching your target macros.";
    }
  },
  {
    keywords: ['protein', 'muscle', 'gain', 'gym', 'workout'],
    handler: (ctx) => {
      return "Building muscle on a student schedule comes down to hitting consistent protein goals. Try incorporating Greek yogurt (24g protein), eggs (18g per 3 eggs), cottage cheese, protein shakes, or chickpea wraps. Aim to spread your protein intake evenly across breakfast, lunch, and dinner.";
    }
  },
  {
    keywords: ['doctor', 'dietitian', 'medical', 'pain', 'sick', 'disorder', 'eating disorder', 'starve', 'fasting'],
    handler: (ctx) => {
      return "⚠️ **Important Health Disclaimer**: WeightBuddy is an educational planning tool, not a medical or diagnostic service. If you are experiencing physical discomfort, symptoms of disordered eating, or seeking advice for medical conditions, please consult your university health center or a registered dietitian. We strongly encourage balanced, sustainable eating habits without extreme restrictions!";
    }
  },
  {
    keywords: ['motivation', 'tired', 'giving up', 'hard', 'struggling', 'busy'],
    handler: (ctx) => {
      return "College life is demanding, and progress is never a straight line! Be kind to yourself. Missing one meal plan target or having a busy exam week won't erase your progress. Every small positive choice adds up. You've got this! 💚";
    }
  }
];

export const processAiQuery = (query, context = {}) => {
  const q = query.toLowerCase().trim();

  // Check safety/disclaimer keywords first
  if (q.includes('disorder') || q.includes('starve') || q.includes('purge') || q.includes('anorexia') || q.includes('bulimia')) {
    return {
      message: "⚠️ **Important Safety & Care Note**: If you are experiencing symptoms of disordered eating or intense food anxiety, please reach out to your campus health services or a medical professional. WeightBuddy is strictly designed for balanced student lifestyle guidance, and your health and wellbeing come first.",
      requiresMedicalNotice: true
    };
  }

  // Find best matching knowledge response
  for (const item of NUTRITION_KNOWLEDGE) {
    if (item.keywords.some(kw => q.includes(kw))) {
      return {
        message: item.handler(context),
        requiresMedicalNotice: false
      };
    }
  }

  // General fallback response
  const userName = context.userName || 'Student';
  return {
    message: `Hi ${userName}! I'm your WeightBuddy AI companion. You can ask me anything about:\n` +
      "• **Meal Swapping**: 'How do I swap my lunch?'\n" +
      "• **Student Budgeting**: 'What are cheap dorm protein sources?'\n" +
      "• **Exam Season Prep**: 'Tips for healthy eating during midterms?'\n" +
      "• **BMI & Trend Explanations**: 'Explain my weight history progress'\n\n" +
      "_Note: WeightBuddy provides educational nutrition insights and is not medical advice._",
    requiresMedicalNotice: false
  };
};
