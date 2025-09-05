# SIC Life Group Business Quote Generator

A professional web application for generating group insurance quotations for SIC Life Insurance Ltd.

## Features

- **Multi-step Quotation Process**: Streamlined 5-step process for creating insurance quotations
- **Mobile-Responsive Design**: Optimized for both desktop and mobile devices
- **Professional Branding**: SIC Life corporate identity and color scheme
- **Interactive Forms**: User-friendly input fields and validation
- **Real-time Calculations**: Automatic premium calculations based on member details
- **Print/Export**: Generate and print professional quotation documents

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Vercel

## Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - Project name: `sic-life-quotation` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings? `N`

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - Configure build settings:
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Deploy**: Click "Deploy"

## Environment Variables

No environment variables are required for basic functionality. The app uses CDN-hosted React libraries.

## Project Structure

```
├── components/
│   ├── common/          # Reusable UI components
│   ├── steps/           # Step-specific components
│   ├── Header.tsx       # Main navigation header
│   ├── StepIndicator.tsx # Progress indicator
│   └── QuotationView.tsx # Quotation display
├── types.ts            # TypeScript type definitions
├── constants.ts        # App constants and configuration
├── App.tsx            # Main application component
├── index.tsx          # Application entry point
├── vite.config.ts     # Vite configuration
└── vercel.json        # Vercel deployment configuration
```

## Customization

- **Colors**: Update colors in `index.html` Tailwind config
- **Logo**: Replace `/public/sic-life-logo.png` with your logo
- **Content**: Modify text and labels in component files
- **Styling**: Update Tailwind classes for different appearance

## Support

For technical support or questions about this application, please contact the development team.

---

**SIC Life Insurance Ltd.**  
*Absolute peace of mind*