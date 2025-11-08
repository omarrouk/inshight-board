# Quick Start Guide

Get InsightBoard up and running on your local machine in under 10 minutes!

---

## What You'll Need

- ✅ Node.js 18 or higher
- ✅ npm (comes with Node.js)
- ✅ A code editor (VS Code is great)
- ✅ About 10 minutes of your time

---

## 🚀 Let's Get Started

### Step 1: Install Dependencies (2 minutes)

Open your terminal in the project folder:

```bash
# Install backend packages
cd backend
npm install

# Install frontend packages
cd ../frontend
npm install
```

### Step 2: Get Your API Keys (5 minutes)

You'll need three free API keys. Don't worry - they're all quick to get!

#### MongoDB Atlas (Your Database)

1. Head over to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster - choose the **FREE M0 tier**
4. Create a database user (pick a username and password - save these!)
5. Under Network Access, click "Add IP" and choose "Allow from Anywhere"
6. Click "Connect" → "Connect your application"
7. Copy the connection string
8. Replace `<password>` in the connection string with your actual password

#### NewsAPI (News Content)

1. Visit https://newsapi.org
2. Click "Get API Key"
3. Sign up - it's free for development
4. Copy your API key

#### OpenRouter (AI Summaries)

1. Go to https://openrouter.ai
2. Sign up (you can use Google or GitHub)
3. Grab your free API key from the dashboard

### Step 3: Configure Your Environment (2 minutes)

**For the Backend:**

```bash
cd backend
cp .env.example .env
```

Now open the `.env` file and fill in your credentials:

```env
PORT=5000
NODE_ENV=development

# Paste your MongoDB connection string
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/insightboard

# Create a random secret (can be anything random and secure)
JWT_SECRET=your-super-secret-random-string-here
JWT_EXPIRE=7d

# Add your NewsAPI key
NEWS_API_KEY=your_newsapi_key_here

# Add your OpenRouter key
OPENROUTER_API_KEY=your_openrouter_key_here

CORS_ORIGIN=http://localhost:3000
```

**For the Frontend:**

```bash
cd ../frontend
cp .env.local.example .env.local
```

The default values should work fine for local development!

### Step 4: Fire It Up!

Open two terminal windows:

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Wait until you see:

```
✅ Connected to MongoDB Atlas
🚀 Server running on port 5000
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Wait for:

```
✓ Ready in 3s
○ Local: http://localhost:3000
```

### Step 5: Check It Out!

Open your browser and go to:

- **Main App:** http://localhost:3000
- **API Health Check:** http://localhost:5000/health

---

## ✅ Quick Checklist

Make sure everything's working:

- [ ] Backend says "Connected to MongoDB Atlas"
- [ ] Backend health check shows JSON response
- [ ] Frontend loads the landing page
- [ ] No red error messages anywhere

---

## 🎯 What's Next?

### Try Out the Features

1. Register a new account
2. Browse the news feed
3. Save some articles to favorites
4. Try the category filters
5. Search for something interesting

### Keep Developing

Check out `docs/DEVELOPMENT_GUIDE.md` for more detailed instructions on building out the rest of the features!

---

## 🐛 Running Into Issues?

### "Can't connect to MongoDB"

**Try this:**

1. Double-check your connection string in `.env`
2. Make sure you replaced `<password>` with your actual password
3. Verify that "0.0.0.0/0" is in your MongoDB Atlas IP whitelist
4. Check if your cluster is actually running in MongoDB Atlas

### "Port 5000 is already in use"

**Solution:**
Change the `PORT` in `backend/.env` to something else like 5001. Just remember to also update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` to match!

**Error: "NewsAPI 401 Unauthorized"**

```
Solution:
1. Verify NEWS_API_KEY in .env is correct
2. Check key is active at newsapi.org
3. Free tier has 100 requests/day limit
```

### Frontend won't start

**Error: "Module not found"**

```
Solution:
cd frontend
npm install
```

**Error: "Cannot connect to API"**

```
Solution:
1. Ensure backend is running on port 5000
2. Check NEXT_PUBLIC_API_URL in .env.local
3. Verify CORS_ORIGIN in backend .env matches frontend URL
```

### Other Issues

**Slow API responses:**

- First request to NewsAPI can be slow
- OpenRouter AI summaries take 2-5 seconds
- This is normal for free tiers

**No news showing:**

- Check NewsAPI key has available requests
- Try different category
- Check browser console for errors

---

## 📚 Useful Commands

### Backend

```powershell
# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test
```

### Frontend

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Both (from root directory)

```powershell
# Install all dependencies
npm run install:all

# Run both servers (requires concurrently)
npm run dev
```

---

## 🎓 Learn More

- **Development Guide:** docs/DEVELOPMENT_GUIDE.md
- **API Reference:** docs/API_REFERENCE.md
- **Deployment Guide:** docs/DEPLOYMENT.md
- **Project Status:** PROJECT_STATUS.md

---

## 🆘 Need Help?

1. Check error messages carefully
2. Read the relevant documentation file
3. Verify all environment variables
4. Check API keys are valid
5. Ensure all dependencies are installed

Common fixes solve 90% of issues:

- Reinstall dependencies: `npm install`
- Restart servers
- Clear browser cache
- Check .env files

---

## 🎉 Success!

If you can:

- ✅ See the landing page at localhost:3000
- ✅ Get JSON from localhost:5000/health
- ✅ No error messages

**You're ready to build! 🚀**

Start with **docs/DEVELOPMENT_GUIDE.md** to continue development.

---

**Happy coding! 💻**
