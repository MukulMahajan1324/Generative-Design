# ✨ Alex Rivera — Creative Frontend Developer & UI/UX Designer Portfolio

A modern, high-performance portfolio crafted with **React 19**, **Vite 8**, and **Tailwind CSS v4**, featuring interactive glassmorphism physics, micro-interactions, responsive Bento grids, and accessible components (WCAG 2.2 AAA).

---

## 🌟 Live Demo & Preview

- **Local Dev Server:** `http://localhost:5173/`
- **Location:** `C:\Users\User\.gemini\antigravity\scratch\portfolio-dev`

---

## 🚀 Key Features

1. **Floating Glassmorphism Navbar**:
   - Status badge, quick resume modal, sound toggle (Web Audio API synthesis), and responsive mobile drawer.
2. **Interactive 3D Bento Hero**:
   - Rotating job titles, live cursor tilt effect, quick stats ribbon (Years Experience, Shipped Projects, 100/100 Lighthouse), and 1-click email copy with toast feedback.
3. **Interactive UI/UX Lab (Signature Feature)**:
   - **Glassmorphism Physics Engine**: Live sliders for blur, opacity, border lightness, and hue tint with live specimen card and 1-click CSS code copy.
   - **Micro-Interactions Sandbox**: Magnetic cursor attraction button, tactile spring toggle switch, sub-pixel water ripple trigger, and fluid volume slider.
   - **Global Palette Harmonizer**: Switch between Cyber Cyan, Royal Violet, Matrix Emerald, and Solar Amber.
4. **Curated Work & Case Study Modals**:
   - Responsive Bento grid with filter pills (*All, Web Applications, Design Systems, Creative & 3D, Mobile UI*).
   - Deep-dive case studies detailing The Challenge, The Solution, UX Research steps, Tech Highlights, and Measurable Business Results.
5. **Technical Arsenal & Design Synchrony**:
   - Tabbed skill categories with animated mastery meters.
   - Visual comparison showing direct translation from Figma Variable Tokens (`tokens.json`) to production React + Tailwind components.
6. **Design Process Pipeline**:
   - 4-phase interactive framework: *01 Discovery & Empathy, 02 Wireframing & Prototype, 03 Frontend Engineering, 04 Motion, Polish & Launch*.
7. **Social Proof & Testimonials**:
   - Credibility quotes from VP of Product, Engineering Director, and Lead Product Designer with verified star ratings.
8. **Interactive Contact Experience**:
   - Project-brief selector (Web App, Design System, UI/UX Redesign, Creative & 3D, Full-Time Role) with budget tier selector.
   - Confetti celebration (`canvas-confetti`) and audio chime on message dispatch.
9. **Full Curriculum Vitae / Resume Modal**:
   - Complete career timeline, education at UC Berkeley, certifications, and 1-click print / PDF export.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Brand SVGs
- **Delights**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) + Native Web Audio API Synthesizer

---

## 📁 Project Structure

```
portfolio-dev/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AboutSection.jsx          # Personal narrative & engineering pillars
│   │   ├── ContactSection.jsx        # Interactive form with confetti & socials
│   │   ├── DesignProcess.jsx         # 4-stage methodology pipeline
│   │   ├── Footer.jsx                # Stack badges & easter egg
│   │   ├── Hero.jsx                  # Dynamic hero with 3D tilt bento card
│   │   ├── Icons.jsx                 # Custom SVG brand icons (GitHub, Figma, LinkedIn, Dribbble)
│   │   ├── InteractivePlayground.jsx # UI/UX lab with glassmorphism tuner & physics
│   │   ├── Navbar.jsx                # Floating glass dock with sound toggle
│   │   ├── ProjectModal.jsx          # Comprehensive case study dialog
│   │   ├── Projects.jsx              # Filterable Bento portfolio grid
│   │   ├── ResumeModal.jsx           # Printable CV with experience & certifications
│   │   ├── SkillsArsenal.jsx         # Categorized skills & Figma-to-Code duality
│   │   └── Testimonials.jsx          # Client quotes & social proof
│   ├── data/
│   │   └── portfolioData.js          # All text, projects, skills & bio in one place
│   ├── utils/
│   │   └── sound.js                  # Zero-dependency Web Audio API sound synthesizer
│   ├── App.jsx                       # Main application shell
│   ├── index.css                     # Tailwind v4 setup & glassmorphism utilities
│   └── main.jsx                      # React 19 entry point
├── index.html                        # Google Fonts & SEO metadata
├── package.json
└── vite.config.js                    # Vite 8 + Tailwind v4 config
```

---

## ⚡ How to Customize with Your Own Information

All your personal details, projects, skills, and links are neatly centralized in a single file:
👉 **`src/data/portfolioData.js`**

1. **Update Name, Bio, and Socials**:
   Edit `personalInfo` with your name, tagline, email, and social profile URLs.
2. **Add / Edit Projects**:
   Update `projectsData` with your own projects, screenshots, live links, and case study notes.
3. **Customize Skills**:
   Modify `skillsData` to reflect your specific strengths and years of experience.
4. **Update Career History**:
   Edit the experience items in `src/components/ResumeModal.jsx`.

---

## 💻 Commands

```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🚀 One-Click Deployments

### Vercel
```bash
npx vercel
```

### Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### GitHub Pages
Run `npm run build` and publish the `dist/` directory or connect your repository to Vercel/GitHub Pages.
