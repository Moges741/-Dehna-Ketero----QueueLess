# QueueLess

QueueLess is a modern, user-friendly digital queue and ticketing system built for offices, hospitals, universities, banks, government services, and more in Ethiopia. The system helps users skip long lines by booking digital tickets in advance, while staff can manage queues efficiently with real-time updates.

## ✨ Features

- **Instant Digital Tickets:** No more paper queuing—receive tickets on your device.
- **Live Queue Tracking:** View your position in line and estimated wait time, live.
- **Role-based Access:**
  - **Users:** Create tickets, view ticket history.
  - **Staff/Managers:** Call next customer, update ticket status.
  - **Admins:** Manage offices, services, and users.
- **Beautiful, Responsive UI:** Mobile-first, with a glassmorphism design style.
- **Real-time Updates:** Queue data updates every few seconds.
- **Secure Authentication:** JWT-based authentication.
- **Google OAuth Support:** Planned/partial.
- **Admin Dashboard:** View stats and manage entities.

## 🚀 Tech Stack

**Frontend**
- React 18 + Vite
- Redux Toolkit (classic thunks)
- Tailwind CSS
- Lucide React icons
- React Router v6

**Backend**
- Node.js & Express
- MySQL
- JWT Authentication
- bcryptjs for password hashing
- xss for input sanitization

## 📋 Prerequisites

- Node.js >= 18
- MySQL 8+
- Git

## 🛠️ Installation & Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Moges741/-Dehna-Ketero----QueueLess.git
    cd -Dehna-Ketero----QueueLess
    ```

2. **Install dependencies:**
    - Navigate to both `frontend` and `backend` directories and run:
      ```sh
      npm install
      # or
      yarn install
      ```

3. **Configure your environment:**
    - Create `.env` files (for both frontend and backend) based on respective `.env.example` files.

4. **Prepare the database:**
    - Make sure MySQL is running and the user has permission to create databases and tables.
    - Use the schema below to set up the basic tables.

## 🗃️ Database Schema (Minimal Example)

```sql
-- users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'staff', 'manager', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- offices
CREATE TABLE offices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- services
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  office_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  avg_duration_minutes INT DEFAULT 10,
  is_active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (office_id) REFERENCES offices(id)
);

-- tickets
CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  office_id INT NOT NULL,
  service_id INT NOT NULL,
  ticket_number INT NOT NULL,
  queue_date DATE NOT NULL,
  status ENUM('waiting', 'serving', 'completed', 'cancelled') DEFAULT 'waiting',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (office_id) REFERENCES offices(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
);

-- queue_state
CREATE TABLE queue_state (
  id INT AUTO_INCREMENT PRIMARY KEY,
  office_id INT NOT NULL,
  service_id INT NOT NULL,
  queue_date DATE NOT NULL,
  current_ticket_number INT DEFAULT 0,
  last_called_at TIMESTAMP NULL,
  UNIQUE KEY unique_service_date (service_id, queue_date)
);
```

## 🙋‍♂️ Creator

Created by [Moges741](https://github.com/Moges741).  
**Your contributions, suggestions, and feedback are welcome!**

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**QueueLess** aims to make public services in Ethiopia more efficient, transparent, and accessible for everyone.
