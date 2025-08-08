# 🏫 UniHub.org

**UniHub** is a comprehensive university resource-sharing platform built using **Node.js**, **Express**, **MongoDB**, and **EJS**. It provides students with a centralized platform for academic resources, events, placement opportunities, and campus discussions.

---

## 🚀 Features

### 📚 **Study Module**
- Upload and share study notes and PYQs
- Subject-wise and semester-wise organization
- File upload support (PDF, DOC, DOCX, TXT)
- Search and filter functionality

### 📅 **Events Module**
- Create and view college events
- Event details with venue, time, and organizer info
- Event attendance tracking

### 💼 **Placement Module**
- Browse companies and job opportunities
- Internship listings with details
- Hackathon announcements and registrations
- Placement statistics and trends

### 💬 **Campus Talk Module**
- Semester-wise discussion rooms
- Real-time messaging (planned)
- General campus discussions
- Events and activities chat

### 🔐 **Authentication System**
- Secure user registration and login
- JWT-based authentication
- Protected routes with middleware
- User profile management

---

## 🏗️ Project Structure

```
UniHuB/
├── 📄 Core Files
│   ├── app.js                    # Main Express server
│   ├── .env                      # Environment variables
│   ├── package.json              # Dependencies & scripts
│   └── README.md                 # Project documentation
│
├── 🛣️ Routes (API Endpoints)
│   ├── authRoutes.js             # Authentication routes
│   ├── homeRoute.js              # Homepage routes
│   ├── studyRoutes.js            # Study module routes
│   ├── eventsRoutes.js           # Events module routes
│   ├── placementRoutes.js        # Placement module routes
│   └── talkRoutes.js             # Campus talk routes
│
├── 🎮 Controllers (Business Logic)
│   ├── authController.js         # User authentication
│   ├── homeController.js         # Homepage logic
│   ├── studyController.js        # Notes & PYQ management
│   ├── eventController.js        # Event management
│   ├── placementController.js    # Placement data
│   └── talkController.js         # Chat room logic
│
├── 🗄️ Models (Database Schema)
│   ├── User.js                   # User model
│   ├── Note.js                   # Study notes
│   ├── PYQ.js                    # Previous year questions
│   ├── Event.js                  # College events
│   ├── Announcement.js           # Announcements
│   └── Room.js                   # Chat rooms
│
├── 🎨 Views (EJS Templates)
│   ├── dashboard.ejs             # Main dashboard
│   ├── auth/                     # Login & Register
│   │   ├── login.ejs
│   │   └── signup.ejs
│   ├── partials/                 # Shared components
│   │   └── navbar.ejs
│   └── menue/                    # Module pages
│       ├── study/
│       │   ├── upload_note.ejs
│       │   ├── view_notes.ejs
│       │   ├── upload_pyq.ejs
│       │   └── view_pyq.ejs
│       ├── events/
│       │   ├── view_events.ejs
│       │   └── create_event.ejs
│       ├── placement/
│       │   ├── placement_home.ejs
│       │   ├── companies.ejs
│       │   ├── internships.ejs
│       │   └── hackathons.ejs
│       └── talk/
│           ├── talk_home.ejs
│           ├── room_sem1.ejs
│           └── room_sem2.ejs
│
├── 🌐 Public (Static Files)
│   ├── css/
│   │   ├── dashboard.css         # Dashboard styles
│   │   ├── partials.css          # Navbar & shared styles
│   │   ├── auth.css              # Authentication styles
│   │   ├── study/                # Study module styles
│   │   ├── events/               # Events styles
│   │   ├── placement/            # Placement styles
│   │   └── talk/                 # Chat styles
│   ├── img/                      # Images and icons
│   └── uploads/                  # User uploaded files
│
└── 🧰 Utils
    └── authMiddleware.js         # Route protection
```

---

## ⚙️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine
- **Authentication**: JWT, bcryptjs
- **File Upload**: Multer
- **Styling**: CSS3 with modern design
- **Icons**: Font Awesome

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/pratyushvx/UniHuB.git
   cd UniHuB
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to: `http://localhost:5000`

---

## 📋 Available Routes

### Public Routes
- `/` - Homepage
- `/login` - User login
- `/register` - User registration
- `/placement/*` - Placement information (public)

### Protected Routes (Require Authentication)
- `/dashboard` - Main dashboard
- `/study/*` - Study module (notes & PYQs)
- `/events/*` - Events management
- `/talk/*` - Campus discussion rooms

---

## 🎯 Key Features by Module

### 📚 Study Module
- **Upload Notes**: Students can upload study materials
- **Upload PYQs**: Share previous year question papers
- **Search & Filter**: Find content by subject/semester
- **Download**: Access uploaded files

### 📅 Events Module
- **Create Events**: Organize college events
- **View Events**: Browse upcoming events
- **Event Details**: Venue, time, organizer info
- **Attendance**: Track event participation

### 💼 Placement Module
- **Companies**: Browse job opportunities
- **Internships**: Find internship positions
- **Hackathons**: Participate in coding competitions
- **Statistics**: View placement data

### 💬 Campus Talk Module
- **Discussion Rooms**: Semester-wise chat rooms
- **Real-time Chat**: Instant messaging (planned)
- **General Discussion**: Campus-wide conversations
- **Event Discussions**: Event-specific chats

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs for password security
- **Route Protection**: Middleware for protected routes
- **File Upload Security**: File type and size validation
- **Input Validation**: Server-side data validation

---

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean and intuitive design
- **Interactive Elements**: Hover effects and animations
- **Dashboard**: Centralized navigation
- **Module Cards**: Easy access to features

---

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pratyush Thakur**
- GitHub: [@pratyushvx](https://github.com/pratyushvx)


---

## 🙏 Acknowledgments

- Font Awesome for icons
- MongoDB for database
- Express.js community
- All contributors and users

---

## 📞 Support

For support, email support@unihub.org or create an issue in the repository.

---

**Made with ❤️ for the student community**
