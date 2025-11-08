# InsightBoard

> Your personalized news companion - bringing you the latest headlines with AI-powered summaries, so you can stay informed without the information overload.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

## ✨ Features

- **Real-time News Feeds** - Get the latest headlines as they happen
- **AI Summaries** - Quick, digestible article summaries powered by AI
- **Smart Filtering** - Browse by categories like Tech, Science, Business, and more
- **Personal Collections** - Save your favorite articles for later reading
- **Quick Search** - Find exactly what you're looking for
- **Dark Mode** - Easy on the eyes, day or night
- **Secure Login** - Your data is protected with JWT authentication
- **Mobile-Friendly** - Looks great on any device

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Next.js   │─────▶│   Express   │─────▶│  MongoDB    │
│  Frontend   │      │   Backend   │      │   Atlas     │
│  (Vercel)   │      │  (Render)   │      │             │
└─────────────┘      └──────┬──────┘      └─────────────┘
                            │
                     ┌──────┴──────┐
                     │   External  │
                     │     APIs    │
                     ├─────────────┤
                     │  NewsAPI    │
                     │ OpenRouter  │
                     └─────────────┘
```

## 📁 Project Structure

```
inshight-board/
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/       # App router pages
│   │   ├── components/# Reusable components
│   │   ├── lib/       # Utilities and API clients
│   │   └── styles/    # Global styles
│   └── public/        # Static assets
│
├── backend/           # Express.js API
│   ├── src/
│   │   ├── config/    # Configuration files
│   │   ├── controllers/# Route controllers
│   │   ├── middleware/# Custom middleware
│   │   ├── models/    # MongoDB models
│   │   ├── routes/    # API routes
│   │   ├── services/  # Business logic
│   │   └── utils/     # Helper functions
│   └── server.js      # Entry point
│
└── docs/              # Documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MongoDB Atlas account
- NewsAPI key
- OpenRouter API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/insightboard.git
   cd insightboard
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Add your API keys and database connection to .env
   npm run dev
   ```

3. **Setup Frontend**

   ```bash
   cd frontend
   npm install
   cp .env.local.example .env.local
   # Update with your backend API URL
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=generate_a_strong_random_secret
NEWS_API_KEY=get_from_newsapi_org
OPENROUTER_API_KEY=get_from_openrouter_ai
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=InsightBoard
```

## 📚 Documentation

Check out the `/docs` folder for detailed guides:

- **API Reference** - Complete API endpoint documentation
- **Development Guide** - Step-by-step development instructions
- **Deployment Guide** - How to deploy to production

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## � Deployment

The app is designed to deploy easily:

- **Frontend** → Vercel (recommended)
- **Backend** → Render or Railway
- **Database** → MongoDB Atlas

See `/docs/DEPLOYMENT.md` for detailed instructions.

## 🛠️ Tech Stack

**Frontend:**

- Next.js 14 (App Router)
- React 18
- TailwindCSS
- Axios
- React Query

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

**External Services:**

- NewsAPI for news aggregation
- OpenRouter for AI summaries
- MongoDB Atlas for database
- Vercel for frontend hosting
- Render for backend hosting

## 📈 Performance

- Page load time: < 3 seconds
- Responsive on all devices
- Optimized API calls
- Cached responses

## 🔒 Security

- JWT token authentication
- Password hashing with bcrypt
- Environment variable protection
- CORS configuration
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Omar Rouk

- GitHub: [@Omar Rouk](https://github.com/omarrouk)
- LinkedIn: [Omar Rouk](https://linkedin.com/in/omarrouk)

## 🙏 Acknowledgments

- NewsAPI for news data
- OpenRouter for AI capabilities
- The open-source community

---

**Built with ❤️ to demonstrate full-stack development skills**
