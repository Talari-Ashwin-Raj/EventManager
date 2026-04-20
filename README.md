# Smart Campus Event Management System

**🚀 Live Deployment:** [https://event-manager-gamma-lac.vercel.app/](https://event-manager-gamma-lac.vercel.app/)

## Project Overview
The **Smart Campus Event Management System** is a full-stack web application designed for university ecosystems. It centralizes event lifecycle management, handles volunteer tasks, and allows students to register seamlessly. The system emphasizes backend robustness, role-based workflows, and clean system design principles.

## Tech Stack
- **Frontend**: React, Vite, Vanilla CSS (Glassmorphism & Custom Theming)
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **ORM / Driver**: Prisma ORM (v7), `@prisma/adapter-pg`
- **Deployment**: Vercel (Frontend), Render (Backend)

## Architecture & Design Patterns

### Backend (75% Weight)
The backend architecture implements deep Object-Oriented Principles (OOP) and Software Design patterns:
- **Architecture Layering**: Route Controllers -> Abstraction Services -> Base Repository.
- **OOP - Encapsulation**: Domain models handle independent validation contexts securely (e.g., atomic capacity checks natively nested on an `EventEntity`).
- **OOP - Inheritance & Polymorphism**: Handled via abstract structures like `BaseUser` spawning into specific models (`Organizer`, `Student`, `Volunteer`) with inherently separate constraint algorithms.
- **Singleton Pattern**: Prisma interactions are centralized strictly through a single `PrismaSingleton.getInstance()` pipeline protecting database connection pools.
- **Factory Pattern**: Utilizes `NotificationFactory` internally capable of spitting out agnostic logic handlers like Dashboard or Email alerts seamlessly without impacting upper service workflows.
- **Repository Pattern**: Built a generic `BaseRepository<T>` dynamically tracking generic behaviors globally, streamlining CRUD and mitigating duplicate queries across specific repositories (User, Event, Registration).

### Frontend (25% Weight)
The interface employs modern, dynamic UI strategies focusing exclusively against basic block aesthetics:
- High transparency Glassmorphism components floating on dark dynamic background gradients.
- Micro-animations providing natural user engagement cues.
- Responsive, clean Flex/Grid architectures without the bloat of excessive utility frameworks.
- Synchronized direct HTTP calls to backend endpoints leveraging async/await `fetch`.

## Local Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Talari-Ashwin-Raj/EventManager.git
cd EventManager
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in the `/backend` folder:
  ```env
  DATABASE_URL="your-postgresql-url"
  PORT=8000
  ```
- Generate Prisma & Start:
  ```bash
  npx prisma db push
  npm run build
  npm run start
  ```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- Create a `.env` file in the `/frontend` folder:
  ```env
  VITE_API_URL="http://localhost:8000"
  ```
- Start the development server:
  ```bash
  npm run dev
  ```

## Contributions
Developed to exhibit systematic architecture layouts balancing comprehensive full-stack frameworks safely with elegant web design implementations.
