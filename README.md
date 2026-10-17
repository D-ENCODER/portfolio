# ⚡ HET.PY — Het Joshi Developer Portfolio

[![Live Site](https://img.shields.io/badge/Live_Portfolio-het--joshi.web.app-6366f1?style=for-the-badge)](https://het-joshi.web.app)
[![LeetCode Vault](https://img.shields.io/badge/LeetCode_Vault-D--ENCODER%2Fleetcode--challenges-f59e0b?style=for-the-badge)](https://github.com/D-ENCODER/leetcode-challenges)
[![Stack](https://img.shields.io/badge/Stack-React_%7C_Vite_%7C_Tailwind_%7C_Framer_Motion-10b981?style=for-the-badge)]()

Personal engineering portfolio for **Het Joshi (`@D-ENCODER`)** — Software Developer & Core Network Automation Engineer. Built with **React 18**, **Vite**, **Tailwind CSS**, and **Framer Motion**, and deployed on **Firebase Hosting (`het-joshi.web.app`)**.

---

## ✨ Key Features

- **Focused Slide Navigation**: Smooth Framer Motion `AnimatePresence` transitions across 6 dedicated slides (`Overview`, `Projects`, `Experience`, `Education`, `LeetCode`, and `Hobbies`), with an ergonomic 6-column mobile icon dock and desktop glass pill bar.
- **Interactive Command Palette (`⌘K` / `Ctrl+K`)**: Instant keyboard navigation across sections, projects, and external links.
- **Live GitHub LeetCode Sync**: Dynamically fetches the solution tree and raw markdown/code directly from **[`D-ENCODER/leetcode-challenges`](https://github.com/D-ENCODER/leetcode-challenges)** (`easy/`, `medium/`, `hard/`). Any new solution pushed to that repository automatically updates the difficulty ring, counts, and interactive code inspector on the live site.
- **Verified Experience & Credentials**: Highlights SaskTel IP Core & Transport engineering work, a verified LinkedIn colleague recommendation, University of Regina B.Sc. Computer Science & Diploma honours, and all **19 verified Coursera course credentials**.
- **Tonkatsu Box & CineLog Media Vault**: Syncs personal movie, series, and anime stats, genre breakdown, currently watching progress, and `10/10` Hall of Fame directly from a self-hosted **Tonkatsu Box** Docker instance (`127.0.0.1:8080`).

---

## 🛠️ Local Development & Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Sync latest stats & top-rated titles from local Tonkatsu Box Docker container
npm run sync:tonkatsu

# Build production bundle (outputs to /dist)
npm run build

# Build & deploy directly to Firebase Hosting (https://het-joshi.web.app)
npm run deploy
```

---

## 📂 Project Structure

```text
portfolio/
├── public/
│   └── Het_Joshi_Resume.pdf        # Downloadable Resume PDF
├── scripts/
│   └── sync-tonkatsu.py            # Syncs local Tonkatsu Box SQLite DB -> tonkatsuData.json
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Responsive slide navigation bar & Command Palette trigger
│   │   ├── Hero.jsx                # Overview bento grid, skills matrix & quick slide cards
│   │   ├── ProjectsSection.jsx     # Filterable engineering projects & detail modal
│   │   ├── ExperienceSection.jsx   # LinkedIn recommendation spotlight & career timeline
│   │   ├── EducationCoursesSection.jsx # Degrees, specialization & 19 verified Coursera courses
│   │   ├── LeetCodeSection.jsx     # Live GitHub sync with D-ENCODER/leetcode-challenges
│   │   ├── HobbiesSection.jsx      # Tonkatsu Box stats, active queue & 10/10 Hall of Fame
│   │   └── CommandPalette.jsx      # ⌘K / Ctrl+K modal
│   ├── data/
│   │   ├── portfolioData.json      # Primary profile, projects, experience, education & courses data
│   │   └── tonkatsuData.json       # Synced Tonkatsu Box media stats & Hall of Fame
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── firebase.json                   # Firebase Hosting SPA configuration
└── .firebaserc                     # Linked to Firebase project `het-joshi`
```
