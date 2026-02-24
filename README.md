# Andy Tran Portfolio - sxtdev.com

A modern, responsive portfolio website showcasing Andy Tran's software engineering projects and skills.

## 🚀 Features

- **Dark Mode Design**: Professional dark theme with smooth animations
- **GitHub Integration**: Dynamically fetches and displays projects from GitHub API
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Built with Next.js 14 App Router for optimal performance
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)
- **API**: GitHub REST API v3

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Method 2: GitHub + Vercel Dashboard

1. Push this repository to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Andy Tran portfolio"
git branch -M main
git remote add origin https://github.com/Sontran0118/sxtdev-portfolio.git
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

### Method 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sontran0118/sxtdev-portfolio)

## 🔧 Custom Domain Setup (sxtdev.com)

1. In Vercel Dashboard, go to your project
2. Navigate to "Settings" → "Domains"
3. Add `sxtdev.com` and `www.sxtdev.com`
4. Update your domain DNS settings:

   **For Apex Domain (sxtdev.com):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`

   **For WWW Subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

5. Wait for DNS propagation (up to 48 hours, usually faster)

## 📝 Environment Variables

No environment variables required! GitHub API is used without authentication (rate limit: 60 requests/hour).

For higher rate limits, optionally add to `.env.local`:
```
GITHUB_TOKEN=your_github_personal_access_token
```

Then update `components/GitHubProjects.tsx` to use the token in headers.

## 🎨 Customization

- **Colors**: Edit `tailwind.config.ts`
- **Content**: Update components in `/components`
- **Projects**: Featured projects are prioritized in `GitHubProjects.tsx`
- **Contact**: Update links in `Contact.tsx`

## 📄 License

MIT © Andy Tran

## 🤝 Contact

- **LinkedIn**: [linkedin.com/in/sontran0118](https://www.linkedin.com/in/sontran0118/)
- **GitHub**: [github.com/Sontran0118](https://github.com/Sontran0118)
