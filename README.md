# Portfolio — shashankva.me

Personal portfolio built with Next.js, inspired by the [Najaf Framer SaaS template](https://cloudy-help-155294.framer.app/).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize your content

Edit **`src/lib/data.ts`** — all copy, links, projects, experience, and skills live there.

## Add your resume

Place your PDF at **`public/resume.pdf`** — the download button on the site will serve it automatically.

## Deploy to shashankva.me

### Vercel (recommended)

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Deploy (zero config needed for Next.js)
4. In **Project Settings → Domains**, add `shashankva.me` and `www.shashankva.me`
5. At your domain registrar, add the DNS records Vercel provides:
   - **A record** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`

### Build locally

```bash
npm run build
npm start
```

## Sections

| Section    | Template equivalent |
|-----------|---------------------|
| Hero      | SaaS hero           |
| About     | Client stats        |
| Skills    | Features grid       |
| Tech Stack| Integrations marquee|
| Experience| Why Us alternating  |
| Projects  | Case studies        |
| Resume    | Pricing cards       |
| Contact   | FAQ + footer CTA    |

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Framer Motion
- Lucide React
