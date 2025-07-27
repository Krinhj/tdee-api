# 🔥 TDEE Calculator API

[![Live API](https://img.shields.io/badge/Live%20API-Railway-brightgreen)](https://tdee-api-production.up.railway.app)
[![RapidAPI](https://img.shields.io/badge/Available%20on-RapidAPI-blue)](https://rapidapi.com/Krinh/api/tdee-calculator)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-lightgrey)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Fast and accurate REST API for calculating Total Daily Energy Expenditure (TDEE) with detailed calorie goals and macro suggestions. Built for fitness apps, health platforms, and nutrition tools.**

## 🚀 Quick Start

### Live API
```bash
# Test the API instantly
curl https://tdee-api-production.up.railway.app/health
```

### RapidAPI Integration
```javascript
const response = await fetch('https://tdee-calculator.p.rapidapi.com/calculate', {
  method: 'POST',
  headers: {
    'X-RapidAPI-Key': 'YOUR_API_KEY',
    'X-RapidAPI-Host': 'tdee-calculator.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    age: 25,
    gender: 'male',
    height: 175,
    weight: 70,
    activity_level: 'moderately_active'
  })
});
```

## ⚡ Features

- **🧮 Accurate BMR Calculation** - Uses Mifflin-St Jeor equation
- **🏃 5 Activity Levels** - From sedentary to extra active
- **🎯 Calorie Goals** - Weight loss, maintenance, and gain targets
- **🥗 Macro Breakdown** - Protein, fat, and carb suggestions
- **⚡ Fast Response** - Sub-100ms response times
- **🛡️ Rate Limited** - Built-in abuse prevention
- **📱 CORS Enabled** - Ready for web applications
- **🔒 Input Validation** - Comprehensive error handling

## 📊 API Response Example

```json
{
  "bmr": 1680.75,
  "tdee": 2521.13,
  "activity_level": "moderately_active",
  "calorie_goals": {
    "extreme_weight_loss": 1521.13,
    "weight_loss": 2021.13,
    "maintenance": 2521.13,
    "weight_gain": 3021.13,
    "extreme_weight_gain": 3521.13
  },
  "macro_suggestions": {
    "protein": { "grams": 126, "calories": 504, "percentage": 20 },
    "fat": { "grams": 84, "calories": 756, "percentage": 30 },
    "carbs": { "grams": 315.14, "calories": 1260.56, "percentage": 50 }
  }
}
```

## 🛠️ Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/calculate` | Calculate TDEE with full breakdown |
| `GET` | `/activity-levels` | Get all activity levels |
| `GET` | `/health` | API health check |
| `GET` | `/` | API information |

## 🏗️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Deployment**: Railway
- **Marketplace**: RapidAPI
- **Rate Limiting**: express-rate-limit
- **CORS**: cors middleware
- **Validation**: Custom validation layer

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Krinh/tdee-api.git
cd tdee-api

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
```bash
# Create .env file
PORT=3000
NODE_ENV=development
```

### Testing
```bash
# Test all endpoints
npm test

# Test specific endpoint
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "age": 25,
    "gender": "male", 
    "height": 175,
    "weight": 70,
    "activity_level": "moderately_active"
  }'
```

## 📈 Performance

- **Response Time**: < 100ms average
- **Uptime**: 99.9%
- **Rate Limit**: 100 requests per 15 minutes
- **Concurrent Users**: 1000+

## 💰 Pricing

| Plan | Price | Requests/Month |
|------|-------|----------------|
| **Free** | $0 | 100 |
| **Pro** | $2.99 | 1,000 |
| **Ultra** | $5.99 | 10,000 |
| **Mega** | $9.99 | 50,000 |

[**🔗 Subscribe on RapidAPI**](https://rapidapi.com/Krinh/api/tdee-calculator)

## 🎯 Use Cases

- **Fitness Apps** - Calculate daily calorie needs
- **Nutrition Platforms** - Macro planning and diet tracking  
- **Health Tools** - Weight management calculations
- **Wellness Apps** - Comprehensive metabolic data
- **Diet Trackers** - Calorie goal setting

## 📚 Documentation

### Complete API Documentation
- [**📖 Full Documentation**](https://rapidapi.com/Krinh/api/tdee-calculator)
- [**🧪 Interactive Testing**](https://rapidapi.com/Krinh/api/tdee-calculator/playground)

### Activity Levels
```javascript
const activityLevels = {
  sedentary: 1.2,        // Little or no exercise
  lightly_active: 1.375, // Light exercise 1-3 days/week
  moderately_active: 1.5, // Moderate exercise 3-5 days/week
  very_active: 1.725,    // Hard exercise 6-7 days/week
  extra_active: 1.9      // Very hard exercise & physical job
};
```

### BMR Formula (Mifflin-St Jeor)
```
Men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5
Women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161
```

## 🔧 Deployment

### Railway (Current)
```bash
# Deploy to Railway
railway login
railway init
railway up
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

- **⭐ Star this repo** if you find it helpful!
- **🐛 Report bugs** via GitHub Issues
- **💡 Request features** via GitHub Discussions
- **📧 Business inquiries** via RapidAPI

## 📊 Status

![GitHub last commit](https://img.shields.io/github/last-commit/Krinh/tdee-api)
![GitHub issues](https://img.shields.io/github/issues/Krinh/tdee-api)
![GitHub stars](https://img.shields.io/github/stars/Krinh/tdee-api)

---

**Built by [Krinh](https://github.com/Krinh) | Available on [RapidAPI](https://rapidapi.com/Krinh/api/tdee-calculator)**
