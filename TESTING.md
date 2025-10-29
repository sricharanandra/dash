# Local Testing Guide

## Prerequisites Checklist

Before testing, ensure all services are running:

1. **PostgreSQL Database**
   - Database `sreus` exists
   - Tables created (users, tasks)
   - Running on port 5432

2. **Backend API Server**
   - Located in `/server` directory
   - Dependencies installed (`npm install`)
   - `.env` file configured
   - Running on port 5000

3. **Frontend Vite Server**
   - Dependencies installed (`npm install`)
   - Running on port 5173

---

## Start All Services

### Terminal 1: Start Backend
```bash
cd /home/sreus/lab/story-mode/dash/server
node server.js
```

**Expected Output:**
```
Server running on port 5000
Environment: development
Frontend URL: http://localhost:5173
Connected to PostgreSQL database
Database connected at: 2025-10-29T...
```

### Terminal 2: Start Frontend
```bash
cd /home/sreus/lab/story-mode/dash
npm run dev
```

**Expected Output:**
```
VITE v5.2.12  ready in XXX ms
Local:   http://localhost:5173/
```

---

## Complete User Flow Testing

### Test 1: Landing Page
1. Open browser: `http://localhost:5173`
2. Should see landing page with "dash" header
3. Should see "Login" and "Sign Up" buttons
4. Click "Get Started Free" → redirects to `/signup`

### Test 2: User Registration
1. Click "Sign Up" button
2. Fill in the form:
   - **Name**: Test User
   - **Email**: test@example.com
   - **Password**: Test@1234
   - **Confirm Password**: Test@1234
3. Click "Sign Up"
4. Should see success message
5. Auto-redirect to `/login` after 2 seconds

**Validation Tests:**
- Try weak password → Should show error
- Try mismatched passwords → Should show error
- Try invalid email → Should show error
- Try short name → Should show error

### Test 3: User Login
1. Go to `/login` or click "Sign in"
2. Enter credentials:
   - **Email**: test@example.com
   - **Password**: Test@1234
3. Click "Sign In"
4. Should redirect to `/` (dashboard home)

**Should NOT Work:**
- Wrong password → Shows error
- Non-existent email → Shows error
- Empty fields → Shows validation errors

### Test 4: Protected Routes
1. After login, try accessing:
   - `http://localhost:5173/` → Works (Home)
   - `http://localhost:5173/tasks` → Works (Tasks)
2. Logout (click user avatar → Logout)
3. Try accessing same URLs → Redirects to `/login`

### Test 5: Dashboard - Home Page
1. After login, you're at `/`
2. Should see:
   - Header with "dash" title
   - User avatar with first letter of name
   - "Welcome" message
   - Bottom navigation bar
3. Click user avatar dropdown:
   - Shows email address
   - Shows "Logout" button

### Test 6: Dashboard - Tasks (CRUD Operations)

#### Create Task
1. Click Tasks icon in bottom nav
2. Select category: "Important"
3. Type task: "Complete assignment"
4. Press Enter or click + icon
5. Task appears in list immediately
6. **Backend Check**: Task saved to PostgreSQL

#### Read Tasks
1. Tasks load automatically from database
2. Only YOUR tasks appear (user-specific)
3. Tasks grouped by category

#### Filter by Category
1. Click "General" button
2. Only "General" tasks appear
3. Click "Finish by Today"
4. Only "Finish by Today" tasks appear

#### Search Tasks
1. Type in search box: "assignment"
2. Only matching tasks appear
3. Clear search → all tasks reappear

#### Delete Task
1. Click trash icon next to task
2. Task disappears immediately
3. **Backend Check**: Task deleted from PostgreSQL

### Test 7: Multi-Device / Multi-Session
1. **Browser 1**: Login as test@example.com
2. Add task: "Task from Browser 1"
3. **Browser 2** (Incognito): Login as test@example.com
4. Refresh tasks → Should see "Task from Browser 1"
5. Add task: "Task from Browser 2"
6. **Browser 1**: Refresh → Should see both tasks
7. This proves tasks are in database, NOT localStorage

### Test 8: Logout
1. Click user avatar in header
2. Click "Logout"
3. Should redirect to `/login`
4. Try accessing `/tasks` → Redirects to `/login`
5. Token removed from localStorage

### Test 9: Session Persistence
1. Login to app
2. Close browser tab
3. Open new tab: `http://localhost:5173`
4. Should still be logged in (token persists)
5. Can access dashboard without re-login

