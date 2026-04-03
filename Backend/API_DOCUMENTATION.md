# ScriptAI API Documentation

## Overview

ScriptAI is a comprehensive content creation platform that helps users generate AI-powered scripts and create videos automatically. This API provides endpoints for user management, script generation, video creation, and video clip management.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All API requests (except public video clip endpoints) require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token_here"
  }
}
```

**Error Responses:**
- `400`: Email and password are required / User already exists
- `500`: Failed to register user

### Login User
**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token_here"
  }
}
```

**Error Responses:**
- `400`: Email and password are required
- `401`: Invalid credentials
- `500`: Failed to login

### Get Current User
**GET** `/auth/me`

Get authenticated user's profile information.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "emailVerified": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "scriptsGenerated": 5,
    "videosExported": 2,
    "subscriptions": [
      {
        "planType": "FREE",
        "currentPeriodEnd": "2024-02-01T00:00:00.000Z"
      }
    ]
  }
}
```

**Error Responses:**
- `401`: Not authenticated
- `500`: Failed to fetch user data

### Update User Profile
**PUT** `/auth/profile`

Update user's profile information.

**Request Body:**
```json
{
  "name": "Updated Name",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "Updated Name",
    "avatarUrl": "https://example.com/new-avatar.jpg"
  }
}
```

**Error Responses:**
- `401`: Not authenticated
- `404`: User not found
- `500`: Failed to update profile

---

## Script Endpoints

### Generate AI Script
**POST** `/scripts/generate`

Generate an AI-powered script using specified parameters.

**Request Body:**
```json
{
  "topic": "How to bake chocolate chip cookies",
  "tone": "Energetic",
  "duration": "8min",
  "audience": "General",
  "format": "YouTube",
  "model": "gpt-4o",
  "projectId": "optional_project_id"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "script_id",
    "userId": "user_id",
    "projectId": "project_id",
    "title": "How to bake chocolate chip cookies",
    "topic": "How to bake chocolate chip cookies",
    "content": "Full script content...",
    "tone": "Energetic",
    "duration": "8min",
    "audience": "General",
    "format": "YouTube",
    "aiModel": "gpt-4o",
    "status": "draft",
    "scenes": [
      {
        "sceneNumber": 1,
        "narration": "Welcome to this amazing baking tutorial!",
        "visualTags": ["kitchen", "ingredients"],
        "duration": 30
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "model": "gpt-4o",
  "usage": {
    "prompt_tokens": 150,
    "completion_tokens": 500,
    "total_tokens": 650
  }
}
```

**Error Responses:**
- `400`: Topic, model, and format are required
- `401`: Not authenticated
- `429`: Rate limit exceeded (AI generation)
- `500`: Failed to generate script

### Get User Scripts
**GET** `/scripts`

Get all scripts for the authenticated user with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `format` (optional): Filter by format (YouTube, Shorts, TikTok, Podcast)
- `status` (optional): Filter by status (draft, approved, rejected)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "script_id",
      "userId": "user_id",
      "projectId": "project_id",
      "title": "Script Title",
      "topic": "Script Topic",
      "tone": "Energetic",
      "duration": "8min",
      "format": "YouTube",
      "status": "draft",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "project": {
        "id": "project_id",
        "name": "Project Name"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

**Error Responses:**
- `401`: Not authenticated
- `500`: Failed to fetch scripts

### Get Script by ID
**GET** `/scripts/:id`

Get a specific script by its ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "script_id",
    "userId": "user_id",
    "projectId": "project_id",
    "title": "Script Title",
    "topic": "Script Topic",
    "content": "Full script content...",
    "tone": "Energetic",
    "duration": "8min",
    "audience": "General",
    "format": "YouTube",
    "aiModel": "gpt-4o",
    "status": "draft",
    "scenes": [...],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "project": {...},
    "videos": [...]
  }
}
```

**Error Responses:**
- `401`: Not authenticated
- `403`: Not authorized to access this script
- `404`: Script not found
- `500`: Failed to fetch script

### Update Script
**PUT** `/scripts/:id`

Update a script's information.

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "approved"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "script_id",
    "title": "Updated Title",
    "content": "Updated content...",
    "status": "approved",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Not authenticated
- `403`: Not authorized to update this script
- `404`: Script not found
- `500`: Failed to update script

### Delete Script
**DELETE** `/scripts/:id`

Delete a script.

**Response (200):**
```json
{
  "success": true,
  "message": "Script deleted successfully"
}
```

**Error Responses:**
- `401`: Not authenticated
- `403`: Not authorized to delete this script
- `404`: Script not found
- `500`: Failed to delete script

---

## Video Endpoints

### Create Video
**POST** `/videos`

Create a new video project.

**Request Body:**
```json
{
  "title": "My Awesome Video",
  "description": "Video description",
  "format": "16:9",
  "resolution": "1080p",
  "scriptId": "script_id",
  "projectId": "project_id",
  "selectedClips": ["clip_id_1", "clip_id_2"],
  "voiceoverStyle": "male-energetic",
  "exportSettings": {
    "quality": "high",
    "format": "mp4"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "video_id",
    "userId": "user_id",
    "projectId": "project_id",
    "scriptId": "script_id",
    "title": "My Awesome Video",
    "description": "Video description",
    "format": "16:9",
    "resolution": "1080p",
    "status": "processing",
    "selectedClips": ["clip_id_1", "clip_id_2"],
    "voiceoverStyle": "male-energetic",
    "exportSettings": {...},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Video creation started. Processing in background."
}
```

**Error Responses:**
- `400`: Title is required
- `401`: Not authenticated
- `500`: Failed to create video

### Get User Videos
**GET** `/videos`

Get all videos for the authenticated user with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (processing, ready, failed, published)
- `format` (optional): Filter by format (16:9, 9:16)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "video_id",
      "userId": "user_id",
      "projectId": "project_id",
      "scriptId": "script_id",
      "title": "Video Title",
      "description": "Video description",
      "format": "16:9",
      "resolution": "1080p",
      "status": "ready",
      "youtubeVideoId": null,
      "youtubeUrl": null,
      "publishedAt": null,
      "duration": 480,
      "filePath": "https://storage.example.com/video.mp4",
      "thumbnailPath": "https://storage.example.com/thumbnail.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "project": {
        "id": "project_id",
        "name": "Project Name"
      },
      "script": {
        "id": "script_id",
        "title": "Script Title"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "pages": 2
  }
}
```

**Error Responses:**
- `401`: Not authenticated
- `500`: Failed to fetch videos

### Get Video by ID
**GET** `/videos/:id`

Get a specific video by its ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "video_id",
    "userId": "user_id",
    "projectId": "project_id",
    "scriptId": "script_id",
    "title": "Video Title",
    "description": "Video description",
    "format": "16:9",
    "resolution": "1080p",
    "status": "ready",
    "youtubeVideoId": "youtube_id",
    "youtubeUrl": "https://youtube.com/watch?v=youtube_id",
    "publishedAt": "2024-01-01T02:00:00.000Z",
    "duration": 480,
    "filePath": "https://storage.example.com/video.mp4",
    "thumbnailPath": "https://storage.example.com/thumbnail.jpg",
    "subtitlesPath": "https://storage.example.com/subtitles.srt",
    "voiceoverStyle": "male-energetic",
    "selectedClips": [...],
    "exportSettings": {...},
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "project": {...},
    "script": {...},
    "videoClips": [...]
  }
}
```

