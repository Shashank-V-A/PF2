# shashankva.me

My personal portfolio — [shashankva.me](https://shashankva.me)

I'm **Shashank VA**, a full-stack developer and B.E. CSE (Data Science) student at MVJ College of Engineering, Bangalore. I build web apps end to end — from UI and APIs to deployment — and I've picked up a few hackathon podiums along the way.

This repo is the source for my portfolio site. Everything you see on the live site — copy, projects, experience, skills, certificates — lives in one place so it's easy to update.

## About me

- Full-stack developer focused on React, Next.js, and Node.js
- Co-founder of **BrightWords**, an AI-powered assistive learning platform for children with special needs
- Software Engineer Intern at **Startup Haven** (Jan–Jun 2026)
- 5× hackathon podium finisher (4 wins, 1 third place)
- CGPA **8.95 / 10** at MVJ College of Engineering, graduating May 2027

## Tech stack

| Layer | Tools |
|-------|-------|
| Framework | [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev) |
| Contact form | [Web3Forms](https://web3forms.com) |
| Hosting | [Vercel](https://vercel.com) |

## Project structure

```
src/
├── app/                  # Next.js app router (layout, page, metadata)
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # About, Skills, Experience, Projects, etc.
│   └── ui/               # Shared UI (Button, modals, icons)
└── lib/
    ├── data.ts           # All site content — edit this first
    └── utils.ts          # Helpers

public/
├── images/               # Profile photo
├── logos/                # Company logos (experience section)
├── certificates/         # Hackathon & internship certificates
├── skills/               # Custom skill icons (Tableau, Power BI)
└── resume.pdf            # Downloadable resume
```

## Run locally

```bash
npm install
cp .env.example .env.local   # add your Web3Forms key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The contact form needs `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local`. On production it's set in Vercel. If your Web3Forms key has domain restrictions, the form only works on `shashankva.me`, not localhost.

## Update content

Edit **`src/lib/data.ts`**. That's where nav links, about copy, skills, experience, projects, achievements, and site metadata all live.

To change the resume download, replace **`public/resume.pdf`**.

To add a certificate, drop the image in **`public/certificates/`** and reference the path in `achievements` or `experience` inside `data.ts`.

## Build & deploy

```bash
npm run build
npm start
```

The site auto-deploys to Vercel when you push to `master`. Custom domain: **shashankva.me**.

## Sections

About → Skills → Experience → Projects → Extra Mile → Resume → Contact

---

Built and maintained by [Shashank VA](https://shashankva.me) · [GitHub](https://github.com/Shashank-V-A)
