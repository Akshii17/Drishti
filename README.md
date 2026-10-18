# Drishti SIH UI

A React + Vite prototype for the Drishti training-centre monitoring dashboard.

## Included screens
- Overview dashboard with Recharts visualisations
- Training centre directory
- Attendance reconciliation
- Infrastructure inventory monitoring
- Apparent activity monitoring
- Alerts inbox, filtering and interactive human-review drawer
- Reports and analytics
- Configuration / notification preferences

All displayed metrics and findings are illustrative mock data. No CCTV feed, backend API, email, SMS, WhatsApp, authentication or persistent database is connected.

## Setup

Use Node.js 18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## If adding this to an existing Vite project

1. Install the dependencies:
   ```bash
   npm install lucide-react recharts
   npm install -D tailwindcss@3 postcss autoprefixer
   npx tailwindcss init -p
   ```
2. Copy `tailwind.config.js` and `postcss.config.js` from this project.
3. Replace `src/main.jsx`, `src/index.css`, and `src/App.jsx`.
4. Add `src/data.js`.
5. Ensure `index.html` has `<div id="root"></div>`.

## Tailwind CSS
The UI uses Tailwind utility classes for styling. `src/index.css` only includes Tailwind directives and a few global defaults.

## Integrating the backend
Replace values in `src/data.js` with API responses. Recommended API groups:
- `GET /api/centres`
- `GET /api/sessions`
- `GET /api/attendance/:sessionId`
- `GET /api/infrastructure/:roomId`
- `GET /api/activity/:sessionId`
- `GET /api/alerts`
- `PATCH /api/alerts/:alertId` for review outcomes
- `GET /api/reports/summary`
- `PATCH /api/configuration`

For review actions, persist reviewer ID, decision, reason, timestamp, assignee, due date and corrective-action notes. Do not treat a UI-only state change as a saved backend decision.

## Notes
- This is a frontend demo; sample metrics must not be presented as real measured results.
- Use `UNABLE_TO_VERIFY` / inconclusive states when footage is insufficient.
- A potential discrepancy is not a confirmed violation. Human review is required.
- Avoid facial recognition; only show evidence frames to authorised users.
