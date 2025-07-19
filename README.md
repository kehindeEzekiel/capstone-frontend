# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
# 🎬 Movie App Frontend

This is the frontend of the Movie Recommendation App, built with **React + Vite** and deployed on **Vercel**. It communicates with the Express backend and TMDB API to deliver a rich movie experience.

## 🌐 Live URL

Frontend deployed at: [https://capstone-frontend-two-lac.vercel.app/](#)

## 🚀 Features

- User authentication (JWT-based)
- Search movies by title, genre, or year
- Save favorites and create watchlists
- Rate and review movies
- Fully responsive UI
- Avatar dropdown with logout and profile
- Client-side routing using React Router

## 🛠️ Tech Stack

- React (Vite)
- React Router
- Axios
- CSS Modules or plain CSS (no Tailwind)
- Deployed on Vercel

## 🔧 Project Setup

```bash
cd client
npm install
npm run dev
```

## 🌍 Environment Variables

Create a `.env` file in the `/client` folder:

```env
VVITE_API_URL=https://your-backend.onrender.com/api

```

## 🔁 Deployment Notes (Vercel)

To prevent 404 on page refresh for client-side routes:

### ➕ Add `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## 🗂️ Folder Structure

```
/client
  ├── /components
  ├── /pages
  ├── /services
  ├── /assets
  ├── App.jsx
  ├── main.jsx
  ├── index.css
```

## 🙌 Author

**Kehinde Ezekiel**
