# AI Resume Builder 🚀

An end-to-end **AI-powered Resume Builder** web application that allows users to create, manage, preview, and download professional resumes as PDFs. The project includes secure authentication, structured resume sections, AI-assisted summary generation, and PDF rendering using Puppeteer.

This repository represents the **backend + server-rendered frontend** built with **Node.js, Express, MySQL, EJS**, and **Google Generative AI**.

---

## ✨ Features

### 🔐 Authentication & Security

* User authentication with **Email & Password**
* Password hashing using **bcrypt**
* **JWT-based authentication**
* OAuth login with:

  * Google
  * GitHub
* Secure cookies and middleware-based route protection

### 📄 Resume Management

* Create and manage multiple resumes
* Structured resume sections:

  * Resume Title
  * Personal Details
  * Education
  * Work Experience
  * Skills
  * Professional Summary
* Delete resume functionality

### 🤖 AI-Powered Summary

* Generates professional resume summaries using **Google Generative AI (`@google/genai`)**
* Helps users quickly create impactful summaries

### 👀 Resume Preview

* Live resume preview rendered using **EJS templates**
* Clean and professional resume layout

### 📥 PDF Generation

* Generate downloadable **PDF resumes** using **Puppeteer**
* Server-side rendering for consistent formatting

### 🗄️ Database

* **MySQL** database integration
* Normalized schema for resume sections
* SQL script included for easy setup

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MySQL (`mysql2`)
* JWT (jsonwebtoken)
* Passport.js (Google & GitHub OAuth)
* Joi (validation)
* bcrypt (password hashing)

### Frontend (Server-side Rendered)

* EJS
* HTML / CSS
* Static assets via Express

### AI & Utilities

* Google Generative AI (`@google/genai`)
* Puppeteer (PDF generation)
* dotenv

---

## 📁 Project Structure

```
AI Resume/
│
├── api/
│   ├── server.js              # Main server entry point
│   ├── package.json
│   ├── constants.js           # App constants (PORT, etc.)
│   ├── middleware.js          # Auth middleware
│   ├── passport-config.js     # OAuth configuration
│   ├── Routes/                # All API & page routes
│   │   ├── home.js
│   │   ├── signUp.js
│   │   ├── signin.js
│   │   ├── logout.js
│   │   ├── resumeTitle.js
│   │   ├── personalDetails.js
│   │   ├── education.js
│   │   ├── workExperience.js
│   │   ├── skills.js
│   │   ├── summary.js
│   │   ├── preview.js
│   │   ├── generatePDF.js
│   │   └── deleteResume.js
│   │
│   ├── views/                 # EJS templates
│   ├── public/                # Static assets
│   ├── schema/                # DB schema helpers
│   ├── mySqldb/               # DB connection logic
│   ├── script.sql             # Database setup script
│   ├── resume.pdf             # Sample generated PDF
│   └── .env                   # Environment variables
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/furqi-code/ai-resume-builder.git
cd ai-resume-builder/api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file inside the `api` folder:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ai_resume
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_GENAI_API_KEY=your_genai_key
```

---



## ▶️ Running the Application

```bash
npm start
```

Server will start at:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

* Local authentication using email & password
* OAuth handled via Passport.js
* JWT stored in cookies
* Protected routes secured using custom middleware

---

## 📄 PDF Generation Flow

1. User previews resume
2. Server renders resume using EJS
3. Puppeteer converts HTML to PDF
4. PDF is sent to the client for download

---

## 🤖 AI Summary Generation

* Uses Google Generative AI
* Input: user details + experience
* Output: professional resume summary
* Improves resume quality and saves time

---

## 🚀 Future Improvements

* Frontend SPA using React
* Resume templates selection
* Drag & drop section ordering
* Multi-language resume support
* Export to DOCX
* Resume scoring with AI feedback

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---


## 👤 Author

**Md Furqan Ahmad**

If you found this project helpful, give it a ⭐ on GitHub!
