# 🚀 START HERE - Complete Setup Guide

## Problema mo ngayon:

1. ❌ phpMyAdmin hindi mabuksan
2. ❌ `npm run create-admin` - wrong directory
3. ⚠️ Database not yet setup

---

## ✅ SOLUTION - Follow these steps:

### Step 1: Start XAMPP/WAMP

**If using XAMPP:**
1. Open **XAMPP Control Panel**
2. Click **Start** button sa **Apache**
3. Click **Start** button sa **MySQL**
4. Wait until both show "Running" (green)

**If using WAMP:**
1. Open **WAMP**
2. Wait for icon to turn GREEN
3. If orange/red, click "Start All Services"

---

### Step 2: Check if MySQL is Working

Open Command Prompt and run:

```bash
cd C:\Users\christian\OneDrive\Desktop\Misaki-Auto-Supply-main\backend
check-mysql.bat
```

Kung may error, make sure XAMPP/WAMP MySQL is running.

---

### Step 3: Setup Database

**Option A: Automatic (Easiest)**

```bash
cd C:\Users\christian\OneDrive\Desktop\Misaki-Auto-Supply-main\backend
setup-database.bat
```

This will:
- Create database
- Create all tables
- Create admin user

**Option B: Manual (if automatic fails)**

1. Open MySQL command line:
```bash
cd C:\xampp\mysql\bin
mysql -u root -p
```
(Press Enter when asked for password)

2. Copy and paste these commands:
```sql
CREATE DATABASE misaki_auto_supply;
USE misaki_auto_supply;
```

3. Then run the SQL file:
```bash
source C:/Users/christian/OneDrive/Desktop/Misaki-Auto-Supply-main/backend/database/setup.sql
```

4. Exit MySQL:
```sql
EXIT;
```

5. Create admin user:
```bash
cd C:\Users\christian\OneDrive\Desktop\Misaki-Auto-Supply-main\backend
npm run create-admin
```

---

### Step 4: Verify Setup

Check if database was created:

```bash
cd C:\xampp\mysql\bin
mysql -u root -e "SHOW DATABASES;"
```

You should see `misaki_auto_supply` in the list.

Check tables:
```bash
mysql -u root -e "USE misaki_auto_supply; SHOW TABLES;"
```

You should see:
- admin_users
- users
- products
- orders
- order_items

---

### Step 5: Start Backend Server

```bash
cd C:\Users\christian\OneDrive\Desktop\Misaki-Auto-Supply-main\backend
npm run dev
```

Server should start on: http://localhost:5000

---

### Step 6: Test Admin Login

Open new Command Prompt:

```bash
curl -X POST http://localhost:5000/api/auth/admin/login -H "Content-Type: application/json" -d "{\"email\":\"admin@misaki.com\",\"password\":\"admin123\"}"
```

If successful, you'll see:
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "admin": {
      "id": 1,
      "email": "admin@misaki.com",
      "role": "admin"
    },
    "token": "..."
  }
}
```

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Check MySQL
cd backend
check-mysql.bat

# Setup database (automatic)
cd backend
setup-database.bat

# Create admin user only
cd backend
npm run create-admin

# Start server
cd backend
npm run dev

# Test server
curl http://localhost:5000

# Test admin login
curl -X POST http://localhost:5000/api/auth/admin/login -H "Content-Type: application/json" -d "{\"email\":\"admin@misaki.com\",\"password\":\"admin123\"}"
```

---

## 🔐 Default Credentials

**Admin Account:**
```
Email: admin@misaki.com
Password: admin123
```

**Database:**
```
Host: localhost
User: root
Password: (blank)
Database: misaki_auto_supply
```

---

## 📁 Project Structure

```
Misaki-Auto-Supply-main/
├── backend/                    ← Backend API
│   ├── server.js              ← Main server (RUNNING)
│   ├── routes/                ← API routes
│   ├── database/              ← SQL files
│   ├── scripts/               ← Setup scripts
│   ├── check-mysql.bat        ← Test MySQL
│   ├── setup-database.bat     ← Auto setup
│   └── EASY_SETUP.md          ← Detailed guide
│
└── react-project/             ← Frontend
    └── src/
        └── components/        ← React components
```

---

## 🆘 Troubleshooting

### phpMyAdmin not working?
**Solution:** Hindi kailangan ng phpMyAdmin! Use command line setup.

### MySQL not starting?
1. Check if port 3306 is free
2. Restart XAMPP/WAMP
3. Check Windows Services for MySQL

### "npm run create-admin" not found?
**Solution:** Make sure you're in the `backend` folder:
```bash
cd backend
npm run create-admin
```

### Database connection failed?
1. Check if MySQL is running (XAMPP/WAMP)
2. Verify `.env` file in backend folder
3. Default password is blank

### Admin user already exists?
**Solution:** That's OK! It means setup was successful before.

---

## ✅ Success Checklist

After following all steps, you should have:

- [x] XAMPP/WAMP MySQL running
- [x] Database `misaki_auto_supply` created
- [x] 5 tables created (users, admin_users, products, orders, order_items)
- [x] Admin user created (admin@misaki.com)
- [x] Backend server running on port 5000
- [x] Can test admin login successfully

---

## 🎉 What's Next?

Once backend is working:

1. **Test all endpoints** - See `backend/README.md`
2. **Connect frontend** - Update LoginForm.jsx and SignupForm.jsx
3. **Install axios** - `cd react-project && npm install axios`
4. **Create API service** - See `backend/QUICK_START.md`

---

## 📚 Documentation Files

- **START_HERE.md** ← You are here (Quick start)
- **backend/EASY_SETUP.md** ← Step-by-step database setup
- **backend/MANUAL_SETUP.md** ← Manual MySQL commands
- **backend/README.md** ← Complete API documentation
- **backend/QUICK_START.md** ← Quick reference
- **BACKEND_COMPLETE.md** ← Feature overview
- **BACKEND_STATUS.md** ← Current status

---

## 💡 Tips

1. **Always run commands from correct folder**
   - Backend commands: `cd backend` first
   - Frontend commands: `cd react-project` first

2. **Check if services are running**
   - MySQL: XAMPP/WAMP Control Panel
   - Backend: Should see "Server running on port 5000"

3. **Use batch files for easy setup**
   - `check-mysql.bat` - Test MySQL
   - `setup-database.bat` - Auto setup

4. **Keep terminal open**
   - Backend server needs to keep running
   - Open new terminal for other commands

---

**Ready to start? Follow Step 1 above!** 🚀
