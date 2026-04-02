# ScriptAI - Faceless YouTube Automation Studio

🎬 All-in-one AI studio for faceless YouTube creators — produce publish-ready videos in under 15 minutes.

## 📦 Monorepo Structure

```
Brainrot/
├── Backend/          # Node.js + Express + Prisma API
├── frontend/         # Next.js 14 + Tailwind CSS + shadcn/ui
├── package.json      # Root package.json with workspaces
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL database
- Redis server

### 1. Install Dependencies

```bash
npm install
```

This installs dependencies for both backend and frontend workspaces.

### 2. Setup Environment Variables

**Backend (.env):**
```bash
cp Backend/.env.example Backend/.env
```

Edit `Backend/.env` with your API keys and database credentials.

**Frontend (.env.local):**
```bash
cp frontend/.env.example frontend/.env.local
```

### 3. Setup Database

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4. Run Development Servers

```bash
npm run dev
```

This runs both backend (port 5000) and frontend (port 3000) concurrently.

Or run them separately:
```bash
npm run dev:backend   # Backend only
npm run dev:frontend  # Frontend only
```

## 📡 API Documentation

Backend API runs on `http://localhost:5000`

### Endpoints

- **Auth**: `/api/auth/*`
- **Scripts**: `/api/scripts/*`
- **Videos**: `/api/videos/*`
- **Video Clips**: `/api/video-clips/*`

See [Backend/README.md](Backend/README.md) for full API documentation.

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL + Prisma ORM
- **Cache:** Redis
- **Queue:** BullMQ
- **Auth:** JWT
- **AI:** OpenRouter API (10+ models)

### Frontend
- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **UI:** shadcn/ui + Radix UI
- **State:** React Query + Zustand

## 📊 Subscription Plans

| Plan | Price | Scripts | Videos | Quality |
|------|-------|---------|--------|---------|
| Free | ₹0 | 3/mo | 0 | 720p |
| Starter | ₹499/mo | 20/mo | 10/mo | 1080p |
| Creator | ₹1,499/mo | 100/mo | 50/mo | 1080p |
| Pro | ₹2,999/mo | Unlimited | Unlimited | 4K |

## 🎯 Features

- ✅ AI Script Generator (10+ models via OpenRouter)
- ✅ Gameplay Video Library (10,000+ clips)
- ✅ AI Voiceover (20+ voices, multi-language)
- ✅ Auto Subtitles (Whisper AI)
- ✅ Timeline Assembler (FFmpeg)
- ✅ YouTube Auto-Publish
- ✅ Content Calendar
- ✅ Analytics Dashboard

## 🏗️ Development

### Available Commands

```bash
# Install all dependencies
npm install

# Run development servers
npm run dev

# Build both workspaces
npm run build

# Database commands
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio

# Start production servers
npm start
```

### Workspace-Specific Commands

```bash
# Backend only
npm run <command> --workspace=Backend

# Frontend only
npm run <command> --workspace=frontend
```

## 📝 License

ISC

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open an issue on GitHub.
