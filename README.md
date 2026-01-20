## AboutMe – Personal Portfolio

**AboutMe** is a modern, single-page personal website built with **Next.js**, **Tailwind CSS**, and **Framer Motion**.  
It is fully responsive, supports **English / Arabic**, and includes **dark / light themes**.

### Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 (via `@import "tailwindcss"`)
- **Animations**: Framer Motion
- **Theming**: `next-themes` (dark / light)
- **Content Source**: Single JSON file `src/data/aboutme.json`

### Project Structure

- `src/app` – Next.js app router (`layout.tsx`, `page.tsx`, global styles)
- `src/components` – Shared UI components (`Navbar`, `Footer`, `LanguageThemeProvider`)
- `src/sections` – Page sections (Hero, About, Skills, Projects, Social, Contact)
- `src/data` – `aboutme.json` (all content) and `types.ts`

### Content Management (aboutme.json)

All personal data (name, bio, skills, projects, social links) is defined in:

- `src/data/aboutme.json`

To customize the site, edit this JSON file only. The UI reads from it as the single source of truth.

### Running the Project Locally

```bash
cd aboutme-web
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

### Language & Direction

- The **language toggle (EN / AR)** is in the navbar.
- The layout automatically switches between **LTR (English)** and **RTL (Arabic)** by setting `dir` on `<html>`.

### Theme

- The **theme toggle** is in the navbar.
- Uses system theme by default and persists the selection using `next-themes`.

### Deployment

The app is ready for deployment on **Vercel** or **Netlify**:

- **Vercel**: import the project and build with the default Next.js settings.
- **Netlify**: use `npm run build` as the build command and `next` adapter / Next.js support.

No extra configuration is required beyond standard Next.js deployment setup.

