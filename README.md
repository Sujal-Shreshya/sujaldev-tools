# SujalDev Tools (`https://sujaldev.shop`)

> **"Everything You Need. One Simple Toolkit."**
> A modern, premium, privacy-first SaaS platform providing free online utilities to convert files, optimize images, manage PDFs, and simplify everyday digital workflows.

---

## 🌟 Highlights

- **100% Client-Side Privacy**: All processing runs locally inside the user's browser using HTML5 Canvas, WebAssembly, and `pdf-lib`. No files, photos, documents, or tokens are ever uploaded to remote servers.
- **10 Functional Tools**:
  - **PDF Tools**: Image to PDF, Merge PDF, Split PDF, Compress & Optimize PDF.
  - **Image Tools**: Image Compressor, Image Resizer, JPG to PNG, PNG to JPG.
  - **Developer Tools**: JSON Formatter & Validator, Base64 Encoder / Decoder.
- **Premium SaaS UI**: Styled with Royal Blue (`#2563eb`) and Violet accents (`#7c3aed`), Inter font, responsive layout, dark/light mode toggle with system preference persistence.
- **SEO & AdSense Ready**: Dynamic metadata (titles, descriptions, canonical links, OpenGraph, JSON-LD Schema), breadcrumbs, comprehensive instructions, and CLS-safe `AdSlot` component reservations.
- **Cloudflare Pages Optimized**: Built with SPA routing redirects (`_redirects`), gzip-optimized chunking, and sitemap/robots.txt.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom Royal/Violet palette
- **Icons**: Lucide React
- **Document Processing**: `pdf-lib` + `jszip`
- **Graphics & Compression**: HTML5 Canvas API + Web Worker ready
- **Routing**: React Router DOM (v6)
- **Metadata / SEO**: `react-helmet-async`
- **Hosting Target**: Cloudflare Pages

---

## 📂 Project Structure

```
sujaldev-tools/
├── public/
│   ├── _redirects         # Cloudflare Pages SPA rewrite (/* /index.html 200)
│   ├── favicon.svg        # Scalable SVG brand logo
│   ├── robots.txt         # Search engine crawl rules
│   └── sitemap.xml        # Complete sitemap with all routes
├── src/
│   ├── components/
│   │   ├── ads/           # AdSlot.tsx (AdSense CLS-safe placeholder container)
│   │   ├── common/        # SEO, Breadcrumbs, Button, Card, FileUploader, ScrollToTop
│   │   ├── layout/        # Navbar, Footer, Layout
│   │   └── tools/         # ToolPageTemplate (SEO text, How-To, FAQs, Related tools)
│   ├── config/
│   │   ├── ads.ts         # Google AdSense configuration
│   │   └── tools.ts       # Central catalog of all 10 tools & categories
│   ├── context/
│   │   └── ThemeContext.tsx # Light/Dark mode state with localStorage sync
│   ├── pages/
│   │   ├── Home/          # Hero, live search, categories, popular tools, FAQs
│   │   ├── PDFTools/      # Hub + 4 individual tool pages
│   │   ├── ImageTools/    # Hub + 4 individual tool pages
│   │   ├── DeveloperTools/# Hub + 2 individual tool pages
│   │   └── Legal/         # About, Contact, Privacy Policy, Terms, Disclaimer, 404
│   ├── tools/             # Pure in-browser processing logic (PDF, Canvas, Developer)
│   ├── utils/             # Download utilities, byte formatters, file validators
│   ├── App.tsx            # Full declarative routing tree
│   └── main.tsx           # React entry point
└── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed:
```bash
node -v
npm -v
```

### 2. Installation
```bash
npm install
```

### 3. Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Production Build
Verify TypeScript compilation and generate the production bundle:
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

### 5. Local Production Preview
```bash
npm run preview
```

---

## ☁️ Deployment: Cloudflare Pages

### Build Settings
When connecting your repository to Cloudflare Pages in the Cloudflare Dashboard:

| Setting | Value |
| :--- | :--- |
| **Framework preset** | Vite |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` |
| **Node.js Version** | `20` or higher (`NODE_VERSION: 20` environment variable) |

### SPA Routing
The `public/_redirects` file is automatically deployed to the output root, ensuring all direct URLs (e.g. `https://sujaldev.shop/tools/image-to-pdf`) route to `index.html` with HTTP status 200.

---

## 🌐 Custom Domain & GoDaddy DNS Setup

To connect your custom domain `https://sujaldev.shop`:

1. **In Cloudflare Pages**:
   - Go to **Workers & Pages** > Select `sujaldev-tools` > **Custom domains**.
   - Click **Set up a domain**.
   - Enter `sujaldev.shop` and follow the prompt. Repeat for `www.sujaldev.shop` if desired.
   - Cloudflare will provide the target address (e.g., `<project-name>.pages.dev`).

2. **In GoDaddy DNS Management**:
   - Log in to your GoDaddy Domain Portfolio.
   - Select `sujaldev.shop` and open **DNS Records**.
   - Add/Update the following records:

   | Type | Name / Host | Value / Target | TTL |
   | :--- | :--- | :--- | :--- |
   | **CNAME** | `@` (or Root ANAME/ALIAS if supported) | `<project-name>.pages.dev` | 1 Hour |
   | **CNAME** | `www` | `<project-name>.pages.dev` | 1 Hour |

   *(Note: If GoDaddy does not allow CNAME on root `@`, either forward root `@` to `www.sujaldev.shop` via GoDaddy Domain Forwarding, or change domain nameservers to Cloudflare for automatic root CNAME flattening).*

3. **SSL/TLS**:
   - Cloudflare Pages automatically provisions free SSL/TLS certificates (Universal SSL) once DNS records are verified.

---

## 💰 Google AdSense Integration

1. Once your website is live on `https://sujaldev.shop` and indexed by Google:
2. Submit your site in your Google AdSense console.
3. Once approved, open `src/config/ads.ts` and update:
   ```ts
   export const ADS_CONFIG = {
     enabled: true,
     publisherId: 'ca-pub-YOUR_ACTUAL_ID',
     slots: {
       toolHeader: 'YOUR_SLOT_ID_1',
       toolSidebar: 'YOUR_SLOT_ID_2',
       toolFooter: 'YOUR_SLOT_ID_3',
       homeMiddle: 'YOUR_SLOT_ID_4',
     },
   };
   ```
4. Insert your AdSense verification `<script>` into `index.html` within `<head>`.
5. The `AdSlot` components will automatically render responsive ad units without Cumulative Layout Shift (CLS).

---

## 📄 License

MIT License. Designed and engineered for SujalDev Tools (`sujaldev.shop`).

