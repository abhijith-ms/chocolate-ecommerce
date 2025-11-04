# Deployment Steps

## 1. Push to GitHub

After creating a new repository on GitHub, run these commands:

```bash
# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` and `REPOSITORY_NAME` with your actual GitHub username and repository name.

## 2. Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project root:
```bash
vercel
```

4. Follow the prompts:
   - Link to existing project? **N**
   - Project name: **chocolate-ecommerce** (or your preferred name)
   - Directory: **.** (current directory)
   - Override settings? **N**

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click "Deploy"

## 3. Custom Domain (Optional)

After deployment, you can add a custom domain in Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 4. Environment Variables (If needed)

If you need to add environment variables:
1. Go to Vercel project settings
2. Click "Environment Variables"
3. Add variables like:
   - `VITE_WHATSAPP_NUMBER=919895905758`
   - Any other configuration variables

## 5. Automatic Deployments

Once connected to GitHub, Vercel will automatically deploy:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

Your website will be live at: `https://your-project-name.vercel.app`