### Test 10: Token Expiration
1. Login to app
2. Wait 24 hours (or manually delete token in DevTools)
3. Try to access `/tasks`
4. Should auto-redirect to `/login`
5. Shows "Invalid or expired token" if token manipulated

---

## Quick Debugging

### Issue: "Cannot connect to server"
**Fix:**
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Should return: {"status":"OK",...}
```

### Issue: "Database connection failed"
**Fix:**
```bash
# Test PostgreSQL connection
psql -U sreus -d sreus -c "SELECT NOW();"
```

### Issue: "Tasks not loading"
**Fix:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try adding a task
4. Check for API calls to `http://localhost:5000/api/tasks`
5. Look for errors in Console tab

### Issue: "Redirecting to login constantly"
**Fix:**
1. Open DevTools → Application → Local Storage
2. Check if `token` exists
3. If not, login again
4. If exists but still redirecting, token might be invalid

### Issue: "CORS errors"
**Fix:**
1. Backend `.env` should have: `FRONTEND_URL=http://localhost:5173`
2. Restart backend server

---

## Database Verification

### Check Users Table
```bash
psql -U sreus -d sreus -c "SELECT id, email, name, created_at FROM users;"
```

### Check Tasks Table
```bash
psql -U sreus -d sreus -c "SELECT id, user_id, title, category, completed, created_at FROM tasks;"
```

### Verify User-Task Relationship
```bash
psql -U sreus -d sreus -c "
SELECT u.name, u.email, t.title, t.category 
FROM users u 
JOIN tasks t ON u.id = t.user_id;
"
```

---

## Assignment Requirements Verification

### Frontend
- [x] React.js with routing
- [x] TailwindCSS styling
- [x] Form validation (client-side)
- [x] Protected routes (login required)
- [x] Login/Signup UI

### Backend
- [x] Node.js/Express server
- [x] JWT authentication
- [x] PostgreSQL database
- [x] Password hashing (bcrypt)
- [x] User signup/login APIs
- [x] Profile fetch/update APIs
- [x] Task CRUD APIs
- [x] Server-side validation

### Dashboard
- [x] User profile display
- [x] CRUD on tasks (connected to database)
- [x] Search functionality
- [x] Filter by category
- [x] Logout flow

### Security
- [x] Passwords hashed with bcrypt
- [x] JWT tokens with expiration
- [x] Protected API endpoints
- [x] Input validation (client + server)
- [x] CORS configured
- [x] Secure token storage

---

## Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| Visit `/` without login | Redirect to `/login` |
| Visit `/landing` | Show landing page |
| Signup with valid data | Account created, redirect to login |
| Signup with weak password | Show validation error |
| Login with correct credentials | Redirect to dashboard |
| Login with wrong password | Show error |
| Access `/tasks` while logged in | Show tasks page |
| Add task | Task appears + saved to DB |
| Delete task | Task removed + deleted from DB |
| Search tasks | Filter results in real-time |
| Click category button | Show only that category |
| Logout | Clear token, redirect to login |
| Close/reopen browser | Still logged in (token persists) |

---

## Common Errors & Solutions

| Error Message | Solution |
|--------------|----------|
| `Network Error` | Backend not running - start server |
| `Database connection failed` | PostgreSQL not running or wrong credentials |
| `401 Unauthorized` | Token missing/expired - login again |
| `User already exists` | Email taken - use different email |
| `Invalid email or password` | Check credentials or register first |
| `Password must contain...` | Use stronger password: `Test@1234` |
| `CORS error` | Check backend `.env` has correct `FRONTEND_URL` |

---

## Test Checklist

Copy this checklist and mark items as you test:

- [ ] Landing page loads
- [ ] Can click Sign Up
- [ ] Signup form validates input
- [ ] Can create account successfully
- [ ] Redirects to login after signup
- [ ] Can login with correct credentials
- [ ] Cannot login with wrong credentials
- [ ] Redirects to dashboard after login
- [ ] Dashboard shows user name/email
- [ ] Can access Tasks page
- [ ] Can create task
- [ ] Task persists after page refresh
- [ ] Can delete task
- [ ] Can search tasks
- [ ] Can filter by category
- [ ] Different users see different tasks
- [ ] Can logout
- [ ] Cannot access dashboard after logout
- [ ] Token persists across browser sessions

---

**All tests passing? Project is complete and meets all assignment requirements!**
