# InsightBoard Development Guide

## Phase-by-Phase Implementation

This document outlines the complete development process for InsightBoard, broken down into manageable phases.

---

## 📋 **PHASE 1: Project Setup & Structure** ✅

### What We've Done:

1. ✅ Created project structure with separate frontend and backend
2. ✅ Configured package.json files for both environments
3. ✅ Set up environment variable templates
4. ✅ Created comprehensive README documentation
5. ✅ Configured Git ignore patterns
6. ✅ Added MIT license

### What You Need To Do:

#### 1. Initialize Git Repository

```powershell
cd c:\Users\OMEN\Desktop\inshight-board
git init
git add .
git commit -m "Initial commit: Project structure and configuration"
```

#### 2. Install Backend Dependencies

```powershell
cd backend
npm install
```

#### 3. Install Frontend Dependencies

```powershell
cd ..\frontend
npm install
```

#### 4. Set Up Environment Variables

**Backend (.env):**

```powershell
cd ..\backend
cp .env.example .env
```

Then edit `backend\.env` and add:

```
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<any_random_string>
NEWS_API_KEY=<your_newsapi_key>
OPENROUTER_API_KEY=<your_openrouter_key>
```

**Frontend (.env.local):**

```powershell
cd ..\frontend
cp .env.local.example .env.local
```

Default values should work for local development.

#### 5. Get API Keys

**NewsAPI (Free):**

1. Go to https://newsapi.org
2. Click "Get API Key"
3. Register for free account
4. Copy API key to backend `.env`

**OpenRouter (Free tier available):**

1. Go to https://openrouter.ai
2. Sign up for account
3. Get API key
4. Copy to backend `.env`

**MongoDB Atlas (Free):**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (M0 Free tier)
4. Create database user
5. Whitelist IP: 0.0.0.0/0 (allow all - for development)
6. Get connection string
7. Replace `<password>` in connection string
8. Add to backend `.env`

### Verification:

```powershell
# Check if all dependencies are installed
cd backend
npm list --depth=0

cd ..\frontend
npm list --depth=0
```

---

## 🔧 **PHASE 2: Backend Development** ✅

### What We've Built:

#### ✅ Backend Architecture

- Express.js server with security middleware (Helmet, CORS, Rate Limiting)
- MongoDB connection with Mongoose
- JWT authentication system
- Error handling middleware
- Input validation middleware

#### ✅ Database Models

1. **User Model** (`backend/src/models/User.model.js`)
   - Authentication fields (email, password)
   - User preferences (categories, theme, language)
   - Favorites array
   - Password hashing with bcrypt

2. **Article Model** (`backend/src/models/Article.model.js`)
   - Article metadata
   - AI-generated summaries
   - View and save counts
   - Category classification

#### ✅ Services

1. **NewsAPI Service** (`backend/src/services/newsapi.service.js`)
   - Fetch top headlines
   - Search articles
   - Filter by category
   - Article formatting

2. **OpenRouter Service** (`backend/src/services/openrouter.service.js`)
   - AI summary generation
   - Batch processing
   - Fallback summaries
   - Rate limit handling

#### ✅ API Controllers

1. **Auth Controller** - Register, login, get user, update password
2. **News Controller** - Get news, search, filter by category, generate summaries
3. **User Controller** - Manage favorites, preferences, profile

#### ✅ API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/news/*` - News endpoints
- `/api/user/*` - User management endpoints

### What You Need To Do:

#### Test Backend Locally

1. **Start MongoDB** (if using local instance)
   - Or ensure MongoDB Atlas is accessible

2. **Start Backend Server**

```powershell
cd backend
npm run dev
```

You should see:

```
✅ Connected to MongoDB Atlas
🚀 Server running on port 5000
📍 Environment: development
🔗 API: http://localhost:5000
```

3. **Test Health Endpoint**

Open browser or use PowerShell:

```powershell
# Using PowerShell
Invoke-WebRequest -Uri http://localhost:5000/health | Select-Object Content
```

Expected response:

```json
{
  "status": "success",
  "message": "InsightBoard API is running",
  "timestamp": "2025-10-31T...",
  "environment": "development"
}
```

4. **Test Registration** (Optional - using PowerShell)

```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "Test123456"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:5000/api/auth/register `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### Common Issues & Solutions:

