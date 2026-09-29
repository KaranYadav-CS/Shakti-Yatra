# Shakti Yatra — Run Guide & Social Media Sharing Manual
### Developed by Karan Yadav
**Sanctum 1: Maa Vindhyavasini Dham, Vindhyachal (UP)**

---

## 🌐 Current Active Live Links

Your website is **LIVE right now**! You can access it on your computer and share it immediately across the globe:

| Type | Link | Description |
| :--- | :--- | :--- |
| 🐙 **Official GitHub Repository** | [https://github.com/KaranYadav-CS/Shakti-Yatra](https://github.com/KaranYadav-CS/Shakti-Yatra) | **Your public GitHub repository with full source code & documentation** |
| 🌍 **Public Social Media Link** | [https://buzz-cnet-stand-vacation.trycloudflare.com](https://buzz-cnet-stand-vacation.trycloudflare.com) | **Share this link on WhatsApp, Instagram, Facebook, LinkedIn, Twitter! Works globally on mobile & PC!** |
| 💻 **Localhost Home** | [http://localhost:3000](http://localhost:3000) | Local high-speed address on your machine |
| 📜 **History of Maa Vindhyavasini** | [http://localhost:3000/history](http://localhost:3000/history) | Dedicated module with scriptural history, Utpatti, Ramayana & Gita connections |
| 🗺️ **Vindhyachal Guide** | [http://localhost:3000/destinations/vindhyachal](http://localhost:3000/destinations/vindhyachal) | Complete Trikona Yatra & Aarti timings |
| ⚙️ **Backend REST API Docs** | [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) | Interactive Swagger documentation |

---

## 📁 1-Click Run Files in `sakti yatra` Folder

All launcher files have been created directly in your `c:\Desktop\sakti yatra` directory for instant access:

### 1. `START_SHAKTI_YATRA.bat` ⭐ (Recommended)
- **What it does:** Starts the FastAPI backend, starts the Next.js production frontend, automatically opens your browser to `http://localhost:3000`, and gives you the option to launch the public online link for social media.
- **How to use:** Simply **double-click** `START_SHAKTI_YATRA.bat`.

### 2. `SHARE_ONLINE_PUBLIC_LINK.bat` 📲
- **What it does:** Connects your local website to Cloudflare's global edge network and provides a secure, public `https://...trycloudflare.com` link.
- **How to use:** Double-click this file whenever you want to share your live website with friends, family, or social media followers without hosting fees.

### 3. `STOP_SHAKTI_YATRA.bat` 🛑
- **What it does:** Cleanly terminates all backend, frontend, and tunnel processes on ports 8000 and 3000 with zero leftover processes.
- **How to use:** Double-click when you are finished using or demonstrating the platform.

### 4. `START_BACKEND.bat` & `START_FRONTEND.bat`
- Individual launchers if you ever wish to start only the backend API or only the frontend independently.

---

## 📱 Sample Social Media Share Post

You can copy and paste this message on **WhatsApp, LinkedIn, Instagram Bio, or Facebook**:

> 🙏 **Excited to share my project — "Shakti Yatra"!**  
> An intelligent, accessible full-stack pilgrimage assistance platform designed for holy shrines, starting with **Maa Vindhyavasini Dham, Vindhyachal (UP)**.  
> 
> ✨ **Key Features:**  
> • 3D Sacred Darshan Gallery & Welcome Aarti Chants  
> • Full Scriptural History of Maa Vindhyavasini & Vindhya Parvat Utpatti (Ramayana, Gita & Markandeya Purana)  
> • Google Maps & Neighbor Location / Hotel Finder  
> • Verified Aarti schedules and accessible Trikona Yatra guidance  
> 
> 🔗 **Explore the live platform here:**  
> https://branches-apache-anime-buying.trycloudflare.com  
> 
> *Designed & Developed by Karan Yadav*

---

## ☁️ Permanent Free Cloud Hosting (Optional Future Step)

If you ever want a permanent 24/7 URL like `https://shakti-yatra.vercel.app` (which stays online even when your PC is turned off):

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Shakti Yatra by Karan Yadav"
   git branch -M main
   # Push to your GitHub account
   ```
2. **Deploy Frontend on Vercel (100% Free):**
   - Go to [vercel.com](https://vercel.com) $\rightarrow$ Import your `sakti yatra/frontend` repo $\rightarrow$ Click **Deploy**.
   - Your site will permanently be live at `https://your-name-shakti-yatra.vercel.app`!
3. **Deploy Backend on Render / Railway / Supabase (Free tier):**
   - Import `sakti yatra/backend` on [render.com](https://render.com) as a Python Web Service.
