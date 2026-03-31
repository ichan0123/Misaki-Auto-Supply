# 🚀 Backend Setup Instructions

## Step-by-Step Guide

### 1. Install Dependencies

```bash
cd backend
npm install
```

Ito ay mag-install ng:
- express
- mysql2
- bcryptjs
- jsonwebtoken
- cors
- dotenv

### 2. Configure Environment Variables

Ang `.env` file ay naka-configure na with default values:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=misaki_auto_supply
PORT=5000
JWT_SECRET=misaki_auto_supply_secret_key_2024_change_in_production
```

**⚠️ IMPORTANT:** Update ang `DB_PASSWORD` kung may password ang MySQL mo.

### 3. Setup Database

**Option A: Automatic Setup (Recommended)**
```bash
npm run setup
```

Ito ay automatic na:
- Gagawa ng database
- Gagawa ng lahat ng tables
- Mag-insert ng default admin user
- Mag-insert ng sample products

**Option B: Manual Setup**
```bash
mysql -u root -p
```

Then run:
```sql
CREATE DATABASE misaki_auto_supply;
USE misaki_auto_supply;
SOURCE database/schema.sql;
```

### 4. Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will run on: `http://localhost:5000`

### 5. Test the API

**Test Database Connection:**
```bash
curl http://localhost:5000/api/test-db
```

**Test User Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Juan",
    "lastname": "Dela Cruz",
    "email": "juan@example.com",
    "password": "password123",
    "contactnumber": "+63 912 345 6789",
    "address": "123 Main St, Manila"
  }'
```

**Test User Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

**Test Admin Login:**
```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@misaki.com",
    "password": "admin123"
  }'
```

## 🔐 Default Admin Credentials

```
Email: admin@misaki.com
Password: admin123
```

**⚠️ IMPORTANT:** Change this password in production!

## 📋 Troubleshooting

### Error: "Cannot connect to MySQL"
- Check if MySQL is running
- Verify DB_HOST, DB_USER, DB_PASSWORD in .env
- Make sure MySQL port 3306 is open

### Error: "Database does not exist"
- Run `npm run setup` to create database
- Or manually create: `CREATE DATABASE misaki_auto_supply;`

### Error: "Port 5000 already in use"
- Change PORT in .env file
- Or stop the process using port 5000

### Error: "bcryptjs not found"
- Run `npm install` again
- Check if node_modules folder exists

## 🧪 Testing with Postman

1. Import the API endpoints
2. Create a new environment with:
   - `base_url`: http://localhost:5000
   - `token`: (will be set after login)

3. Test endpoints:
   - POST {{base_url}}/api/auth/signup
   - POST {{base_url}}/api/auth/login
   - POST {{base_url}}/api/auth/admin/login
   - GET {{base_url}}/api/auth/verify (with Bearer token)

## 📝 Next Steps

1. ✅ Backend setup complete
2. 🔄 Update frontend to use these API endpoints
3. 🔐 Implement token storage in frontend
4. 🎨 Connect login/signup forms to API
5. 🛡️ Add protected routes in frontend

## 🆘 Need Help?

Check the main README.md for more detailed API documentation.