**Issue: MongoDB connection fails**

- Solution: Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Solution: Verify connection string has correct password
- Solution: Ensure network allows connections

**Issue: Port 5000 already in use**

- Solution: Change PORT in `.env` to 5001 or another available port

**Issue: NewsAPI returns 401**

- Solution: Verify API key is correct in `.env`
- Solution: Check if key is active at newsapi.org

---

## 🎨 **PHASE 3: Frontend Development** ✅

### What We've Built:

#### ✅ Next.js Configuration

- App Router structure
- TailwindCSS styling
- Dark mode support
- React Query for data fetching
- Zustand for state management

#### ✅ Core Infrastructure

1. **API Client** (`src/lib/api.js`)
   - Axios instance with interceptors
   - Automatic token injection
   - Error handling
   - API methods for all endpoints

2. **State Management** (`src/lib/store.js`)
   - Authentication store (user, token)
   - Theme store (light/dark)
   - News store (categories, favorites)

3. **Utilities** (`src/lib/utils.js`)
   - Date formatting
   - Text truncation
   - Category colors
   - Validation helpers

#### ✅ Layout & Styling

- Global styles with TailwindCSS
- Responsive design utilities
- Dark mode classes
- Custom components (buttons, inputs, cards)

#### ✅ Landing Page

- Hero section
- Feature highlights
- Category preview
- Call-to-action buttons

### What You Need To Do:

#### 1. Start Frontend Development Server

```powershell
cd frontend
npm run dev
```

Visit http://localhost:3000

You should see the InsightBoard landing page.

#### 2. Create Remaining Pages

We need to create:

- Login page (`/auth/login`)
- Register page (`/auth/register`)
- Dashboard page (`/dashboard`)
- Profile page (`/profile`)
- Settings page (`/settings`)

Let me know when you're ready, and I'll create these pages!

---

## 🔗 **PHASE 4: Integration & Testing**

### What Needs To Be Done:

1. **Create Frontend Components**
   - Navigation header
   - News card component
   - Category filter
   - Search bar
   - Article detail modal
   - Loading skeletons

2. **Implement Authentication Pages**
   - Login form with validation
   - Register form with validation
   - Protected route wrapper
   - Auth redirect logic

3. **Build Dashboard**
   - News feed display
   - Category filtering
   - Search functionality
   - Infinite scroll or pagination
   - Favorites toggle

4. **Create User Pages**
   - Profile management
   - Preferences settings
   - Saved articles view
   - Theme toggle

5. **Testing**
   - Test all API endpoints
   - Test authentication flow
   - Test news fetching and display
   - Test favorites and preferences
   - Test responsive design
   - Test dark mode

---

## 🚀 **PHASE 5: Deployment**

### Backend Deployment (Render)

1. **Push to GitHub**

   ```powershell
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to https://render.com
   - Create new Web Service
   - Connect GitHub repository
   - Set root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables
   - Deploy

3. **Configure Environment Variables on Render**
   - Add all variables from `.env`
   - Set `NODE_ENV=production`
   - Update `CORS_ORIGIN` to your Vercel URL

### Frontend Deployment (Vercel)

1. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import GitHub repository
   - Set root directory: `frontend`
   - Add environment variable: `NEXT_PUBLIC_API_URL=<your-render-backend-url>/api`
   - Deploy

2. **Update Backend CORS**
   - Update Render environment variable
   - Set `CORS_ORIGIN` to Vercel deployment URL

### Database (MongoDB Atlas)

Already configured in Phase 1!

---

## 📊 Progress Tracking

- [x] Phase 1: Project Setup (COMPLETE)
- [x] Phase 2: Backend Development (COMPLETE)
- [x] Phase 3: Frontend Infrastructure (COMPLETE)
- [ ] Phase 4: Frontend Pages & Components (IN PROGRESS)
- [ ] Phase 5: Integration & Testing
- [ ] Phase 6: Deployment

---

## 🎯 Next Steps

**YOU ARE HERE:** Ready to create frontend pages and components!

Would you like me to:

1. Create all the remaining frontend pages (Login, Register, Dashboard, etc.)?
2. Build the reusable components (NewsCard, Header, etc.)?
3. Set up the complete application flow?

Let me know and I'll continue building! 🚀
