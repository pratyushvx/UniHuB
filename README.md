# 🏫 UniHub.org

**UniHub** is a university resource-sharing platform built using **Node.js**, **Express**, **MongoDB**, and **EJS**.  
It allows students to upload and access academic content such as notes and previous year question papers (PYQs), and provides a secure login system with routes for authenticated and public content.

---

## 📁 Project Structure

uniHub.org/
├── routes/
│ ├── authRoutes.js
│ ├── homeRoute.js
│ └── contentRoute.js
├── views/
│ └── (EJS templates)
├── .env
├── app.js
└── package.json

yaml
Copy
Edit

---

## 🚀 Features

- 📝 Upload and share notes and PYQs  
- 🔐 Authentication system (Login/Register)  
- 🏠 Public homepage and dashboard  
- 🗂️ Content routes under `/unihub`  
- 🌐 Templating using EJS  
- 💾 MongoDB integration  

---

## ⚙️ Technologies Used

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- EJS (Embedded JavaScript templates)  
- dotenv (for environment configuration)  

---

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pratyushvx/UniHuB.git
   cd UniHuB
Install dependencies

bash
Copy
Edit
npm install
Create a .env file in the root directory and add the following:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
Start the development server

bash
Copy
Edit
node app.js
The app will run at: http://localhost:5000

📌 Available Routes
Route	Description
/	Home route
/login	Login page
/register	Registration page
/unihub	Main dashboard/content route

All routes are defined in the routes/ folder.

🙌 Contributing
Contributions are welcome!
Feel free to fork the repo, make changes, and submit a pull request.

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Pratyush Thakur
🔗 GitHub - @pratyushvx

diff
Copy
Edit

Let me know if you want:
- A badge for technologies (e.g. Node, Express)
- GIF or screenshot embed support
- Deployment guide for Render/Vercel

I can add it all neatly.








Ask ChatGPT



Tools



ChatG
