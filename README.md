# 🛒 EcoMart

**EcoMart** is a full-stack e-commerce platform built with **Next.js**, **Express.js**, and **MongoDB**. It provides a seamless shopping experience for customers and powerful management tools for admins.

## 🚀 Key Features

### 🧑‍💻 User Features
- 🔐 User registration and login (JWT-based)
- 🛍️ Browse and view product details
- ➕ Add products to cart
- 📦 Place and track orders
- 🧾 View order history and status updates

### 🛠️ Admin Features
- 👤 Manage users (view, delete)
- 📦 Manage orders (update status, track)
- 🛒 Manage products (create, update, delete)

## ⚙️ Tech Stack

- **Frontend**: Next.js (React) + Tailwind CSS  
- **Backend**: Express.js (Node.js) REST API  
- **Database**: MongoDB (with Mongoose ORM)  
- **Auth**: JSON Web Tokens (JWT)  
- **Styling**: Tailwind CSS  
- **HTTP Client**: Axios

## 🧪 APIs

- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Products**: `/api/products` (GET, POST, PUT, DELETE)
- **Cart**: `/api/cart` (add/remove items)
- **Orders**: `/api/orders` (create, track)
- **Admin**: `/api/admin/users`, `/api/admin/products`, `/api/admin/orders`

## 📌 Installation & Setup

### Backend

```bash
cd backend
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_url
# JWT_SECRET=your_jwt_secret
npm run dev
