# ✅ READY TO TEST! - Everything is Setup

## 🎉 Tapos na lahat!

### ✅ Completed:
1. ✅ Database created: `misaki_auto_supply`
2. ✅ Tables created (users, admin_users, products, orders, order_items)
3. ✅ Admin user created (admin@misaki.com / admin123)
4. ✅ Backend server running (port 5000)
5. ✅ axios installed
6. ✅ API service created (api.js)
7. ✅ LoginForm updated with API
8. ✅ SignupForm updated with API

---

## 🚀 START TESTING NOW!

### Step 1: Make sure Backend is Running

Open Command Prompt:
```bash
cd C:\Users\christian\OneDrive\Desktop\Misaki-Auto-Supply-main\backend
npm run dev
```

Should see:
```
╔═══════════════════════════════════════════════════════╗
║   🚗 Misaki Auto Supply API Server                   ║
║   Server running on: http://localhost:5000           ║
╚═══════════════════════════════════════════════════════╝
```

---

### Step 2: Start Frontend

Open NEW Command Prompt:
```bash
cd C:\Users\christian\OneDrive\Desktop\Misaki-Auto-Supply-main\react-project
npm run dev
```

Should open browser automatically at: **http://localhost:5173**

---

## 🧪 TEST SCENARIOS

### ✅ Test 1: Admin Login

1. Open **http://localhost:5173**
2. Click **"Admin Login"** button (at the bottom)
3. Enter credentials:
   ```
   Email: admin@misaki.com
   Password: admin123
   ```
4. Click **"Login as Admin"**
5. **Expected:** Redirect to Admin Dashboard (/admin)

**If successful:** ✅ Admin authentication working!

---

### ✅ Test 2: User Signup

1. Click **"Sign up"** or **"Don't have an account? Sign up"**
2. Fill in ALL fields:
   ```
   First Name: Juan
   Last Name: Dela Cruz
   Email: juan@example.com
   Contact Number: +63 912 345 6789
   Address: 123 Main Street, Manila
   Password: password123
   Confirm Password: password123
   ```
3. Click **"Create Account"**
4. **Expected:** 
   - Account created
   - Automatically logged in
   - Redirected to homepage

**If successful:** ✅ User registration working!

---

### ✅ Test 3: User Login

1. If logged in, logout first
2. Click **"Login"**
3. Enter credentials:
   ```
   Email: juan@example.com
   Password: password123
   ```
4. Click **"Login"**
5. **Expected:** Successfully logged in

**If successful:** ✅ User authentication working!

---

### ✅ Test 4: Check Database

Open MySQL:
```bash
cd C:\xampp\mysql\bin
mysql -u root -p
```

Check users:
```sql
USE misaki_auto_supply;
SELECT * FROM users;
SELECT * FROM admin_users;
EXIT;
```

**Expected:** 
- See admin user in admin_users table
- See Juan Dela Cruz in users table

---

## 🎯 What Should Work:

### Frontend Features:
- ✅ Beautiful login form with animations
- ✅ Beautiful signup form with 2-column layout
- ✅ Admin/User login toggle
- ✅ Show/hide password
- ✅ Loading states ("Logging in...", "Creating Account...")
- ✅ Error messages (red alerts)
- ✅ Success redirects

### Backend Features:
- ✅ User signup with validation
- ✅ User login with JWT tokens
- ✅ Admin login (separate)
- ✅ Password hashing (bcrypt)
- ✅ Token generation (7-day expiration)
- ✅ Database storage
- ✅ Error handling

### Security:
- ✅ Passwords hashed (not stored as plain text)
- ✅ JWT tokens for authentication
- ✅ Separate admin authentication
- ✅ Token stored in localStorage
- ✅ CORS configured

---

## 🔍 How to Check if Working:

### Check Browser Console (F12):
- No red errors
- Should see successful API responses
- Token should be stored in localStorage

### Check Network Tab (F12 → Network):
- POST requests to `/api/auth/login` or `/api/auth/signup`
- Status: 200 OK
- Response has `success: true`

### Check localStorage (F12 → Application → Local Storage):
- `token` - JWT token
- `userData` - User information
- `adminData` - Admin information (if admin login)

---

## 🆘 Troubleshooting:

### "Network Error" or "ERR_CONNECTION_REFUSED"
**Problem:** Backend not running
**Solution:** 
```bash
cd backend
npm run dev
```

### "Invalid credentials" for admin
**Problem:** Admin user not created or wrong password
**Solution:**
```bash
cd backend
npm run create-admin
```
Use: admin@misaki.com / admin123

### "Email already registered"
**Problem:** User already exists
**Solution:** Use different email or login with existing account

### Form not submitting
**Problem:** Missing required fields
**Solution:** Fill in ALL fields (all are required)

### "Database connection failed"
**Problem:** MySQL not running
**Solution:** Start XAMPP/WAMP MySQL service

---

## 📊 Success Indicators:

### ✅ Everything Working:
- Backend server running without errors
- Frontend loads without errors
- Can create new user account
- Can login as user
- Can login as admin
- Token appears in localStorage
- User data saved in database
- No console errors

### ✅ Admin Dashboard:
- Redirects to /admin after admin login
- Shows admin interface
- Can see statistics
- Can manage products/orders/customers

---

## 🎉 CONGRATULATIONS!

If all tests pass, you have:

✅ **Full-stack authentication system**
- User registration
- User login
- Admin login
- JWT tokens
- Password hashing
- Database integration

✅ **Modern UI**
- Beautiful forms
- Smooth animations
- Loading states
- Error handling

✅ **Secure Backend**
- API endpoints
- Database schema
- Authentication middleware
- CORS protection

---

## 📝 Next Steps (Optional):

1. **Add Logout Button**
   - Clear localStorage
   - Redirect to login

2. **Protected Routes**
   - Prevent unauthorized access
   - Check token before rendering

3. **User Profile Page**
   - View user information
   - Edit profile

4. **Product Management**
   - Add/Edit/Delete products
   - Upload images

5. **Order System**
   - Place orders
   - Track orders
   - Order history

---

## 🔐 Important Credentials:

**Admin:**
```
Email: admin@misaki.com
Password: admin123
```

**Test User (after signup):**
```
Email: juan@example.com
Password: password123
```

**Database:**
```
Host: localhost
User: root
Password: (blank)
Database: misaki_auto_supply
```

---

## 📚 Documentation:

- **TEST_GUIDE.md** ← You are here
- **FINAL_STEPS.md** ← Setup steps
- **START_HERE.md** ← Initial setup
- **backend/README.md** ← API docs
- **BACKEND_COMPLETE.md** ← Features

---

**START TESTING NOW!** 🚀

Open two terminals:
1. `cd backend && npm run dev`
2. `cd react-project && npm run dev`

Then test login/signup!
