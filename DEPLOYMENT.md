# DEPLOYMENT CHECKLIST FOR tasks.sreus.tech

## Files/Code to Change After Cloning to Oracle Server

### 1. SERVER CONFIGURATION (.env file)
**Location:** `server/.env`

```env
# Production Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration (Oracle Instance)
DB_USER=sreus
DB_HOST=localhost
DB_NAME=dash_production  # CREATE NEW DATABASE FOR PRODUCTION
DB_PASSWORD=YOUR_PRODUCTION_DB_PASSWORD  # SET STRONG PASSWORD
DB_PORT=5432

# JWT Secret (CHANGE THIS!)
JWT_SECRET=GENERATE_A_STRONG_RANDOM_SECRET_HERE_USE_openssl_rand_base64_32
JWT_EXPIRE=24h

# CORS (Frontend URL)
FRONTEND_URL=https://tasks.sreus.tech
```

**Action Items:**
- [ ] Change `NODE_ENV` to `production`
- [ ] Create new database `dash_production` on Oracle instance
- [ ] Set strong PostgreSQL password
- [ ] Generate new JWT secret: `openssl rand -base64 32`
- [ ] Update `FRONTEND_URL` to `https://tasks.sreus.tech`

---

### 2. FRONTEND CONFIGURATION
**Location:** `src/config/api.js` (needs to be created)

**Create this file:**
```javascript
// src/config/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default API_URL;
```

**Then create:** `.env` in root directory
```env
# Development
VITE_API_URL=http://localhost:5000/api

# For production build, create .env.production:
# VITE_API_URL=https://tasks.sreus.tech/api
```

**Create:** `.env.production` in root
```env
VITE_API_URL=https://tasks.sreus.tech/api
```

---

### 3. VITE CONFIG (Proxy for Development)
**Location:** `vite.config.js`

Add proxy configuration:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

---

### 4. NGINX CONFIGURATION (Oracle Server)
**Location:** `/etc/nginx/sites-available/tasks.sreus.tech`

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name tasks.sreus.tech;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name tasks.sreus.tech;

    # SSL Certificates (use Certbot)
    ssl_certificate /etc/letsencrypt/live/tasks.sreus.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tasks.sreus.tech/privkey.pem;

    # Frontend (Vite build)
    root /var/www/dash/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### 5. PM2 CONFIGURATION (Process Manager)
**Location:** `server/ecosystem.config.cjs`

Create this file:
```javascript
module.exports = {
  apps: [{
    name: 'dash-api',
    script: './server.js',
    cwd: '/var/www/dash/server',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/dash/err.log',
    out_file: '/var/log/dash/out.log',
    log_file: '/var/log/dash/combined.log',
    time: true
  }]
};
```

---

## DEPLOYMENT STEPS ON ORACLE SERVER

### Step 1: Install Dependencies
```bash
# Update system
sudo pacman -Syu

# Install Node.js, PostgreSQL, Nginx, PM2
sudo pacman -S nodejs npm postgresql nginx
sudo npm install -g pm2

# Install Certbot for SSL
sudo pacman -S certbot certbot-nginx
```

### Step 2: Setup PostgreSQL
```bash
# Create production database
psql -U sreus
CREATE DATABASE dash_production;
\q

# Run database schema
psql -U sreus -d dash_production -f /var/www/dash/server/config/database.sql
```

### Step 3: Clone and Setup Project
```bash
# Clone repository to server
cd /var/www
git clone YOUR_REPO_URL dash
cd dash

# Install frontend dependencies
npm install
npm run build

# Install backend dependencies
cd server
npm install
```

### Step 4: Configure Environment
```bash
# Edit server/.env with production values
nano server/.env

# Update all values as per section 1 above
```

### Step 5: Setup SSL Certificate
```bash
# Get SSL certificate
sudo certbot --nginx -d tasks.sreus.tech
```

### Step 6: Start Backend with PM2
```bash
cd /var/www/dash/server
pm2 start server.js --name dash-api
pm2 save
pm2 startup
```

### Step 7: Configure Nginx
```bash
# Create nginx config
sudo nano /etc/nginx/sites-available/tasks.sreus.tech

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/tasks.sreus.tech /etc/nginx/sites-enabled/

# Test nginx config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### Step 8: Enable Nginx and PM2 on Boot
```bash
sudo systemctl enable nginx
pm2 startup
pm2 save
```

---

## TESTING CHECKLIST

- [ ] PostgreSQL database created and schema loaded
- [ ] `.env` file configured with production values
- [ ] Frontend built successfully (`npm run build`)
- [ ] Backend running on port 5000 (`pm2 status`)
- [ ] Nginx configured and running
- [ ] SSL certificate installed
- [ ] DNS points to Oracle server IP
- [ ] Can access https://tasks.sreus.tech
- [ ] API endpoints accessible at https://tasks.sreus.tech/api
- [ ] Test registration and login
- [ ] Test task CRUD operations

---

## SECURITY CHECKLIST

- [ ] Strong JWT secret generated
- [ ] PostgreSQL password set (not empty)
- [ ] `.env` file NOT committed to git
- [ ] Firewall configured (only ports 22, 80, 443 open)
- [ ] PostgreSQL only listens on localhost
- [ ] Rate limiting configured (optional)
- [ ] CORS only allows tasks.sreus.tech

---

## USEFUL COMMANDS

```bash
# View backend logs
pm2 logs dash-api

# Restart backend
pm2 restart dash-api

# Check nginx logs
sudo tail -f /var/log/nginx/error.log

# Rebuild frontend after changes
cd /var/www/dash
git pull
npm install
npm run build
pm2 restart dash-api

# Database backup
pg_dump -U sreus dash_production > backup_$(date +%Y%m%d).sql

# Database restore
psql -U sreus dash_production < backup_YYYYMMDD.sql
```

---

## TROUBLESHOOTING

### Backend won't start
```bash
pm2 logs dash-api  # Check logs
cd /var/www/dash/server
node server.js  # Run manually to see errors
```

### Database connection failed
```bash
# Test connection
psql -U sreus -d dash_production -c "SELECT NOW();"

# Check .env file has correct credentials
cat server/.env
```

### CORS errors
- Verify `FRONTEND_URL` in server/.env matches https://tasks.sreus.tech
- Check browser console for exact error

### 502 Bad Gateway
- Backend not running: `pm2 status`
- Wrong port in nginx config
- Check nginx error logs

---

## IMPORTANT NOTES

1. **BACKUP FIRST**: Always backup database before updates
2. **TEST LOCALLY**: Test all changes on local machine first
3. **JWT SECRET**: Must be different from development
4. **DATABASE**: Use separate production database
5. **LOGS**: Monitor PM2 and nginx logs regularly

---

## QUICK REFERENCE

- **App URL**: https://tasks.sreus.tech
- **API URL**: https://tasks.sreus.tech/api
- **Server Path**: /var/www/dash
- **Backend Port**: 5000 (localhost only)
- **Database**: dash_production
- **Process Manager**: PM2 (dash-api)
