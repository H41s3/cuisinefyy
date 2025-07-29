# Deployment Guide

## Environment Variables Setup

### For Local Development
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Edamam API credentials:
   ```
   VITE_EDAMAM_APP_ID=your_actual_app_id
   VITE_EDAMAM_APP_KEY=your_actual_app_key
   ```

### For GitHub Pages Deployment

Since GitHub Pages is a static hosting service, environment variables need to be handled differently:

#### Option 1: Use GitHub Secrets (Recommended for Production)
1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following repository secrets:
   - `EDAMAM_APP_ID`: Your Edamam App ID
   - `EDAMAM_APP_KEY`: Your Edamam App Key

4. Create a GitHub Action workflow (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - name: Create env file
           run: |
             echo "VITE_EDAMAM_APP_ID=${{ secrets.EDAMAM_APP_ID }}" > .env
             echo "VITE_EDAMAM_APP_KEY=${{ secrets.EDAMAM_APP_KEY }}" >> .env
         - run: npm run build
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

#### Option 2: Use Demo Credentials (For Demo/Testing)
If you're just testing or demonstrating the app, you can use the demo credentials that are already in the code. However, these have limited rate limits.

## Security Notes

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Use different API keys** for development and production
3. **Monitor your API usage** to avoid hitting rate limits
4. **Consider using a backend proxy** for production apps to keep API keys server-side

## Testing Deployment

1. Test locally first:
   ```bash
   npm run dev
   ```

2. Test the production build:
   ```bash
   npm run build
   npm run preview
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Troubleshooting

- If you get "Missing Edamam API credentials" error, make sure your `.env` file exists and has the correct variable names
- If the app works locally but not on GitHub Pages, check that your environment variables are properly set in GitHub Secrets
- For API rate limit issues, consider implementing caching or using a backend service 