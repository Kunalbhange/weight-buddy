# WeightBuddy — Free Student Nutrition & Diet Planner

**WeightBuddy** is a free, student-focused diet, nutrition, and weight tracking platform built specifically for college students balancing busy class schedules, late-night study sessions, and dorm budgets.

---

## 🌟 Key Highlights

- **100% Free & In-House Logic**: Zero third-party API dependencies. Everything runs self-contained.
- **Premium Black & White Design**: Modern aesthetic featuring true black (`#0A0A0A`), crisp off-white text (`#F5F5F0`), and emerald (`#10B981`) accent indicators.
- **Schedule Density Aware**: Prioritizes 5-10 minute quick-prep, grab-and-go recipes for heavy schedule class days.
- **Student Budget Tags**: Recipes tagged with cost estimates under $2.50 per serving.
- **In-House AI Nutrition Companion**: Local, offline intelligence engine providing diet tips, meal swap guidance, and exam prep nutrition.
- **Timestamped BMI & Measurement Tracker**: Custom SVG line chart displaying weight and BMI progression over time with milestone callouts.
- **Data Privacy & Ownership**: Self-hosted bcrypt authentication, rate-limited auth endpoints, JSON data export, and full account deletion (*Right to be forgotten*).

---

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, Lucide Icons, Custom CSS Variables & Glassmorphic Design System (`index.css`).
- **Backend**: Node.js, Express.js.
- **Database**: File-backed JSON Database (`server/database.js`).
- **Security**: `bcryptjs`, `jsonwebtoken`, custom sliding-window rate limiter middleware.

---

## 💻 Local Setup & Development

### 1. Clone the Repository
```bash
git clone https://github.com/Kunalbhange/weight-buddy.git
cd weight-buddy
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
# In Terminal 1 - Launch Backend API Server (Port 5001)
npm run server

# In Terminal 2 - Launch Frontend Dev Server (Port 3000)
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 📋 Features Overview

1. **Onboarding Wizard**: Collects age, height, weight, activity level, class schedule density, dietary restrictions (vegetarian/vegan/halal/kosher), and core weight goals.
2. **Rule-Based Diet Engine**: Calculates Mifflin-St Jeor TDEE calorie baseline and macro split (Protein, Carbs, Fat).
3. **Meal Swapper**: Real-time meal replacement for any breakfast, lunch, dinner, or snack.
4. **BMI Calculator**: Computes standard body mass index categories and optional waist-to-height body fat estimates with medical disclaimer.
5. **Exam Prep Alerts & Automations**: Exam date scheduler and log nudges.
6. **Data Privacy**: Export data to JSON file or permanently delete account and records.

---

## 🛡️ License & Disclaimer

WeightBuddy is an educational dietary awareness tool and does not provide clinical diagnosis or medical advice.