**Error Responses:**
- `401`: Not authenticated
- `403`: Not authorized to access this video
- `404`: Video not found
- `500`: Failed to fetch video

### Update Video
**PUT** `/videos/:id`

Update a video's information.

**Request Body:**
```json
{
  "title": "Updated Video Title",
  "description": "Updated description",
  "status": "ready"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "video_id",
    "title": "Updated Video Title",
    "description": "Updated description",
    "status": "ready",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Not authenticated
- `403`: Not authorized to update this video
- `404`: Video not found
- `500`: Failed to update video

### Delete Video
**DELETE** `/videos/:id`

Delete a video.

**Response (200):**
```json
{
  "success": true,
  "message": "Video deleted successfully"
}
```

**Error Responses:**
- `401`: Not authenticated
- `403`: Not authorized to delete this video
- `404`: Video not found
- `500`: Failed to delete video

### Export Video
**POST** `/videos/:id/export`

Start video rendering/export process. Requires STARTER plan or higher.

**Response (200):**
```json
{
  "success": true,
  "message": "Video export started. You will be notified when ready."
}
```

**Error Responses:**
- `401`: Not authenticated
- `403`: Not authorized to export this video / Insufficient subscription plan
- `404`: Video not found
- `500`: Failed to start video export

### Publish to YouTube
**POST** `/videos/:id/publish`

Publish a rendered video to YouTube. Requires CREATOR plan or higher.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "youtubeVideoId": "youtube_id",
    "youtubeUrl": "https://youtube.com/watch?v=youtube_id"
  },
  "message": "Video published to YouTube successfully"
}
```

