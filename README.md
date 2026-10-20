# Drishti — AI-Based Training Centre Monitoring & Compliance System
**Smart India Hackathon 2026 | Problem Statement 26245**

Drishti is a modern, enterprise-grade AI monitoring and compliance platform designed for state vocational training directorates. It enables administrators to review attendance discrepancies, verify fixed infrastructure availability, monitor scheduled practical activity, and manage corrective actions through a unified interface.

---

## 🌟 Application Flow & Implemented Routes

The application follows the required unified flow:
**Public Homepage → Dedicated Login Page → One Unified Monitoring Dashboard → All Pipeline Pages**

- `/` — **Public Homepage**: Executive introduction, 5-step operational pipeline, live mini-dashboard preview, 8 feature showcases, ethical AI safeguards, and proposed evaluation metrics.
- `/login` — **Authorised Officer Login**: Split-screen design with demo autofill, validation, remember-me session, and privacy notice.
- `/dashboard` — **Operational Overview**: Multi-pipeline KPI cards, occupancy vs. roster trend chart, findings breakdown by pipeline, recent urgent review queue, active corrective actions, and priority centres table.
- `/dashboard/centres` — **Training Centres Directory**: Searchable registry, district & status filters, multi-column sorting, pagination, and full centre drill-down inspection drawer.
- `/dashboard/attendance` — **Attendance Reconciliation**: Roster roll-call reconciliation against conservative CCTV peak occupancy, step-by-step mathematical margin gap breakdown, interval trend chart, and evidence frame inspector.
- `/dashboard/infrastructure` — **Infrastructure Verification**: Fixed-slot spatial verification (`SEEN`, `NOT_SEEN_CLEAR_VIEW`, `BLOCKED`, `PARTIAL`, `UNABLE_TO_VERIFY`, `MODEL_NOT_VALIDATED`, `REVIEW_REQUIRED`), slot state guide, multi-sweep history, and CSV export.
- `/dashboard/activity` — **Practical Activity Monitoring**: Continuous visual motion cue density analysis, workstation status tracking (Tailoring, Electrical, CNC, Fabrication), and activity indicator protocol disclaimer.
- `/dashboard/alerts` — **Alerts & Reviews Portal**: Complete alert lifecycle management (Pending review, Under review, Confirmed, Dismissed, Recheck required, Resolved), reviewer assignments, corrective action generation, and bulk resolution demo.
- `/dashboard/cameras` — **Camera Health & Evidence Quality**: Hardware and edge node telemetry, illumination score, lens occlusion index, monitoring eligibility matrix, and diagnostic feed test.
- `/dashboard/reports` — **Reports & Analytics**: Longitudinal 7-day stacked pipeline breakdown, review outcome distribution, state monitoring coverage indices, print support, and filtered CSV export.
- `/dashboard/intelligence` — **Historical Intelligence**: Detected recurrent patterns (post-recess occupancy dips, chronic divider sightline obstructions), and composite risk priority ranking.
- `/dashboard/settings` — **System Configuration**: Configurable attendance gap tolerance, activity motion thresholds, multi-check persistence rules, alert notification channels (Email, WhatsApp, SMS), and benchmark demo reset.

---

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js 18+ (Node 20+ LTS recommended)
- npm 9+

### Run Development Server
```bash
# Navigate to the project directory
cd Drishti

# Install dependencies (if not already installed)
npm install

# Start local dev server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Run Production Build
```bash
cd Drishti
npm run build
npm run preview
```

---

## 🎬 Recommended SIH 2026 Demonstration Sequence

Follow this 5-minute walkthrough to demonstrate the full depth of the system to judges:

1. **Homepage (`/`)**:
   - Showcase the modern hero banner, SIH Problem Statement 26245 tag, and interactive miniature dashboard widget.
   - Walk through the **5-Step Operational Pipeline** (Ingestion &rarr; Validation &rarr; Analysis &rarr; Review &rarr; Action).
   - Point out the **Responsible AI Safeguards** (No facial recognition, conservative error bounds, human sign-off).
   - Click **Explore Dashboard** or **Sign In**.

2. **Login Page (`/login`)**:
   - Show the split-screen enterprise layout and click **Autofill Credentials**.
   - Click **Enter Monitoring Console** to sign in as a State Monitoring Officer.

3. **Overview Dashboard (`/dashboard`)**:
   - Highlight the 6 primary metric cards and the interactive **Attendance Reconciliation Area Chart**.
   - Filter by a specific training centre (e.g., *Pune Skills Hub*) using the top navigation dropdown to observe live synchronization.
   - Click on an urgent finding in the **Urgent Review Queue** to open the **Alert Drawer**.

4. **Attendance Pipeline (`/dashboard/attendance`)**:
   - Review the step-by-step mathematical formula breakdown showing how the **Minimum Apparent Gap** is calculated (Reference minus Conservative Upper Occupancy).
   - Click **Inspect Frame Evidence** to open the simulated CCTV inspection frame with calibrated ROI zones and privacy blur.

5. **Infrastructure Verification (`/dashboard/infrastructure`)**:
   - Filter by `NOT_SEEN_CLEAR_VIEW` and `BLOCKED`.
   - Explain the core compliance principle: *An obscured camera view does not prove an item is missing; it mandates a physical audit notice.*

6. **Activity Telemetry (`/dashboard/activity`)**:
   - Review the workstation motion cue time series graph and clarify how visual activity cues support—not replace—human evaluation.

7. **Alerts & Review Action Portal (`/dashboard/alerts`)**:
   - Open an alert, add an official review note, assign a follow-up officer, and click **Confirm Finding** or **Assign Corrective Action**.
   - Notice how dashboard metrics and centre counts dynamically update.

8. **Reports & Intelligence (`/dashboard/reports` & `/dashboard/intelligence`)**:
   - View the 7-day multi-pipeline stacked chart and click **Export CSV Dataset** to demonstrate export capability.
   - Explore longitudinal patterns and composite centre rankings in **Historical Intelligence**.
