# ScriptAI Setup Guide

Complete setup instructions for the ScriptAI monorepo.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **PostgreSQL** >= 14 ([Download](https://www.postgresql.org/download/))
- **Redis** >= 6.2 ([Download for Windows](https://github.com/microsoftarchive/redis/releases))

## 🚀 Step-by-Step Setup

### Step 1: Clone and Install

```bash
# Navigate to project root
cd Brainrot

# Install all dependencies (backend + frontend)
npm install
```

### Step 2: Database Setup (PostgreSQL)

#### Option A: Using PostgreSQL locally

1. **Install PostgreSQL** if not already installed
2. **Create a database:**

```sql
CREATE DATABASE scriptai;
CREATE USER scriptai_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE scriptai TO scriptai_user;
```

3. **Update Backend/.env:**

```env
DATABASE_URL="postgresql://scriptai_user:your_password@localhost:5432/scriptai?schema=public"
```

#### Option B: Using Docker (Recommended)

```bash
# Start PostgreSQL with Docker
docker run --name scriptai-db -e POSTGRES_USER=scriptai_user -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=scriptai -p 5432:5432 -d postgres:15

# Start Redis with Docker
docker run --name scriptai-redis -p 6379:6379 -d redis:7
```

### Step 3: Environment Configuration

#### Backend Environment

```bash
# Navigate to Backend folder
cd Backend

# Copy environment template
copy .env.example .env

# Edit .env file with your credentials
notepad .env
```

**Required API Keys:**

1. **OpenRouter (AI Models)**: Get free key at https://openrouter.ai/
2. **ElevenLabs (Voiceover)**: https://elevenlabs.io/
3. **OpenAI (Subtitles)**: https://platform.openai.com/
4. **Razorpay (Payments)**: https://razorpay.com/

#### Frontend Environment

```bash
# Navigate to frontend folder
cd ..\frontend

# Copy environment template
copy .env.example .env.local

# Edit .env.local file
notepad .env.local
```

### Step 4: Database Migration

```bash
# From project root
npm run prisma:generate
npm run prisma:migrate
```

This creates all database tables for:
- Users & Authentication
- Scripts & Videos
- Subscriptions & Payments
- Video Clips Library
- Analytics

### Step 5: Verify Setup

```bash
# Start both backend and frontend
npm run dev
```

You should see:
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:3000

### Step 6: Test API

Open browser and visit:
- http://localhost:5000/health - Backend health check
- http://localhost:3000 - Frontend app

## 🔧 Troubleshooting

### Port Already in Use

If ports 3000 or 5000 are occupied:

**Backend:** Change in `Backend/.env`:
```env
PORT=5001
```

**Frontend:** Change in `frontend\package.json`:
```json
"dev": "next dev -p 3001"
```

### Database Connection Error

Ensure PostgreSQL is running:
```bash
# Check if PostgreSQL is running
netstat -an | findstr "5432"
```

### Redis Connection Error

Ensure Redis is running:
```bash
# Check if Redis is running
netstat -an | findstr "6379"
```

## 📦 Optional: Seed Database

To populate the video clips library with sample data:

```bash
# (To be implemented)
npm run seed --workspace=Backend
```

## 🎯 Next Steps

1. **Create Account**: Visit http://localhost:3000/register
2. **Generate Script**: Try the AI script generator
3. **Browse Clips**: Explore the gameplay video library
4. **Create Video**: Assemble your first faceless YouTube video

## 🆘 Getting Help

- Check the [README.md](README.md) for overview
- Review [Backend/README.md](Backend/README.md) for API details
- Open an issue on GitHub for bugs

---

**Happy Creating! 🎬**
