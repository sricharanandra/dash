# API Testing

## Production URL
`https://tasks.sreus.tech/api`

## Basic Tests

### Check if server is working
```bash
curl https://tasks.sreus.tech/api/health
```

### Register a user
```bash
curl -X POST https://tasks.sreus.tech/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"test","email":"test@test.com","password":"Test123!"}'
```

### Login
```bash
curl -X POST https://tasks.sreus.tech/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}'
```

### Get tasks (need token from login)
```bash
curl https://tasks.sreus.tech/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create task
```bash
curl -X POST https://tasks.sreus.tech/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"test task","category":"general"}'
```

## Notes
- Replace YOUR_TOKEN_HERE with actual token from login
- All authenticated requests need Authorization header
- Password needs uppercase, lowercase, number, special char (min 8 chars)
