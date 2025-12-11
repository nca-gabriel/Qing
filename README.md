# Qing - Quiz App

A small quiz application built using Hono (backend) and Next.js + TailwindCSS (frontend).
Demonstrates end-to-end functionality with mock data, including multiple question types, grading, and frontend interaction.

## Quick Start

1. Clone the repository
```bash
git clone https://github.com/nca-gabriel/Qing.git
cd Qing
```
2. Backend (Hono API)
```bash
cd backend
npm install
npm run dev      # runs Hono API locally
```
API Routes

GET /api/quiz → returns mock quiz questions

POST /api/grade → accepts answers and returns scoring results


3. Frontend (Next.js + TailwindCSS)
```bash
cd frontend
npm install
npm run dev      # runs Next.js app locally on http://localhost:3000
```

4. Build & Deploy

Frontend: npm run build → deploy to Vercel

Backend: deploy Hono API to Cloudflare Workers

## Architecture Notes

Backend: Hono API (Edge runtime), deployed on Cloudflare Workers

Frontend: Next.js App Router + TailwindCSS

Communication: REST API endpoints for fetching quiz data and posting answers

Validation: Ensures payload shape, handles missing/invalid data, returns 400 when necessary

State Management: Simple React hooks (useState ), no external state library

## Validation Approach

Input types are validated using TypeScript interfaces for both questions and answers

Backend checks for missing or invalid fields in API requests

POST /api/grade returns a 400 status for malformed payloads

Ensures submitted values match the expected types (string, number, or array of numbers)

## Libraries Used and Rationale

Hono: Lightweight, Edge-compatible backend framework

Next.js: React framework with App Router for frontend routing and SSR/CSR support

TailwindCSS: Rapid, responsive UI styling

Axios: HTTP requests for fetching quiz data and posting answers

TypeScript: Type safety for interfaces, API contracts, and state management

## Trade-offs & Shortcuts Taken

Used mock data only, no database or persistence

Backend handles all grading; frontend does not

Backend shuffles questions and choices, and uses original data for scoring

Minimal custom state management; relied on React hooks

Timed quiz and additional bonus features not implemented

## Testing
Jest was used to test the grading logic (gradeAnswers function)

Example tests include:

Correct scoring for text, radio, and checkbox questions

Handling of incorrect answers

Checking shuffle logic

## Honest Time Spent

~7 hours developing, testing, and deploying both frontend and backend

