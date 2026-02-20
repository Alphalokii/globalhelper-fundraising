---
description: Deploy GlobalHelper Fundraising Platform to Netlify
---

# Deploy GlobalHelper to Netlify

## Overview
This workflow helps you deploy the GlobalHelper fundraising platform to Netlify for live hosting.

## Prerequisites
- Build folder must be created (`npm run build`)
- Netlify account (free)

## Steps

### 1. Build the Application
```bash
npm run build
```

### 2. Deploy to Netlify
1. Go to https://netlify.com
2. Click "Drag and drop your site files here"
3. Navigate to the `build` folder
4. Select the entire `build` folder
5. Drop it on Netlify
6. Wait 30 seconds for deployment
7. Get your live URL

### 3. Custom Domain (Optional)
1. In Netlify dashboard, go to Site settings
2. Click "Domain management"
3. Add your custom domain
4. Update DNS settings

## Features Deployed
- ✅ Bitcoin & USDT crypto payments
- ✅ Real campaign images
- ✅ Emotional galleries
- ✅ Responsive design
- ✅ Maintenance mode for Stripe/PayPal
- ✅ Complete donation workflow

## Live URL
After deployment, your platform will be available at:
`https://your-name-123456.netlify.app`

## Next Steps
- Test all crypto payment features
- Verify images load correctly
- Test mobile responsiveness
- Set up custom domain
- Monitor analytics
