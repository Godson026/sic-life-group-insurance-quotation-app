# 🚀 GitHub + Vercel Deployment Guide

## Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click "New Repository"** (green button or + icon)
3. **Repository Settings**:
   - **Name**: `sic-life-group-insurance-quotation-app`
   - **Description**: `SIC Life Group Business Quote Generator - Professional Insurance Solutions`
   - **Visibility**: Public (recommended) or Private
   - **Initialize**: ❌ Don't check "Add a README file" (we already have one)
   - **Initialize**: ❌ Don't check "Add .gitignore" (we already have one)
   - **Initialize**: ❌ Don't check "Choose a license"

4. **Click "Create Repository"**

## Step 2: Push to GitHub

Run these commands in your project directory:

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sic-life-group-insurance-quotation-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Alternative: If you already created the repo with files, use:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/sic-life-group-insurance-quotation-app.git
git branch -M main
git push -u origin main --force
```

## Step 3: Deploy to Vercel from GitHub

### Method A: Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Import Git Repository**:
   - Find your `sic-life-group-insurance-quotation-app` repository
   - Click "Import"
5. **Configure Project**:
   - **Project Name**: `sic-life-quotation` (or your preferred name)
   - **Framework Preset**: `Vite` (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should auto-fill)
   - **Output Directory**: `dist` (should auto-fill)
   - **Install Command**: `npm install` (should auto-fill)
6. **Click "Deploy"**

### Method B: Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from GitHub repository
vercel --prod
```

## Step 4: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## Step 5: Set Up Auto-Deployment

Your app will automatically deploy when you push changes to the main branch:

```bash
# Make changes to your code
git add .
git commit -m "Update feature X"
git push origin main
# Vercel will automatically build and deploy!
```

## Repository Structure

Your GitHub repository now contains:

```
sic-life-group-insurance-quotation-app/
├── 📁 components/          # React components
├── 📁 public/             # Static assets (logo, etc.)
├── 📄 package.json        # Dependencies and scripts
├── 📄 vercel.json         # Vercel configuration
├── 📄 README.md           # Project documentation
├── 📄 DEPLOYMENT.md       # Deployment instructions
└── 📄 .gitignore          # Git ignore rules
```

## Environment Variables

No environment variables are needed for this project. The app uses:
- CDN-hosted React libraries
- Tailwind CSS via CDN
- Static assets from the public folder

## Troubleshooting

### Common Issues:

1. **Build fails on Vercel**:
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version (Vercel uses 18.x by default)

2. **Logo not showing**:
   - Ensure `sic-life-logo.png` is in the `public/` folder
   - Check file path in `SicLifeLogo.tsx`

3. **Styling issues**:
   - Verify Tailwind CSS is loading from CDN
   - Check `index.html` for Tailwind script tag

### Debug Commands:

```bash
# Test build locally
npm run build
npm run preview

# Check Git status
git status

# View recent commits
git log --oneline

# Check remote repository
git remote -v
```

## Next Steps After Deployment

1. **Test your live app** at the Vercel URL
2. **Share the URL** with stakeholders
3. **Set up monitoring** (optional) in Vercel dashboard
4. **Configure custom domain** (optional)
5. **Set up branch deployments** for testing (optional)

## Benefits of GitHub + Vercel

✅ **Automatic deployments** on every push  
✅ **Version control** with Git  
✅ **Collaboration** with team members  
✅ **Rollback capability** to previous versions  
✅ **Preview deployments** for pull requests  
✅ **Free hosting** on Vercel  
✅ **Global CDN** for fast loading  

---

**Ready to deploy?** Follow the steps above and your app will be live in minutes! 🚀