**Error Responses:**
- `400`: Video must be fully rendered before publishing
- `401`: Not authenticated
- `403`: Not authorized to publish this video / Insufficient subscription plan
- `404`: Video not found
- `500`: Failed to publish video to YouTube

---

## Video Clip Endpoints

### Search Video Clips
**GET** `/video-clips/search`

Search and filter video clips. Public endpoint (no authentication required).

**Query Parameters:**
- `game` (optional): Filter by game (Minecraft, GTA, etc.)
- `mood` (optional): Filter by mood (Action, Calm, etc.)
- `duration` (optional): Filter by duration in seconds
- `resolution` (optional): Filter by resolution (1080p, 4K, etc.)
- `aspectRatio` (optional): Filter by aspect ratio (16:9, 9:16)
- `isPremium` (optional): Filter by premium status (true/false)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clip_id",
      "title": "Amazing Minecraft Build",
      "description": "Epic building montage",
      "game": "Minecraft",
      "mood": "Action",
      "duration": 30,
      "resolution": "1080p",
      "aspectRatio": "16:9",
      "url": "https://storage.example.com/clip.mp4",
      "thumbnailUrl": "https://storage.example.com/thumbnail.jpg",
      "tags": ["building", "epic", "montage"],
      "isPremium": false,
      "uploadDate": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `500`: Failed to search video clips

### Get Available Games
**GET** `/video-clips/games`

Get list of all available games with clip counts. Public endpoint.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "game": "Minecraft",
      "count": 150
    },
    {
      "game": "GTA",
      "count": 89
    }
  ]
}
```

**Error Responses:**
- `500`: Failed to fetch games

### Get Available Moods
**GET** `/video-clips/moods`

Get list of all available moods with clip counts. Public endpoint.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "mood": "Action",
      "count": 120
    },
    {
      "mood": "Calm",
      "count": 95
    }
  ]
}
```

**Error Responses:**
- `500`: Failed to fetch moods

### Get Video Clip by ID
**GET** `/video-clips/:id`

Get a specific video clip by its ID. Public endpoint.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "clip_id",
    "title": "Amazing Minecraft Build",
    "description": "Epic building montage",
    "game": "Minecraft",
    "mood": "Action",
    "duration": 30,
    "resolution": "1080p",
    "aspectRatio": "16:9",
    "url": "https://storage.example.com/clip.mp4",
    "thumbnailUrl": "https://storage.example.com/thumbnail.jpg",
    "tags": ["building", "epic", "montage"],
    "isPremium": false,
    "uploadDate": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `404`: Video clip not found
- `500`: Failed to fetch video clip

### Upload Video Clip
**POST** `/video-clips/upload`

Upload a new video clip. Requires authentication and admin privileges.

**Content-Type:** `multipart/form-data`

