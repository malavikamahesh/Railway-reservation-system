# 🚂 Railway Reservation System

A comprehensive web-based Railway Reservation System built with modern technologies to facilitate seamless train ticket booking and management.

---

## 🌟 Features

### 👤 Passenger Portal
- **Authentication**: Secure Signup, Login, and Logout functionality with hashed passwords.
- **Seat Booking**: Real-time availability check and seat reservation for various trains.
- **My Bookings**: View all upcoming and past journeys with ticket details.
- **Cancellation**: Hassle-free ticket cancellation with automatic seat updates.
- **Customer Care**: Dedicated support section for passenger assistance.

### 🛠 Admin Dashboard
- **Train Management**: Add, update, or cancel trains.
- **Stations**: Manage the global list of train stations and their codes.
- **Booking Overview**: Monitor all bookings, passenger details, and payment statuses across the system.
- **System Insights**: Quick stats on active trains, registered stations, and total bookings.

---

## 🛠 Tech Stack

- **Frontend**: EJS (Embedded JavaScript Templates), Vanilla CSS, Bootstrap.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL (using `mysql2` and Connection Pooling).
- **Security**: `bcryptjs` for password hashing and `express-session` for secure user sessions.
- **Environment**: Managed via `.env` for easy configuration.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [MySQL Server](https://www.mysql.com/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd railway_reservation_system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Configuration**
   - Create a file named `.env` in the root directory.
   - Add your MySQL credentials:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=railway_reservation
     PORT=3000
     SESSION_SECRET=your_secret_key
     ```

4. **Initialize Database**
   Run the following command to create the schema and seed initial data (Stations, Trains, and an Admin account):
   ```bash
   npm run setup-db
   ```
   > **Note:** The default admin account is `admin@railway.com` with password `admin123`.

5. **Start the Application**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

---

## 📁 Project Structure

```text
railway_reservation_system/
├── config/             # Database connection pool setup
├── db/                 # SQL schemas and initialization scripts
├── middleware/         # Authentication and authorization logic
├── public/             # Static assets (images, CSS, JS)
├── routes/             # Express routes for Auth, Admin, and Passenger
├── views/              # EJS templates for the UI
├── server.js           # Main application entry point
└── .env                # Environment variables configuration
```

---

## 🔒 Security Measures
- **Password Protection**: All user passwords are encrypted using `bcryptjs` before storage.
- **Session Management**: Secure sessions ensure that users can only access their authorized data.
- **Input Validation**: Sanitization of user inputs to prevent common web vulnerabilities.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
