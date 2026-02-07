# PoetVerse - Where every whisper finds a home.

PoetVerse is a modern, aesthetic poetry-sharing platform built with React, Vite, Tailwind CSS (OKLCH), and Supabase.

## 🚀 Features
- **Modern OKLCH Design**: A premium, theme-aware interface with silk-smooth transitions.
- **Poem Composition**: Write and tag your verses with ease.
- **Personal Memories**: A dedicated profile to manage your published works.
- **Bento-style Exploration**: Discover curated poems in a beautiful, responsive grid.
- **Real-time Backend**: Powered by Supabase for authentication and database management.

## 🛠 Deployment Guide

### 1. Supabase Setup
- Create a new project on [Supabase](https://supabase.com).
- Run the provided `supabase_schema.sql` in the Supabase SQL Editor to set up the `profiles` and `poems` tables.
- Enable **Email Auth** in the Authentication settings.

### 2. Environment Variables
In your deployment platform (Vercel, Netlify, etc.), add the following Environment Variables:
- `VITE_SUPABASE_URL`: Your Supabase Project URL.
- `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon/Public Key.

### 3. Build & Deploy
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## 💻 Local Development
```bash
npm install
npm run dev
```

## ✨ Aesthetics
The project uses a custom **OKLCH Design System** defined in `src/index.css`. It features a curated palette of primary, accent, and semantic colors designed for ultimate visual comfort and premium feel.
