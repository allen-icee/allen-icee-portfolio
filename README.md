# Allen Icee Dequiros - Developer Portfolio & Digital Art Gallery

Welcome to the source code for my personal developer portfolio! 

This is a highly optimized, fully custom-built web application designed to showcase my journey as a software engineer, UI/UX designer, and digital artist. 

🔗 **Live Website:** [https://allen-icee.vercel.app](https://allen-icee.vercel.app)

---

## ✨ Features

- 🎨 **Interactive Art Gallery:** A dynamic, randomized gallery featuring my digital artwork. It includes a custom weighted-shuffling algorithm to subliminally feature specific pieces and custom CSS glass-pane overlays.
- 🖥️ **Virtual Desk Environment:** A creative, interactive "Desk" experience for the About section, featuring clickable items with subtle micro-animations and sound design.
- 🔐 **Custom CMS (Admin Dashboard):** A fully authenticated, private admin panel built directly into the site. It allows me to effortlessly add, edit, or delete Projects, Artworks, and Certificates on the fly without ever touching the source code.
- 🖼️ **Automated Image Optimization:** The admin dashboard includes built-in client-side image compression, instantly shrinking 15MB+ original master artworks down to highly optimized WebP formats before uploading them to the database.
- 🛡️ **Enterprise Security:** The backend is completely locked down using Google reCAPTCHA v3, Firebase App Check, and strict Firestore Security Rules. Only authorized domains can access the database, and only the admin account can write to it.
- ⚡ **Extremely Fast:** Built on Vite, utilizing `framer-motion` for buttery smooth 60fps animations and lazy-loading for heavy assets.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Vanilla CSS Customizations
- **Animations:** Framer Motion
- **Backend/Database:** Firebase (Firestore, Firebase Storage, Firebase Auth)
- **Security:** Firebase App Check & reCAPTCHA v3
- **Image Compression:** `browser-image-compression`
- **Deployment:** Vercel

## 🚀 Getting Started (Local Development)

If you'd like to clone and run this project locally, you will need to set up your own Firebase instance.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/allen-icee/allen-icee-portfolio.git
   cd allen-icee-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   VITE_RECAPTCHA_SITE_KEY="your-recaptcha-key"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 📄 License
This project is for personal portfolio use. If you would like to use portions of the code, feel free, but please do not copy the personal branding, digital artwork, or content.
