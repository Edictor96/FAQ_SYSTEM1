# AI-Assisted FAQ & Query Resolution System

An intelligent knowledge management platform built for internship programs. Interns get instant AI-powered answers to their questions; admins manage the knowledge base, moderate discussions, and keep the platform growing.

---

## What It Does

- Interns ask questions → AI searches the FAQ knowledge base and returns an instant answer
- If no answer exists, the query is saved and posted to the **Discussion Room** for the community to answer
- Admins moderate answers, publish official FAQs, and manage users
- Every published FAQ makes the system smarter for future users

---

## Features

### For Interns
- **FAQ Hub** — Browse all published FAQs across 14 categories
- **Hybrid Search** — Semantic + keyword search that understands intent, not just keywords
- **AI Chatbot** — Floating assistant that answers questions using the FAQ knowledge base
- **Discussion Room** — Ask questions, post answers, upvote/downvote community responses
- **Points & Leaderboard** — Earn points for contributing; compete with other interns
- **Real-time Notifications** — Get notified when someone answers your question or upvotes you
- **Programme Overview** — Live-scraped overview of the internship programme

### For Admins
- **Moderation Panel** — Accept answers, delete posts, ban users from Discussion Room
- **FAQ Publishing** — Manually create and publish FAQs to the knowledge base
- **User Management** — View all users, promote interns to admin, manage roles
- **Analytics Dashboard** — Total users, questions, answers, FAQs at a glance

### For Super Admins
- Everything admins can do
- **FAQ Manager** — Full control over the FAQ database
- **Audit Log** — Track all admin actions on the platform
- Assign and revoke admin roles

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, CSS Variables, custom design system |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI — Embeddings | Google Gemini |
| AI — Responses | Groq LLM |
| Real-time | Socket.IO |
| Auth | JWT (access + refresh tokens), Google OAuth |
| Search | Hybrid semantic + keyword with in-memory embedding cache |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Gemini API key
- Groq API key
- Google OAuth credentials

### Installation

**1. Clone the repo**
```bash
git clone <repo-url>
cd project-root
```

**2. Install dependencies**
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

**3. Configure environment variables**

Create `server/.env`:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173,http://localhost:5174
LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
LLM_API_KEY=your_llm_api_key
LLM_MODEL=gpt-4o-mini
CHROMA_HOST=localhost
CHROMA_PORT=8000
CHROMA_COLLECTION=faq_embeddings
POINTS_JOB_INTERVAL_MS=3600000
```

Create `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

**4. Run the project**

Open two terminals:

```bash
# Terminal 1 — Backend
cd server
node server.js

# Terminal 2 — Frontend
cd client
npm run dev
```

Visit `http://localhost:5173`

---

## Roles

| Role | Access |
|------|--------|
| `intern` | FAQ Hub, Search, Chatbot, Discussion Room, Ask Question, My Questions, Leaderboard |
| `admin` | All intern views + Admin Area (moderation, FAQ publishing, user management, analytics) |
| `super_admin` | All admin capabilities + FAQ Manager, Audit Log, full role management |

To make a user an admin, update their `role` field in MongoDB from `intern` to `admin`.

---

## Project Structure

```
project-root/
├── client/               # React frontend
│   └── src/
│       ├── api/          # Axios instance + search API
│       ├── components/   # Reusable components + layout
│       ├── context/      # Auth context
│       ├── pages/        # All page components
│       ├── services/     # API service functions
│       └── styles/       # CSS design system
│
└── server/               # Express backend
    ├── config/           # Database connection
    ├── controllers/      # Route handlers
    ├── middleware/       # Auth + error handling
    ├── models/           # Mongoose schemas
    ├── routes/           # API routes
    └── services/         # Search, embeddings, scraper
```

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/register` | Register new account |
| POST | `/api/auth/google` | Google OAuth sign-in |
| GET | `/api/faqs` | Get all published FAQs |
| GET | `/api/search` | Hybrid search across FAQs |
| POST | `/api/queries` | Save unresolved query |
| GET | `/api/questions` | Get all Discussion Room questions |
| POST | `/api/questions` | Post a new question |
| GET | `/api/questions/:id` | Get question with answers |
| POST | `/api/answers` | Post an answer |
| POST | `/api/answers/:id/vote` | Upvote or downvote an answer |
| GET | `/api/admin/stats` | Get platform analytics |
| GET | `/api/admin/users` | Get all users |
| PUT | `/api/admin/users/:id/role` | Update user role |
| GET | `/api/internship/overview` | Get programme overview |

---

## Vercel Deployment (Client)

This repository is a split architecture:

- `client` is a Vite SPA suitable for Vercel static hosting.
- `server` is a long-running Node + Socket.IO API and should be hosted on a persistent backend platform (Render, Railway, Fly, VM, etc.), not Vercel serverless.

### Vercel project settings

- Framework Preset: `Vite`
- Root Directory: `client`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

### Required Vercel environment variables (client)

- `VITE_API_BASE_URL=https://<your-backend-domain>/api`
- `VITE_SOCKET_URL=https://<your-backend-domain>`

The SPA fallback rewrite is configured in `client/vercel.json` and excludes `/api` and `/socket.io` paths so API traffic is not rewritten to HTML.

---

## Points System

| Action | Points |
|--------|--------|
| Post an answer | +10 |
| Receive an upvote | +5 |
| Receive a downvote | -2 |
| Answer accepted by admin | +20 |

---

## What's Not Built (Future)

- Document upload via admin dashboard (PDF/TXT/DOCX → auto FAQ extraction)
- RAG pipeline for uploaded documents
- Query clustering
- n8n automation workflows
- Voice-based queries
- Mobile app
