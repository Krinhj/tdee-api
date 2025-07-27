const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");

// Middleware
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: "Too many requests from this IP, please try again later",
    retry_after: "15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// BMR Calculation Function
function calculateBMR(weight, height, age, gender) {
  if (gender.toLowerCase() === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

// TDEE Calculation
function calculateTDEE(bmr, activityLevel) {
  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9,
  };
  return Math.round(
    bmr * (multipliers[activityLevel] || multipliers.sedentary)
  );
}

// Input validation middleware
function validateInput(req, res, next) {
  const { weight, height, age, gender } = req.body;
  const errors = [];

  if (!weight || weight <= 0 || weight > 1000) {
    errors.push("Weight must be between 1-1000 kg");
  }
  if (!height || height <= 0 || height > 300) {
    errors.push("Height must be between 1-300 cm");
  }
  if (!age || age <= 0 || age > 150) {
    errors.push("Age must be between 1-150 years");
  }
  if (!gender || !["male", "female"].includes(gender.toLowerCase())) {
    errors.push("Gender must be 'male' or 'female'");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors,
    });
  }

  next();
}

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "TDEE Calculator API - 2025 Edition",
    version: "2.0.0",
    endpoints: {
      "POST /calculate": "Calculate TDEE with detailed breakdown",
      "GET /activity-levels": "Get activity level options",
      "GET /health": "Health check",
    },
    features: [
      "Accurate BMR calculation using Mifflin-St Jeor equation",
      "Detailed calorie goals for weight management",
      "Macro nutrition suggestions",
      "Input validation",
      "CORS enabled",
    ],
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get("/activity-levels", (req, res) => {
  res.json({
    success: true,
    activity_levels: {
      sedentary: {
        multiplier: 1.2,
        description: "Little or no exercise, desk job",
      },
      lightly_active: {
        multiplier: 1.375,
        description: "Light exercise 1-3 days/week",
      },
      moderately_active: {
        multiplier: 1.55,
        description: "Moderate exercise 3-5 days/week",
      },
      very_active: {
        multiplier: 1.725,
        description: "Hard exercise 6-7 days/week",
      },
      extra_active: {
        multiplier: 1.9,
        description: "Very hard exercise + physical job",
      },
    },
  });
});

// Main calculation endpoint with validation
app.post("/calculate", validateInput, (req, res) => {
  try {
    const {
      weight,
      height,
      age,
      gender,
      activity_level = "sedentary",
    } = req.body;

    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activity_level);

    res.json({
      success: true,
      data: {
        input: { weight, height, age, gender, activity_level },
        bmr: Math.round(bmr),
        tdee: tdee,
        calorie_goals: {
          extreme_weight_loss: tdee - 750, // 1.5 lbs/week
          weight_loss: tdee - 500, // 1 lb/week
          mild_weight_loss: tdee - 250, // 0.5 lbs/week
          maintenance: tdee,
          mild_weight_gain: tdee + 250, // 0.5 lbs/week
          weight_gain: tdee + 500, // 1 lb/week
        },
        macro_suggestions: {
          protein_grams: Math.round(weight * 2.2), // 1g per lb bodyweight
          fat_grams: Math.round((tdee * 0.25) / 9), // 25% of calories from fat
          carb_grams: Math.round((tdee * 0.45) / 4), // 45% of calories from carbs
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    available_endpoints: ["/", "/calculate", "/activity-levels", "/health"],
  });
});

app.listen(PORT, () => {
  console.log(`🔥 TDEE API running on port ${PORT}`);
  console.log(`📊 Ready to calculate some calories!`);
});
