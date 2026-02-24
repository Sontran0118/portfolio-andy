# 🚀 Deployment Guide for sxtdev.com

## Quick Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub

```bash
# Create a new repository on GitHub: https://github.com/new
# Repository name: sxtdev-portfolio

# Then push your code:
git remote add origin https://github.com/Sontran0118/sxtdev-portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com/login
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import `Sontran0118/sxtdev-portfolio`
5. Click "Deploy" (Vercel auto-detects Next.js)
6. Wait 2-3 minutes for deployment

**Result**: Your site will be live at `https://sxtdev-portfolio.vercel.app`

### Step 3: Connect Custom Domain (sxtdev.com)

1. In Vercel Dashboard → Project Settings → Domains
2. Click "Add Domain"
3. Enter: `sxtdev.com`
4. Vercel will provide DNS records

**Update your domain DNS (at your domain registrar):**

| Type  | Name | Value              | TTL  |
|-------|------|--------------------|------|
| A     | @    | 76.76.21.21        | Auto |
| CNAME | www  | cname.vercel-dns.com | Auto |

5. Wait for DNS propagation (usually 10-30 minutes)
6. Visit https://sxtdev.com ✅

---

## Alternative: Vercel CLI Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd sxtdev-portfolio
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Link to existing project? No
# - Project name: sxtdev-portfolio
# - Directory: ./
# - Override settings? No

# For production:
vercel --prod
```

---

## Verify Deployment

After deployment, check:
- ✅ Site loads at your URL
- ✅ GitHub projects display correctly
- ✅ All links work (LinkedIn, GitHub)
- ✅ Mobile responsive design
- ✅ Fast loading (< 2 seconds)

---

## Troubleshooting

**GitHub API Rate Limit (60/hour)**
- Solution: Add `GITHUB_TOKEN` environment variable in Vercel
- Get token: https://github.com/settings/tokens
- Add in Vercel: Settings → Environment Variables

**DNS Not Propagating**
- Wait 24-48 hours (usually faster)
- Check: https://dnschecker.org

**Build Errors**
- Check Vercel logs: Project → Deployments → Latest → Logs
- Ensure Node.js version 18+ in Vercel settings

---

## Post-Deployment

- Share your portfolio: https://sxtdev.com
- Update LinkedIn with portfolio link
- Add portfolio link to GitHub profile
- Share on social media

**Congrats! Your portfolio is live! 🎉**
