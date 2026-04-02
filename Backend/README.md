# ScriptAI Backend

Backend API for ScriptAI - Faceless YouTube Automation Studio

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Cache:** Redis
- **Queue:** BullMQ
- **Authentication:** JWT
- **AI:** OpenRouter API (10+ models)
- **Storage:** Cloudflare R2 / AWS S3
- **Video Processing:** FFmpeg

## 📁 Project Structure

```
Backend/
├── config/           # Database, Redis, API configurations
├── controllers/      # Request handlers
├── middleware/       # Auth, error handling, rate limiting
├── models/           # Database operations
├── routes/           # API route definitions
├── services/         # Business logic
├── jobs/             # Background job processors
├── utils/            # Helper functions
├── prisma/           # Prisma schema and migrations
└── src/              # Application entry point
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_HOST`, `REDIS_PORT` - Redis configuration
- `JWT_SECRET` - JWT signing secret
- `OPENROUTER_API_KEY` - AI model access
- `ELEVENLABS_API_KEY` - Voice synthesis
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` - Payments
- `STORAGE_PROVIDER`, `R2_*` - Cloud storage

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio
npm run prisma:studio
```

### 4. Start Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |

### Scripts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/scripts/generate` | Generate AI script |
| GET | `/api/scripts` | Get user's scripts |
| GET | `/api/scripts/:id` | Get script by ID |
| PUT | `/api/scripts/:id` | Update script |
| DELETE | `/api/scripts/:id` | Delete script |

### Videos

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/videos` | Create video |
| GET | `/api/videos` | Get user's videos |
| GET | `/api/videos/:id` | Get video by ID |
| PUT | `/api/videos/:id` | Update video |
| DELETE | `/api/videos/:id` | Delete video |
| POST | `/api/videos/:id/export` | Export video |
| POST | `/api/videos/:id/publish` | Publish to YouTube |

### Video Clips

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/video-clips/search` | Search clips |
| GET | `/api/video-clips/games` | Get available games |
| GET | `/api/video-clips/moods` | Get available moods |
| GET | `/api/video-clips/:id` | Get clip by ID |
| POST | `/api/video-clips/upload` | Upload clip |

## 📊 Subscription Plans

| Feature | Free | Starter | Creator | Pro |
|---------|------|---------|---------|-----|
| Script Generations | 3/mo | 20/mo | 100/mo | Unlimited |
| Video Exports | 0 | 10/mo | 50/mo | Unlimited |
| AI Models | 3 | 5 | 10 | All |
| Export Quality | 720p | 1080p | 1080p | 4K |
| YouTube Publish | ❌ | ❌ | ✅ | ✅ |

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🎬 Background Jobs

Video processing and YouTube publishing are handled asynchronously using BullMQ:

- **Video Export Queue:** Renders videos with FFmpeg
- **YouTube Publish Queue:** Uploads to YouTube API

Requires Redis to be running.

## 🧪 Testing

```bash
# Run tests (to be implemented)
npm test
```

## 📝 License

ISC

## 👥 Support

For issues and questions, contact the development team.
