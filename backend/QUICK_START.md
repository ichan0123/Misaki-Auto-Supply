# ⚡ Quick Start Guide

## Natapos na ang Backend Setup! 🎉

### Mga Ginawa:

✅ **Authentication System**
- User Signup with validation
- User Login with JWT
- Admin Login (separate)
- Token verification
- Secure password hashing

✅ **Database Schema**
- Users table (customers)
- Admin users table (admins)
- Products table
- Orders table
- Order items table

✅ **API Routes**
- `/api/auth/signup` - User registration
- `/api/auth/login` - User login
- `/api/auth/admin/login` - Admin login
- `/api/auth/verify` - Token verification
- `/api/auth/logout` - Logout

✅ **Security Features**
- JWT tokens (7-day expiration)
- bcrypt password hashing
- Role-based access (admin/customer)
- CORS protection
- Input validation

---

## 🚀 Paano Gamitin:

### 1. Install Dependencies (if not yet)
```bash
cd backend
npm install
```

### 2. Setup Database

**Make sure MySQL is running!**

Then run:
```bash
npm run setup
```

Kung may error, manually create database:
```sql
CREATE DATABASE misaki_auto_supply;
```

### 3. Start Server
```bash
npm run dev
```

Server: `http://localhost:5000`

### 4. Test API

**Signup:**
```bash
POST http://localhost:5000/api/auth/signup
{
  "firstname": "Juan",
  "lastname": "Dela Cruz",
  "email": "juan@example.com",
  "password": "password123",
  "contactnumber": "+63 912 345 6789",
  "address": "123 Main St, Manila"
}
```

**Login:**
```bash
POST http://localhost:5000/api/auth/login
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Admin Login:**
```bash
POST http://localhost:5000/api/auth/admin/login
{
  "email": "admin@misaki.com",
  "password": "admin123"
}
```

---

## 🔐 Default Admin Account

```
Email: admin@misaki.com
Password: admin123
```

**⚠️ Change this in production!**

---

## 📱 Frontend Integration

### 1. Install axios sa frontend:
```bash
cd react-project
npm install axios
```

### 2. Create API service file:

**File: `react-project/src/services/api.js`**
```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  adminLogin: (data) => api.post('/auth/admin/login', data),
  verify: () => api.get('/auth/verify'),
  logout: () => api.post('/auth/logout')
};

export default api;
```

### 3. Update LoginForm.jsx:

```javascript
import { authAPI } from '../services/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const endpoint = isAdminLogin ? authAPI.adminLogin : authAPI.login;
    const response = await endpoint({ email, password });
    
    if (response.data.success) {
      // Store token
      localStorage.setItem('token', response.data.data.token);
      
      // Store user data
      const userData = isAdminLogin 
        ? response.data.data.admin 
        : response.data.data.user;
      
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Redirect
      if (isAdminLogin) {
        navigate('/admin');
      } else {
        onLoginSuccess(userData);
      }
    }
  } catch (error) {
    setError(error.response?.data?.message || 'Login failed');
  }
};
```

### 4. Update SignupForm.jsx:

```javascript
import { authAPI } from '../services/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Validation...

  try {
    const response = await authAPI.signup({
      firstname,
      lastname,
      email,
      password,
      contactnumber,
      address
    });
    
    if (response.data.success) {
      // Store token
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.data.user));
      
      // Success
      onSignupSuccess(response.data.data.user);
    }
  } catch (error) {
    setError(error.response?.data?.message || 'Signup failed');
  }
};
```

---

## 🎯 Summary

**Backend Features:**
- ✅ User authentication (signup/login)
- ✅ Admin authentication (separate)
- ✅ JWT tokens
- ✅ Password hashing
- ✅ Database schema
- ✅ API endpoints
- ✅ Error handling
- ✅ CORS setup

**Next Steps:**
1. Start backend server: `npm run dev`
2. Install axios in frontend
3. Create API service file
4. Update login/signup forms
5. Test the integration!

---

## 📚 Documentation

- Full API docs: `backend/README.md`
- Setup guide: `backend/SETUP_INSTRUCTIONS.md`
- Database schema: `backend/database/schema.sql`

---

## 🆘 Common Issues

**"Cannot connect to database"**
- Check if MySQL is running
- Verify .env settings
- Run `npm run setup`

**"Port 5000 in use"**
- Change PORT in .env
- Or stop other process

**"bcryptjs not found"**
- Run `npm install`

---

Tapos na! Backend is ready to use! 🚀
