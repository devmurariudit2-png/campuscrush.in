
# CampusCrush Backend

CampusCrush is a Hinge-inspired dating app for elite university students. Its philosophy is: **"Designed to actually get you a date on campus."**

## Tech Stack
- **Framework**: Node.js + Express.js
- **Database**: PostgreSQL (Neon)
- **Cache/Presence**: Redis (Upstash)
- **Real-time**: Socket.io
- **Authentication**: JWT + Refresh Tokens + Google OAuth
- **Storage**: Cloudflare R2
- **Deployment**: Railway

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Navigate to the backend directory: `cd campuscrush/backend`
3. Install dependencies: `npm install`
4. Copy the example environment file: `cp .env.example .env`
5. Fill in the required values in your new `.env` file. This will include credentials for your PostgreSQL database (Neon), Redis instance (Upstash), Google OAuth, Cloudflare R2, and JWT secrets.
6. Run database migrations (command TBD).
7. Seed the database with initial data: `npm run seed`
8. Start the development server: `npm run dev`

The server will be running on `http://localhost:PORT` (as defined in your `.env`).

## Scripts
- `npm run dev`: Starts the development server with hot-reloading (using `nodemon` or similar).
- `npm run build`: Compiles TypeScript to JavaScript for production.
- `npm run start`: Starts the production server.
- `npm run seed`: Seeds the database with test users, events, and other data.
- `npm run migrate`: (TBD) Applies database schema changes.

## API
For a full list of API endpoints, please refer to the project documentation. Key features include:
- Auth (`/auth`)
- Onboarding (`/onboarding`)
- Discovery Feed (`/feed`)
- Matching (`/crush`, `/matches`)
- Chat (`/chat`)
- Events (`/events`)
- and more...
