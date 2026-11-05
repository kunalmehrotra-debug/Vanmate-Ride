# 🚐 VanMate — Smart School & Student Transit Platform

**VanMate** (`Vanmate-Ride`) is a full-stack student and institutional transit management platform featuring real-time GPS vehicle telemetry, smart ride booking, role-based portals (**Parent**, **School**, **Driver**, and **Admin**), encrypted messaging, and automated CI/CD deployment.

---

## ✨ Key Features

- **Role-Based Portals & Authentication:**
  - **Parent Portal:** Book rides, monitor live vehicle GPS telemetry, view confirmed subscriptions, pay via Stripe checkout, and message drivers/admin.
  - **School Portal:** Fleet radar monitoring, institutional transport requests, student route logs, and broadcast advisories.
  - **Driver Portal:** Real-time duty status toggle (`ON DUTY` / `OFF DUTY`), assigned trip checkpoint timeline, and passenger delay alerts.
- **Stitch Dark Glassmorphic UI:** Engineered with `#101415` obsidian surfaces, `#ffb95f` amber glow accents, `#7bd0ff` cyan telemetry badges, and interactive SVG route maps.
- **Database & Auth:** PostgreSQL + Prisma ORM (`User`, `ParentProfile`, `OwnerProfile`, `SchoolProfile`) with `bcryptjs` password encryption.
- **CI/CD Pipeline:** Automated GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that validates Prisma schemas, builds the production Next.js bundle, and triggers continuous deployment on every push to `main`.

---

## 🚀 Quick Start (Local Development)

```bash
cd frontend
npm install
npx prisma generate
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.
