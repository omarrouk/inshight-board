# Deployment Guide

Ready to share your InsightBoard with the world? This guide will walk you through deploying to production using free hosting services.

---

## Before You Start

Make sure you have accounts on:

- GitHub (for hosting your code)
- MongoDB Atlas (for your database - already set up!)
- Vercel (for the frontend - super easy)
- Render (for the backend - free tier available)

---

## Step 1: Get Your Code on GitHub

If you haven't already, let's get your project on GitHub:

```bash
# Initialize git if you haven't
cd c:\Users\OMEN\Desktop\inshight-board
git init
git add .
git commit -m "Ready for deployment!"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/insightboard.git
git branch -M main
git push -u origin main
```

---

## Step 2: Your Database is Ready!

Good news - if you completed the setup, your MongoDB Atlas database is already good to go!

**Quick check:**

1. Log into https://cloud.mongodb.com
2. Make sure your cluster is running
3. Verify you have a database user set up
4. Confirm your connection string is handy

**Security tip for production:**  
Once you deploy to Render, you might want to update your IP whitelist to include only Render's IP addresses instead of allowing all IPs (0.0.0.0/0).

---

## Step 3: Deploy the Backend (Render)

### Setting Up on Render

1. Go to https://render.com and create a free account
2. Click the **"New +"** button and select **"Web Service"**
3. Connect your GitHub account
4. Find and select your `insightboard` repository

### Configuration Settings

Fill these out:

- **Name:** Something like `insightboard-api` (or whatever you prefer)
- **Region:** Choose the one closest to most of your users
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free (perfect for getting started!)

### Environment Variables

Click on **"Advanced"** and add these environment variables:

| Variable             | What to Put                                                           |
| -------------------- | --------------------------------------------------------------------- |
| `NODE_ENV`           | `production`                                                          |
| `PORT`               | `5000`                                                                |
| `MONGODB_URI`        | Your MongoDB Atlas connection string                                  |
| `JWT_SECRET`         | A strong random string (use a password generator!)                    |
| `JWT_EXPIRE`         | `7d`                                                                  |
| `NEWS_API_KEY`       | Your NewsAPI key                                                      |
| `OPENROUTER_API_KEY` | Your OpenRouter key                                                   |
| `CORS_ORIGIN`        | Leave as `*` for now (we'll update this after deploying the frontend) |

### Deploy!

Hit that **"Create Web Service"** button and grab a coffee ☕ - this usually takes 5-10 minutes.

Once it's done, you'll get a URL like: `https://insightboard-api.onrender.com`

**Test it out:** Visit `https://your-url.onrender.com/health` and you should see a JSON response!

---

## Step 4: Deploy the Frontend (Vercel)

### Getting Started with Vercel

1. Head to https://vercel.com
2. Sign up using your GitHub account (makes things super easy)
3. Click **"Add New..."** then **"Project"**
4. Import your `insightboard` repository

### Configuration

Vercel is pretty smart and will detect most settings automatically:

- **Framework:** Next.js ✓ (auto-detected)
- **Root Directory:** `frontend`
- **Build Command:** `npm run build` ✓
- **Output Directory:** `.next` ✓

### Add Your Environment Variable

Click on **"Environment Variables"** and add:

| Name                   | Value                                      |
| ---------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_API_URL`  | `https://your-render-url.onrender.com/api` |
| `NEXT_PUBLIC_APP_NAME` | `InsightBoard`                             |

(Replace `your-render-url` with the actual URL from Render!)

### Deploy Time!

Click **"Deploy"** and wait 2-5 minutes. Vercel will give you a URL like: `https://insightboard.vercel.app`

### One More Thing - Update CORS

Now that you have your Vercel URL, go back to:

1. Render dashboard
2. Find your backend service
3. Go to **"Environment"**
4. Update `CORS_ORIGIN` to your Vercel URL (e.g., `https://insightboard.vercel.app`)
5. The service will automatically redeploy

---

## Step 5: Configure Custom Domain (Optional)

### For Vercel (Frontend)

1. Go to your project → **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate (automatic)

### For Render (Backend)

1. Upgrade to paid plan (required for custom domains)
2. Add custom domain in settings
3. Configure DNS records

---

## Step 6: Post-Deployment Testing

### 6.1 Test Complete Flow

1. **Visit your Vercel URL**

   - Landing page loads ✓
   - Navigation works ✓

2. **Test Registration**

   - Create new account ✓
   - Receive confirmation ✓

3. **Test Login**

   - Login with credentials ✓
   - Redirected to dashboard ✓

4. **Test News Features**

   - News loads ✓
   - Categories filter works ✓
   - Search functions ✓
   - AI summaries generate ✓

5. **Test User Features**
   - Save favorites ✓
   - Update preferences ✓
   - Change theme ✓
   - Profile updates ✓

### 6.2 Performance Testing

Use tools:

- **Lighthouse** (Chrome DevTools)
- **GTmetrix** (https://gtmetrix.com)
- **WebPageTest** (https://webpagetest.org)

Target metrics:

- Load time < 3 seconds ✓
- Performance score > 85 ✓
- Accessibility score > 90 ✓

---

## Step 7: Monitoring & Maintenance

### 7.1 Set Up Monitoring

**Render:**

- Check "Metrics" tab regularly
- Set up email alerts for failures
- Monitor response times

**Vercel:**

- Use Analytics (built-in)
- Check deployment logs
- Monitor error rates

### 7.2 Regular Updates

```powershell
# Update dependencies monthly
cd backend
npm update

cd ..\frontend
npm update

# Test locally, then deploy
git add .
git commit -m "Update dependencies"
git push
```

### 7.3 Backup Database

MongoDB Atlas automatic backups (check settings).

---

## Deployment Checklist

- [ ] Code tested locally
- [ ] All environment variables documented
- [ ] GitHub repository created and pushed
- [ ] MongoDB Atlas configured
- [ ] Backend deployed on Render
- [ ] Backend health check passes
- [ ] Frontend deployed on Vercel
- [ ] CORS updated with Vercel URL
- [ ] Complete user flow tested
- [ ] Performance metrics acceptable
- [ ] Monitoring configured
- [ ] Documentation updated

---

## Troubleshooting

### Backend Issues

**Issue:** "Cannot connect to MongoDB"

- Solution: Check MongoDB Atlas IP whitelist
- Solution: Verify connection string is correct
- Solution: Ensure database user has correct permissions

**Issue:** "CORS error"

- Solution: Update `CORS_ORIGIN` environment variable
- Solution: Ensure no trailing slash in URL

**Issue:** "NewsAPI 401 error"

- Solution: Verify API key is correct
- Solution: Check if API key is active

### Frontend Issues

**Issue:** "API requests fail"

- Solution: Check `NEXT_PUBLIC_API_URL` is correct
- Solution: Ensure backend is running
- Solution: Check browser console for CORS errors

**Issue:** "Build fails on Vercel"

- Solution: Check build logs
- Solution: Ensure all dependencies are in `package.json`
- Solution: Fix any TypeScript/ESLint errors

### Free Tier Limitations

**Render Free Tier:**

- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Limited to 750 hours/month

**Solution:** Upgrade to paid tier or use a keep-alive service.

**Vercel Free Tier:**

- Generous limits for personal projects
- 100GB bandwidth/month
- Unlimited deployments

**MongoDB Atlas Free Tier:**

- 512MB storage
- Shared CPU
- Good for starting out

---

## Production URLs

After deployment, update these in your README:

- **Frontend:** `https://insightboard.vercel.app`
- **Backend API:** `https://insightboard-api.onrender.com`
- **API Health:** `https://insightboard-api.onrender.com/health`

---

## Support & Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com
- **Next.js Docs:** https://nextjs.org/docs
- **Express Docs:** https://expressjs.com

---

**Congratulations! Your InsightBoard is now live! 🎉**
