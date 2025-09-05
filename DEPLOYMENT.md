# 🚀 Vercel Deployment Guide

## Quick Start

### Method 1: One-Click Deploy (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Run the deployment script**:
   - **Windows**: Double-click `deploy.bat` or run `deploy.bat` in Command Prompt
   - **Mac/Linux**: Run `./deploy.sh` in Terminal

3. **Follow the prompts**:
   - Login to Vercel (if not already logged in)
   - Choose your account/team
   - Set project name (e.g., `sic-life-quotation`)
   - Confirm deployment settings

### Method 2: Manual Deployment

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Method 3: GitHub Integration

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Deploy automatically

## Configuration Files

The following files have been created for Vercel deployment:

- `vercel.json` - Vercel configuration
- `.vercelignore` - Files to ignore during deployment
- `deploy.sh` - Linux/Mac deployment script
- `deploy.bat` - Windows deployment script

## Build Settings

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x (default)

## Post-Deployment

After successful deployment:

1. **Test the application** at the provided URL
2. **Update domain** (optional) in Vercel dashboard
3. **Set up custom domain** (optional) for production use
4. **Configure environment variables** (if needed)

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in `package.json`
2. **404 errors**: Ensure `vercel.json` rewrite rules are correct
3. **Logo not showing**: Verify logo file is in `public/` folder
4. **Styling issues**: Check Tailwind CSS is properly configured

### Debug Commands:

```bash
# Check Vercel CLI version
vercel --version

# Check login status
vercel whoami

# View deployment logs
vercel logs

# Test build locally
npm run build
npm run preview
```

## Environment Variables

Currently, no environment variables are required. The app uses:
- CDN-hosted React libraries
- Tailwind CSS via CDN
- Static assets from public folder

## Performance Optimization

The app is optimized for Vercel with:
- Static asset caching
- Gzip compression
- CDN distribution
- Mobile-responsive design

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs in Vercel dashboard
3. Test locally with `npm run preview`

---

**Ready to deploy?** Run `deploy.bat` (Windows) or `./deploy.sh` (Mac/Linux)!
