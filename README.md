<div align="center">
<img width="1200" height="475" alt="GHBanner" src=https://pakhse-construction-safety-ai.vercel.app/
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/c61b20d1-e269-46c1-86b9-fcf643a52cea

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
 **LTI & Compliance Metrics:** Real-time tracking of Lost-Time Injury (LTI) free days, PEC audit scores, active workforce counts, and monthly Toolbox Talk (TBT) totals.
* **6-Month Incident Trends:** Interactive analytics powered by `Recharts` showcasing near misses, first aid cases, minor injuries, major violations, and hazard category breakdowns.
* **Comprehensive Inspection Roster:** Pre-loaded daily and pre-shift checklists covering:
  * **PPE:** Hard hats (EN397/ANSI Z89.1), full-body harnesses, steel-toe boots, high-vis vests, welding shields.
  * **Heavy Machinery:** Tower cranes, hydraulic excavators, mobile boom cranes, concrete mixer pumps, scaffolding rigs.
  * **Power & Electrical Tools:** Angle grinders, 100kVA diesel generators, main DB boxes with 30mA RCCB/ELCB, concrete vibrators.
  * **Hand Tools & Rigging:** Wire rope slings, bow shackles, chain pulley blocks, extension ladders.
* **Status Controls & Printing:** One-click toggles for `Pass`, `Needs Maintenance`, and `Fail (Tag-Out)`, with support for custom equipment additions and printable audit sheets.

---

### ⚡ 2. AI Job Safety Analysis (JSA) Matrix Generator
* **Instant JSA Creation:** Input activity parameters (e.g., *Steel Erection at 20m Height*, *Deep Excavation in Wet Soil*) to generate site-specific hazard assessments.
* **Risk Score Matrix:** 5x5 Severity × Probability calculation assigning standardized risk numbers (1 to 25).
* **Hierarchy of Controls:** Automatically provides Elimination, Substitution, Engineering Controls, Administrative Actions, and required PPE.
* **Regulatory Cross-Referencing:** Aligns every control with Pakistani OSH laws and PEC codes.
* **Bilingual Output:** Instant English and Urdu (اردو) toggle for field-worker comprehension.

---

### 🚨 3. AI Incident & Hazard Scanner
* **Automated Incident Reporting:** Submit incident descriptions or unsafe conditions for instant AI analysis.
* **Root Cause & Severity Classification:** Identifies primary failure points (human error, equipment breakdown, procedural gap) and severity levels.
* **Corrective & Preventive Action (CAPA):** Generates actionable short-term containment steps and long-term preventive measures.

---

### 💬 4. AI HSE Advisor & Legal Assistant (Chatbot)
* **Context-Aware Safety Assistant:** Powered by Google's Gemini API server-side proxy.
* **Pakistani Legal Knowledge Base:** Answers complex regulatory questions spanning POSHA 2019, Sindh OSH Regulations, Factories Act, and PEC Construction Safety Regulations.
* **Urdu Script Support:** Full native Urdu response capability (`اردو میں معلومات`) for site supervisors and workers.

---

### 📢 5. Toolbox Talks (TBT) Library
* **Pre-Shift 5-Minute Briefings:** Structured daily safety talk guides organized by high-risk activities (Working at Height, Excavation, Electrical Safety, Scaffolding, Hot Work).
* **Roman Urdu & English Scripts:** Designed for field delivery during morning site stand-ups.

---

### 🛡️ 6. Interactive 3D PPE Inspector
* **Component Breakdown:** Explores mandatory Personal Protective Equipment with technical specifications, inspection guidelines, and replacement criteria.

---

### 📜 7. Pakistani OSH Regulations & Legal Guide
* **Centralized Legal Repository:** Easy access to summarized clauses of:
  * **POSHA 2019** (Pakistan Occupational Safety & Health Act)
  * **Sindh OSH Act 2017** & **Punjab Factories Act**
  * **Pakistan Engineering Council (PEC) Bye-Laws**
  * **Pakistan Environmental Protection Act (PEPA 1997)**

---

### 🎓 8. PakHSE Certified Specialist Exam & Certification
* **Interactive Scenario Exam:** Tests site hazard knowledge based on real-world Pakistani construction scenarios.
* **Digital Certificate Generation:** Grants a printable **PakHSE Digital Safety Specialist Certificate** with a unique certificate ID for candidates passing the 80% threshold.

---

### 📞 9. National Emergency Directory
* **One-Touch Emergency Helplines:** Rescue 1122, Edhi, Chhipa, Pakistan Engineering Council (PEC), and EPA environmental hazard contacts.
* **5-Step Emergency SOP:** Mandatory site emergency procedure guidelines (Call 1122, Power Isolation, Cordon Off, Gate Escort, POSHA 24h Incident Log).

---

## 🛠️ Technology Stack & Architecture

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite 6 |
| **Styling & UI** | Tailwind CSS v4, Lucide React Icons, Custom Warm Neutral Theme (`#FDFCF8`, `#5A5A40`, `#A67C52`) |
| **Data Visualization** | Recharts |
| **Animations** | Motion (Framer Motion) |
| **Backend / Proxy** | Node.js, Express, `tsx`, `esbuild` |
| **AI Integration** | Google Gemini API (`@google/genai`) via Server-Side API Proxy |
| **Deployment** | Vercel / Cloud Run / Containerized Node |

---

## 🔒 Security Architecture & API Proxying

PakHSE adheres strictly to full-stack security best practices:
* **Server-Side API Proxy:** The Gemini API key (`GEMINI_API_KEY`) is stored securely in server environment variables and is **never** exposed to the browser client.
* **Express Proxy Routes:** Client requests route to server endpoints (`/api/jsa`, `/api/chat`, etc.) which interface with `@google/genai`.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* **Node.js**: v18.x or higher
* **npm**: v9.x or higher
* **Gemini API Key**: Obtainable from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pakhse-construction-safety-ai.git
   cd pakhse-construction-safety-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root based on `.env.example`:

---

## 📦 Scripts Overview

* `npm run dev`: Starts the Node/Express backend and Vite frontend server concurrently.
* `npm run build`: Bundles Vite frontend assets and compiles `server.ts` using `esbuild` into `dist/server.cjs`.
* `npm run start`: Runs the production CommonJS server `node dist/server.cjs`.
* `npm run lint`: Validates TypeScript type compliance (`tsc --noEmit`).

---

## 📄 License & Attribution

This project is built for the advancement of Pakistani Construction Health, Safety & Environment standards in accordance with POSHA 2019 and PEC Building Codes.

Developed for safer construction sites across Pakistan.   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

URL=https://pakhse-construction-safety-ai.vercel.app/
