# InsightBoard Backend

The Express.js API server that powers InsightBoard - handling authentication, news aggregation, and AI-powered summaries.

## What's Inside

- **JWT Authentication** - Secure user login and registration
- **News Aggregation** - Fresh content from NewsAPI
- **AI Summaries** - Smart article summaries via OpenRouter
- **User Features** - Favorites, preferences, and profiles
- **MongoDB Storage** - All your data safely stored
- **Security** - Rate limiting, CORS, and input validation

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env
```

Then edit `.env` with your credentials (see the main README for where to get API keys)

### 3. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Log in
- `GET /api/auth/me` - Get current user info (requires auth)
- `PUT /api/auth/password` - Change password (requires auth)

### News

- `GET /api/news` - Get latest news
- `GET /api/news/search?q=query` - Search for articles
- `GET /api/news/categories/:category` - Filter by category
- `POST /api/news/summary` - Generate an AI summary

### User Management

- `GET /api/user/favorites` - Your saved articles (requires auth)
- `POST /api/user/favorites` - Save an article (requires auth)
- `DELETE /api/user/favorites/:id` - Remove from favorites (requires auth)
- `PUT /api/user/preferences` - Update your preferences (requires auth)
- `GET /api/user/profile` - View your profile (requires auth)
- `PUT /api/user/profile` - Edit your profile (requires auth)

## Environment Variables

Check `.env.example` to see all the configuration options you need to set up.

## Tech Stack

- Express.js - Fast, unopinionated web framework
- MongoDB + Mongoose - Database and ORM
- JWT - Secure authentication tokens
- Bcrypt - Password hashing
- Axios - HTTP client for external APIs
- Express Validator - Input validation

Need more details? Check out the full API documentation in `/docs/API_REFERENCE.md`!
