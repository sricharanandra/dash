# API Testing Guide

## Base URL
- **Local Development**: `http://localhost:5000/api`
- **Production**: `https://tasks.sreus.tech/api`

---

## Test Endpoints

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Dash API is running",
  "timestamp": "2025-10-29T..."
}
```

---

### 2. Register New User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234",
    "name": "Test User"
  }'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "createdAt": "2025-10-29T..."
  }
}
```

**Save the token for subsequent requests!**

---

### 3. Login

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@1234"
  }'
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

---

### 4. Verify Token

**Request:**
```bash
curl http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "created_at": "2025-10-29T..."
  }
}
```

---

### 5. Get User Profile

**Request:**
```bash
curl http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User",
    "created_at": "2025-10-29T..."
  }
}
```

---

### 6. Update Profile

**Request:**
```bash
curl -X PUT http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'
```

**Expected Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Updated Name",
    "created_at": "2025-10-29T..."
  }
}
```

---

### 7. Create Task

**Request:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete assignment",
    "category": "Important"
  }'
```

**Expected Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "user_id": 1,
    "title": "Complete assignment",
    "category": "Important",
    "completed": false,
    "created_at": "2025-10-29T...",
    "updated_at": "2025-10-29T..."
  }
}
```

---

### 8. Get All Tasks

**Request:**
```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "tasks": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Complete assignment",
      "category": "Important",
      "completed": false,
      "created_at": "2025-10-29T...",
      "updated_at": "2025-10-29T..."
    }
  ]
}
```

---

### 9. Update Task

**Request:**
```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

**Expected Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "user_id": 1,
    "title": "Complete assignment",
    "category": "Important",
    "completed": true,
    "created_at": "2025-10-29T...",
    "updated_at": "2025-10-29T..."
  }
}
```

---

### 10. Delete Task

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "message": "Task deleted successfully",
  "task": {
    "id": 1,
    "user_id": 1,
    "title": "Complete assignment",
    "category": "Important",
    "completed": true,
    "created_at": "2025-10-29T...",
    "updated_at": "2025-10-29T..."
  }
}
```

---

## Testing Script (Bash)

Save this as `test_api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:5000/api"

echo "Testing Dash API..."
echo ""

# Health check
echo "1. Health Check"
curl -s $BASE_URL/health | jq
echo -e "\n"

# 2. Register
echo "2. Register User"
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Test@12345",
    "name": "Test User"
  }')

echo $REGISTER_RESPONSE | jq
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')
echo "Token: $TOKEN"
echo -e "\n"

# 3. Login
echo "3. Login"
curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Test@12345"
  }' | jq
echo -e "\n"

# 4. Get Profile
echo "4. Get Profile"
curl -s $BASE_URL/user/profile \
  -H "Authorization: Bearer $TOKEN" | jq
echo -e "\n"

# 5. Create Task
echo "5. Create Task"
TASK_RESPONSE=$(curl -s -X POST $BASE_URL/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "category": "Important"
  }')

echo $TASK_RESPONSE | jq
TASK_ID=$(echo $TASK_RESPONSE | jq -r '.task.id')
echo "Task ID: $TASK_ID"
echo -e "\n"

# 6. Get All Tasks
echo "6. Get All Tasks"
curl -s $BASE_URL/tasks \
  -H "Authorization: Bearer $TOKEN" | jq
echo -e "\n"

# 7. Update Task
echo "7. Update Task"
curl -s -X PUT $BASE_URL/tasks/$TASK_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }' | jq
echo -e "\n"

# 8. Delete Task
echo "8. Delete Task"
curl -s -X DELETE $BASE_URL/tasks/$TASK_ID \
  -H "Authorization: Bearer $TOKEN" | jq
echo -e "\n"

echo "API Testing Complete!"
```

**Run it:**
```bash
chmod +x test_api.sh
./test_api.sh
```

---

## Common Errors

### 401 Unauthorized
```json
{ "error": "Access denied. No token provided." }
```
**Fix:** Include `Authorization: Bearer YOUR_TOKEN` header

### 403 Forbidden
```json
{ "error": "Invalid or expired token." }
```
**Fix:** Token expired or invalid - login again

### 400 Bad Request
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```
**Fix:** Check validation requirements

### 500 Server Error
```json
{ "error": "Server error during registration" }
```
**Fix:** Check server logs: `pm2 logs dash-api`

---

## Test with Postman/Thunder Client

1. Import this collection or manually create requests
2. Set environment variable `baseUrl` = `http://localhost:5000/api`
3. After login/register, save token in environment variable `authToken`
4. Use `{{baseUrl}}` and `Authorization: Bearer {{authToken}}` in requests

---

## Validation Rules

### Password Requirements:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

### Email:
- Must be valid email format

### Task Categories:
- Must be one of: "Important", "General", "Finish by Today"