**Form Data:**
- `video`: Video file (max 500MB)
- `title`: Clip title
- `game`: Game name
- `mood`: Mood category
- `resolution` (optional): Video resolution (default: 1080p)
- `aspectRatio` (optional): Aspect ratio (default: 16:9)
- `tags`: JSON array of tags
- `isPremium` (optional): Premium status (default: false)

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "clip_id",
    "title": "New Clip",
    "game": "Minecraft",
    "mood": "Action",
    "url": "https://storage.example.com/clip.mp4",
    "isPremium": false
  },
  "message": "Video clip uploaded successfully"
}
```

**Error Responses:**
- `400`: Video file is required / Title, game, and mood are required
- `401`: Not authenticated
- `403`: Insufficient permissions
- `500`: Failed to upload video clip

### Delete Video Clip
**DELETE** `/video-clips/:id`

Delete a video clip. Requires authentication and admin privileges.

**Response (200):**
```json
{
  "success": true,
  "message": "Video clip deleted successfully"
}
```

**Error Responses:**
- `401`: Not authenticated
- `403`: Insufficient permissions
- `500`: Failed to delete video clip

---

## Real-Time Example: One User Flow

This is a practical example of how one creator uses the backend in real time.

### Scenario

One user named `Aman` opens the app and wants to create a YouTube video about `How to start a faceless YouTube channel`.

### Step 1: Register

**POST** `/auth/register`

```json
{
  "email": "aman@example.com",
  "password": "password123",
  "name": "Aman"
}
```

The backend:
- creates the user
- creates a `FREE` subscription
- returns a JWT token

### Step 2: Load user profile

**GET** `/auth/me`

Header:
```text
Authorization: Bearer <jwt_token>
```

The frontend uses this to show:
- user's name
- current subscription plan
- number of scripts generated
- number of exported videos

### Step 3: Generate a script

**POST** `/scripts/generate`

```json
{
  "topic": "How to start a faceless YouTube channel",
  "tone": "Educational",
  "duration": "5min",
  "audience": "Beginners",
  "format": "YouTube",
  "model": "gpt-4o"
}
```

The backend:
- validates `topic`, `model`, and `format`
- builds an AI prompt
- sends the prompt to OpenRouter
- parses the AI response into scenes
- saves the script in the database
- increases the user's script count

Result:
- Aman gets a saved script with scene data
- the frontend stores `scriptId` for the next step

### Step 4: Browse public video clips

**GET** `/video-clips/search?game=Minecraft&mood=Action&aspectRatio=16:9`

This endpoint is public, so login is not required for browsing.

The backend returns matching clips that Aman can choose for the final video.

### Step 5: Create the video project

**POST** `/videos`

```json
{
  "title": "How to Start a Faceless YouTube Channel",
  "description": "Beginner guide for starting a faceless content business",
  "format": "16:9",
  "resolution": "1080p",
  "scriptId": "script_id_from_step_3",
  "selectedClips": ["clip_1", "clip_2"],
  "voiceoverStyle": "male-energetic",
  "exportSettings": {
    "quality": "high",
    "format": "mp4"
  }
}
```

The backend:
- verifies the authenticated user
- creates a video record
- sets status to `processing`
- starts background processing

At this point, Aman sees something like `Video creation started. Processing in background.`

### Step 6: Check video status

**GET** `/videos`

or

**GET** `/videos/:id`

The frontend can poll this endpoint every few seconds to check whether the video status changes from:
- `processing`
- to `ready`
- or `failed`

When ready, the backend may return:
- `filePath`
- `thumbnailPath`
- `subtitlesPath`

### Step 7: Export the video

**POST** `/videos/:id/export`

This requires `STARTER` plan or higher.

The backend:
- checks that the video belongs to Aman
- checks subscription access
- queues the export job

### Step 8: Publish to YouTube

**POST** `/videos/:id/publish`

This requires `CREATOR` plan or higher.

The backend:
- verifies ownership
- checks that the video is fully rendered
- publishes the video
- stores `youtubeVideoId` and `youtubeUrl`

### What this backend is doing for one user

For a single user, this backend handles:
- authentication with JWT
- per-user script storage
- per-user video storage
- ownership checks on protected resources
- AI script generation through OpenRouter
- public clip browsing
- background video processing
- subscription-based feature access

In short, one person can register, generate a script, create a video, wait for processing, export it, and publish it using this backend alone.

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Rate Limiting

- AI script generation: Limited per user based on subscription plan
- General API endpoints: 1000 requests per hour per user

## Subscription Plans

- **FREE**: Basic features, limited AI generations
- **STARTER**: Video export capability, more AI generations
- **CREATOR**: YouTube publishing, advanced features
- **PRO**: Unlimited usage, priority support

## Data Models

### User
```json
{
  "id": "string",
  "email": "string",
  "password": "string (hashed)",
  "name": "string",
  "avatarUrl": "string",
  "emailVerified": "DateTime",
  "createdAt": "DateTime",
  "updatedAt": "DateTime",
  "scriptsGenerated": "number",
  "videosExported": "number"
}
```

### Script
```json
{
  "id": "string",
  "userId": "string",
  "projectId": "string",
  "title": "string",
  "topic": "string",
  "content": "string",
  "tone": "string",
  "duration": "string",
  "audience": "string",
  "format": "string",
  "aiModel": "string",
  "status": "string",
  "scenes": "JSON array",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### Video
```json
{
  "id": "string",
  "userId": "string",
  "projectId": "string",
  "scriptId": "string",
  "title": "string",
  "description": "string",
  "format": "string",
  "resolution": "string",
  "status": "string",
  "youtubeVideoId": "string",
  "youtubeUrl": "string",
  "publishedAt": "DateTime",
  "duration": "number",
  "filePath": "string",
  "thumbnailPath": "string",
  "subtitlesPath": "string",
  "voiceoverStyle": "string",
  "selectedClips": "JSON array",
  "exportSettings": "JSON object",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

### VideoClip
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "game": "string",
  "mood": "string",
  "duration": "number",
  "resolution": "string",
  "aspectRatio": "string",
  "url": "string",
  "thumbnailUrl": "string",
  "tags": "string (JSON array)",
  "isPremium": "boolean",
  "uploadDate": "DateTime"
}
```

---

## Support

For API support or questions, please contact the development team.
