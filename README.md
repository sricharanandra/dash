# Dash - Full-Stack Task Management App

A secure, scalable task management application with JWT authentication, built with React, Express, and PostgreSQL.

## Features

- **User Authentication** - Secure signup/login with JWT
- **Protected Routes** - Dashboard accessible only when logged in
- **Task Management** - Full CRUD operations stored in PostgreSQL
- **Real-time Search** - Instantly filter tasks by title
- **Category Filters** - Organize by Important, General, or Finish by Today
- **User Isolation** - Each user sees only their own tasks
- **Secure Password Storage** - bcrypt hashing with salt
- **Form Validation** - Client and server-side validation
- **Modern UI** - TailwindCSS dark theme

## Quick Start

### Prerequisites
- Node.js installed
- PostgreSQL installed and running
- Database `sreus` exists with tables created (see `server/config/database.sql`)

### Step 1: Start Backend
```bash
cd server
npm install
node server.js
```

**Expected output:**
```
Server running on port 5000
Database connected
```

### Step 2: Start Frontend (New Terminal)
```bash
npm install
npm run dev
```

**Expected output:**
```
Local:   http://localhost:5173/
```

### Step 3: Open App
Visit: **http://localhost:5173**

## First Time Setup

1. Click **"Sign Up"** button
2. Fill in your details:
   - Name: Your Name
   - Email: you@example.com
   - Password: Test@1234 (must include uppercase, lowercase, number, special char)
   - Confirm Password: Test@1234
3. Click **"Sign Up"**
4. Auto-redirects to login page
5. **Login** with your credentials
6. Start using the dashboard!

## What You Can Do

### Dashboard (`/`)
- View your profile
- Access navigation
- Logout from dropdown menu

### Tasks (`/tasks`)
- **Create**: Type task and press Enter
- **Read**: All your tasks load automatically
- **Delete**: Click trash icon
- **Search**: Type in search box for real-time filtering
- **Filter**: Click category buttons (Important, General, Finish by Today)

## � Security Features

- Password hashing with bcrypt (10 rounds)
- JWT tokens with 24-hour expiration
- Protected API endpoints
- Input validation (client + server)
- CORS configuration
- SQL injection prevention
- XSS protection

## Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.23.1
- TailwindCSS 3.4.0
- Axios
- Vite 5.2.0

### Backend
- Node.js with Express 4.18.2
- PostgreSQL with pg 8.11.3
- JWT (jsonwebtoken)
- bcryptjs for password hashing
- express-validator
- CORS

## Project Structure

```
dash/
├── server/              # Backend (Express + PostgreSQL)
│   ├── config/         # Database configuration
│   ├── middleware/     # Auth & validation
│   ├── routes/         # API endpoints
│   └── server.js       # Main server file
├── src/                # Frontend (React)
│   ├── components/     # React components
│   ├── contexts/       # Auth context
│   ├── services/       # API services
│   └── App.jsx         # Main app component
├── DEPLOYMENT.md       # Production deployment guide
├── API_TESTING.md      # API testing documentation
└── PROJECT_SUMMARY.md  # Complete feature list
```

## Testing

See `TESTING.md` for comprehensive testing guide.

**Quick Test:**
```bash
# Test API health
curl http://localhost:5000/api/health

# Should return: {"status":"OK",...}
```

## Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password_hash
- name
- created_at
- updated_at

### Tasks Table
- id (Primary Key)
- user_id (Foreign Key → users.id)
- title
- category (Important | General | Finish by Today)
- completed
- created_at
- updated_at

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### User Profile
- `GET /api/user/profile` - Get user profile (Protected)
- `PUT /api/user/profile` - Update profile (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks (Protected)
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

## Deployment

See `DEPLOYMENT.md` for complete production deployment guide to Oracle instance at tasks.sreus.tech.

**Key Steps:**
1. Set production environment variables
2. Generate strong JWT secret
3. Configure Nginx reverse proxy
4. Get SSL certificate
5. Use PM2 for process management
6. Build frontend: `npm run build`

## Troubleshooting

### Backend won't start
```bash
# Check PostgreSQL is running
psql -U sreus -d sreus -c "SELECT NOW();"
```

### "Cannot connect to server"
- Ensure backend is running on port 5000
- Check `server/.env` has correct database credentials

### Tasks not loading
- Open browser DevTools (F12)
- Check Console for errors
- Verify token exists in Application → Local Storage

### Redirecting to login constantly
- Token may be expired
- Clear localStorage and login again

## License

This project is open source.

## Contributing

Contributions welcome! See the repository for details.

## Support

For issues:
- Check `TESTING.md` for testing guide
- Check `API_TESTING.md` for API documentation
- Check `DEPLOYMENT.md` for deployment guide

---

**Built with care for developers who value productivity and security.**

   ```bash
   npm install
   ```
4. **Run the Application**:
   ```bash
   npm run dev
   ```
5. **Open Dash in Your Browser**: Navigate to `http://localhost:5173` to start using Dash.

## How to Contribute

We welcome contributions from developers of all levels. To contribute to Dash:

1. **Fork the Repository** on GitHub.
2. **Follow the same steps given above**
3. **To add a feature**:
   ```bash
   git checkout -b feat/your-feature
   ```
   **To fix bugs**
   ```bash
    git checkout -b bug/your-bug
   ```
4. **Commit Your Changes**:
   ```bash
   git commit -m "your work description"
   ```
5. **Push to Your Branch**:
   ```bash
   git push origin branch-name
   ```
6. **Create a Pull Request** on GitHub.

## License

Dash is licensed under the MIT License. See the [LICENSE](https://github.com/sricharanandra/dash/blob/main/LICENSE) file for more details.

## Get in Touch

Have questions or need support? Reach out to us:

- **GitHub Issues**: [Open an Issue](https://github.com/sricharanandra/dash/issues)

---

Elevate your development workflow with dash and experience a new level of efficiency. Ready to take the leap? Start using dash today!

---

_Made with care_
