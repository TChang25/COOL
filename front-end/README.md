# 🌆 City of Orlando Loaners — Frontend

The **City of Orlando Loaners** project is a community-driven platform that helps track, manage, and visualize loaner devices (like laptops, tablets, and hotspots) distributed across Orlando’s community centers.  

This repository contains the **frontend** built with **React** and **Material UI (MUI)** — designed for accessibility, scalability, and alignment with the City of Orlando’s official brand identity.

---

## 🎨 Color Scheme & Branding

Our color palette follows the [City of Orlando Brand Style Guide (2018)](https://www.orlando.gov/files/sharedassets/public/v/1/documents/assets-official/cityoforlando_styleguide_sept2018_external.pdf), reflecting a modern, civic, and community-focused tone.  

| Color | Use Case | CMYK |
|-------|-----------|-----|
| 💙 Pantone 287 | Primary buttons, headers, section backgrounds | 100 / 68 / 0 / 12 |
| 🩵 Pantone 283 | Page backgrounds | 35 / 9 / 0 / 0 |
| 🤍 White | Text, icon colors, background color | 0 / 0 / 0 / 0 |
| 🖤 Pantone Cool Gray 45 | Text | 0 / 0 / 0 / 90  |
| ❤️ PANTONE 1797C | Error and alert states (status color) | 0 / 100 / 99 / 4 |
| 💚 PANTONE 376 | Success states (status color) | 50 / 0 / 100 /0 |

> These colors are applied through a custom MUI theme (`/src/theme/theme.js`) to ensure accessibility and visual consistency.

---

## ✨ Design Tokens

To maintain cohesive visual design, the following constants guide all UI decisions.  
All tokens are managed through the MUI theme file to ensure consistent application across the interface.

| Token | Example Value | Use |
|--------|----------------|-----|
| **Typography** | `"Manrope", "Nunito Sans", "Arial", sans-serif` | Primary font pairing inspired by Texta (City of Orlando brand standard) |
| **Border Radius** | `20px` | Buttons, sections, modals |
| **Shadow Elevation** | `3px 3px 5px rgb(0, 72, 224)` | Adds depth for buttons and containers |
| **Spacing Scale** | `5px` base unit | Margins, padding, and grid spacing |

> The typography substitutes **Texta** with accessible Google Fonts (**Manrope** and **Nunito Sans**) to maintain the City of Orlando’s professional and approachable tone across devices.

---

## 🧩 Framework & Libraries

- ⚛️ **React 18+** — Core framework  
- 🎨 **Material UI (MUI)** — UI library for accessible, consistent design  
- 🔗 **React Router** — Handles navigation between app pages  
- 🌐 **Axios / Fetch API** — Communicates with backend (Spring Boot)  
- 🌀 **Framer Motion** — For animations and transitions  
- 🧠 **React Context API** — Manages global state when needed  

> All dependencies are listed in `package.json`.

---

## 🧠 Figma Prototype & Design System

The Figma prototype serves as the single source of truth for layout, color usage, and component behavior.  
Each screen is labeled with annotations to help developers align with design intentions.

🎨 **Figma Prototype:** [View Here](https://www.figma.com/proto/FEkuq7HobPwcUwDdutsP2O/COOL?node-id=2-2&t=YmQFueKI7NcrKtJc-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2)  
📹 **Walkthrough Demo:** [View Here](https://drive.google.com/file/d/1nYU5p_TZgPLP0y9c9LXXUCmhOrOiMXNo/view)

**Pages Included in Prototype:**
- Landing Page
- Device Availability
- Employee Landing Page
- Sign in page
- Eligibility
- Nearest Center Map
- Device Check-In
- Device Check-Out
- Help Modal
- View Information Modal
- Admin Dashboard


---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/TChang25/COOL.git
cd COOL
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the development server
```bash
npm start
```

### 4️⃣ Build for production
```bash
npm run build
```

---

## 🧱 Project Structure

Here’s the suggested folder layout to keep code organized and scalable:

```plaintext
src/
├── assets/          # Images, logos, and icons
├── components/      # Reusable UI components (Navbar, Card, Table, etc.)
├── pages/           # Page-level views (Home, Admin, Centers, etc.)
├── context/         # React Context files for state management (optional)
├── theme/           # MUI theme and custom palette
│   └── theme.js
├── App.js           # Main app container
└── index.js         # Root render file
```

> 💡 **Tip:** Even if some folders are empty right now, create them to establish structure early. This helps your team scale development and signals professionalism to recruiters reviewing the repo.

---

## 🧠 Version Control Guidelines

To keep development consistent across contributors, follow this Git branching pattern:

| Branch Type | Example | Description |
|--------------|----------|-------------|
| `feature/` | `feature/device-table` | New component or feature |
| `bugfix/` | `bugfix/navbar-styling` | Fixes an issue or UI bug |
| `refactor/` | `refactor/dashboard-layout` | Code cleanup or restructuring |
| `hotfix/` | `hotfix/login-redirect` | Urgent fix deployed directly to main |

### 🔀 Example Workflow (Frontend)

```bash
# Create a new feature branch off frontend
git checkout frontend
git pull origin frontend
git checkout -b feature/device-table

# After making changes
git add .
git commit -m "Added DeviceTable component with MUI styling"
git push origin feature/device-table

# Open a Pull Request into 'frontend' for review
```

> Always write clear commit messages (e.g., “Added CenterCard component with MUI Grid layout”).

---

## 👥 Frontend Team Guidelines

- **UI Consistency:** Use MUI components whenever possible for buttons, grids, typography, etc.  
- **Styling:** Avoid inline styles — prefer the `sx` prop or global theme overrides.  
- **Responsiveness:** Ensure layouts adapt cleanly to mobile and desktop breakpoints.  
- **Accessibility:** Include proper `aria-labels`, semantic HTML, and sufficient color contrast.  
- **Code Reviews:** Submit pull requests for peer review before merging to `main`.  
- **Naming Conventions:** Use PascalCase for components and kebab-case for files/folders.  

---

## 📈 Future Roadmap

- 🌐 **Multilingual Support (English / Spanish / Haitian Creole)**  
  Reflect Orlando’s diverse community by offering basic language toggles and translations for key pages.

- 📩 **Real-Time Notifications**  
  Notify staff or users when devices become available or when a return is due soon, ensuring smoother communication across centers.

- 📶 **Offline-Ready Progressive Web App (PWA)**  
  Enable staff to view or update device check-ins/check-outs without a stable internet connection, syncing automatically when reconnected.


---

## 💼 Team & Credits

| Role | Name |
|------|------|
| **Frontend Lead** | Emerson Albert |
| **Frontend Developers** | Gary Montero, Christian D'Albano, Tommy Chang  |
| **Faculty Advisor** | Mary Walauskis |

> Developed by senior software development students in partnership with the **City of Orlando**.
---

## 🧾 Project Context & Future Use

This project was developed as part of the **Senior Capstone course** in collaboration with the **City of Orlando**.  
It serves as a prototype for the City’s **Community Tech Access / Loaner Device Program**, helping manage device distribution and center metrics.

All source code and designs were created for **educational and civic purposes**.  
Ownership and continued use of this project, in whole or in part, may be transferred to the **City of Orlando** for official implementation or further development by their IT team.

> The team welcomes future adaptation and scaling of this project to support city-wide community initiatives.

---

