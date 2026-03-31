# Misaki Auto Supply - Backend API

Backend API para sa Misaki Auto Supply e-commerce platform.

## 🚀 Features

- **User Authentication**
  - User Signup with validation
  - User Login with JWT tokens
  - Admin Login (separate authentication)
  - Token verification
  - Secure password hashing with bcrypt

- **Security**
  - JWT-based authentication
  - Password hashing
  - Role-based access control (Admin/Customer)
  - CORS protection
  - Environment variables for sensitive data

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Setup Database:**
   - Create MySQL database:
     ```sql
     CREATE DATABASE misaki_auto_supply;
     ```
   
   - Run the schema:
     ```bash
     mysql -u root -p misaki_auto_supply < database/schema.sql
     ```

3. **Configure Environment:**
   - Copy `.env` file and update with your settings:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=misaki_auto_supply
     PORT=5000
     JWT_SECRET=your_secret_key
     ```

4. **Generate Admin Password (Optional):**
   ```bash
   node scripts/generateAdminPassword.js
   ```

## 🏃 Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

#### User Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "firstname": "Juan",
  "lastname": "Dela Cruz",
  "email": "juan@example.com",
  "password": "password123",
  "contactnumber": "+63 912 345 6789",
  "address": "123 Main St, Manila"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "firstname": "Juan",
      "lastname": "Dela Cruz",
      "email": "juan@example.com",
      "role": "customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "firstname": "Juan",
      "lastname": "Dela Cruz",
      "email": "juan@example.com",
      "contactNumber": "+63 912 345 6789",
      "address": "123 Main St, Manila",
      "role": "customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Admin Login
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@misaki.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "admin": {
      "id": 1,
      "email": "admin@misaki.com",
      "fullName": "System Administrator",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "juan@example.com",
      "role": "customer"
    }
  }
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Test Endpoints

#### Test Database Connection
```http
GET /api/test-db
```

## 🔐 Default Admin Credentials

- **Email:** admin@misaki.com
- **Password:** admin123

⚠️ **IMPORTANT:** Change the admin password in production!

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `firstname` - User's first name
- `lastname` - User's last name
- `email` - Unique email address
- `password_hash` - Hashed password
- `contact_number` - Phone number
- `address` - User address
- `role` - User role (customer)
- `is_active` - Account status
- `created_at` - Registration date
- `updated_at` - Last update

### Admin Users Table
- `id` - Primary key
- `email` - Unique admin email
- `password_hash` - Hashed password
- `full_name` - Admin full name
- `is_active` - Account status
- `last_login` - Last login timestamp
- `created_at` - Creation date
- `updated_at` - Last update

## 🔒 Security Features

1. **Password Hashing:** All passwords are hashed using bcrypt with salt rounds
2. **JWT Tokens:** Secure token-based authentication with 7-day expiration
3. **Role-Based Access:** Separate admin and customer authentication
4. **Input Validation:** Server-side validation for all inputs
5. **CORS Protection:** Configured CORS for frontend origin
6. **Environment Variables:** Sensitive data stored in .env file

## 📝 Error Handling

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## 🧪 Testing

Test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- Frontend application

## 📦 Dependencies

- **express** - Web framework
- **mysql2** - MySQL client
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - CORS middleware
- **dotenv** - Environment variables

## 🚧 Development

**Watch mode with nodemon:**
```bash
npm run dev
```

## 📄 License

ISC

## 👨‍💻 Author

Misaki Auto Supply Development Team
