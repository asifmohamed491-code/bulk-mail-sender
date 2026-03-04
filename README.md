# BulkMail - Bulk Email Sender

BulkMail is a simple full-stack web application that allows users to send emails to multiple recipients at once. The application takes an email message and a list of email addresses and sends the message to all recipients.

## 🚀 Features

* Send bulk emails to multiple recipients
* Upload email list file
* Custom email message
* Simple and clean UI
* Backend email processing using Node.js
* MongoDB for storing credentials

## 🛠️ Tech Stack

**Frontend**

* React
* Vite
* Tailwind CSS
* Axios

**Backend**

* Node.js
* Express.js
* Nodemailer
* MongoDB (Mongoose)

## 📁 Project Structure

```
BulkMail/
│
├── frontend/        # React Frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend/         # Node.js Backend
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```
git clone https://github.com/your-username/bulkmail.git
```

### 2. Install dependencies

Frontend

```
cd frontend
npm install
npm run dev
```

Backend

```
cd backend
npm install
node index.js
```

## 🔐 Environment Variables

Create a `.env` file inside the backend folder:

```
MONGO_URL=your_mongodb_connection_string
```

## 📬 Email Sending

BulkMail uses **Nodemailer with Gmail SMTP** to send emails.

You must use a **Gmail App Password** for authentication.

## 📌 Future Improvements

* Drag & Drop email upload
* Email send progress tracking
* Better error handling
* Email templates
* Dashboard UI

## 👨‍💻 Author

Mohamed Asif

## 📄 License

This project is open source and free to use.
