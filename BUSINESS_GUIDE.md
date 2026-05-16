# Whimsical Presents Business Guide

This guide is your go-to source for running, maintaining, and growing the Whimsical Presents business. It covers project setup, blogging, and key operational procedures.

---

## 1. Project Setup

### Backend (API)
- Go to the `backend` folder.
- Copy `.env.example` to `.env` and fill in your environment variables (MongoDB URI, JWT secret, etc).
- Install dependencies: `npm install`
- Start the server: `npm run dev`

### Frontend (Client)
- Go to the `frontend` folder.
- Create a `.env` file and set `VITE_API_URL` to your backend API URL.
- Install dependencies: `npm install`
- Start the dev server: `npm run dev`
- Make sure you have all required images in `frontend/public/images/`.

---

## 2. Blogging (Content Management)

### How to Add a Blog Article
- Blog articles are currently mocked in the code (see `MOCK_ARTICLES` in `Home.jsx`).
- To add real blogging:
  1. Create a backend model for articles (title, excerpt, content, category, image, createdAt).
  2. Add API endpoints for CRUD operations (create, read, update, delete articles).
  3. Build frontend pages/components for listing and displaying articles.
  4. (Optional) Add a markdown editor for writing posts.
- For now, update the `MOCK_ARTICLES` array in `frontend/src/pages/home/Home.jsx` to add or edit blog content.

---

## 3. Image & Asset Management
- Store all hero and article images in `frontend/public/images/`.
- Use descriptive filenames (e.g., `hero1.jpg`, `article1.jpg`).
- Reference images in code as `/images/filename.jpg`.

---

## 4. Environment Variables
- Backend: see `backend/.env.example` for required variables.
- Frontend: set `VITE_API_URL` in `frontend/.env`.

---

## 5. Deployment
- Deploy backend to a Node.js host (e.g., Heroku, Render, DigitalOcean).
- Deploy frontend to a static host (e.g., Vercel, Netlify) and set the API URL accordingly.
- Set environment variables in your deployment platform.

---

## 6. Admin & Operations
- Use the admin dashboard (if implemented) to manage products, orders, and users.
- For manual DB changes, use MongoDB Atlas or your local MongoDB client.
- Regularly back up your database and codebase.

---

## 7. Support & Growth
- Keep documentation up to date as you add features.
- Use the TODO.md file to track improvements and ideas.
- For help, check the README files or contact your developer.

---

## 8. Quick Reference
- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm run dev`
- Add blog: Edit `MOCK_ARTICLES` in `Home.jsx` or implement a real blog system.
- Add images: Place in `frontend/public/images/`

---

Keep this file updated as your business grows!
