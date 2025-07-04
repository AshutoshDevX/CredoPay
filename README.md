# 💳 CredoPay Banking System

A full-stack banking application that allows **customers** to manage their transactions and **bankers** to monitor customer accounts. Built with modern technologies and a clean UI.

## 🚀 Features

### 👤 Customer
- Signup/Login with validation
- Auto-created savings account with ₹1000 balance
- Deposit / Withdraw functionality
- View live transaction history
- Protected routes with access token
- Secure logout

### 🧑‍💼 Banker
- Banker login access
- Dashboard to view all customers and accounts
- Drill down into customer transaction history
- Secure logout

## 🛠️ Tech Stack

| Layer       | Tech Used                                   |
|-------------|----------------------------------------------|
| Frontend    | React.js, Tailwind CSS, Shadcn UI, Axios     |
| Backend     | Node.js, Express.js, Prisma ORM              |
| Database    | MySQL                                        |
| Validation  | Zod                                          |
| Auth        | Access Token (stored in DB + localStorage)   |

## 📁 Project Structure

```
CredoPay/
├── backend/
│   ├── controller/
│   ├── routes/
│   ├── validators/
│   ├── prisma/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx / main.jsx
```

## 📦 Getting Started

### 🔧 Backend

```bash
cd backend
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

Create a `.env` file with:

```
DATABASE_URL="mysql://root:yourpassword@localhost:3306/bank"
PORT=3000
```

### 🎨 Frontend

```bash
cd frontend
npm install
npm run dev
```

Make sure the backend is running on port `3000`.

## 📑 API Endpoints

### 🔐 Auth
- `POST /auth/signup` — Register user
- `POST /auth/login` — Login & receive token

### 👤 Customer
- `GET /api/transactions` — Get accounts + history
- `POST /api/deposit` — Deposit cash
- `POST /api/withdraw` — Withdraw cash

### 🧑‍💼 Banker
- `GET /banker/customers` — All customers & balances
- `GET /banker/customer/:user_id` — View transactions of one user

## ✅ Auth Flow

- Token (UUID) is generated on login and saved in the DB
- Sent in `Authorization` header for API requests
- Stored in `localStorage` on frontend
- Logout clears token and redirects to SignIn page


## 📄 License

MIT License — for personal and educational use.


