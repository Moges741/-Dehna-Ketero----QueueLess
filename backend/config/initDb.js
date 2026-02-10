import db from "./db.js";

export const initDatabase = () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      phone VARCHAR(20) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      office_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const createOfficesTable = `
  CREATE TABLE IF NOT EXISTS offices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
const createServicesTable = `
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  office_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  avg_duration_minutes INT DEFAULT 10,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE
);
`
const createTicketTable = `
CREATE TABLE IF NOT EXISTS tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  office_id INT NOT NULL,
  service_id INT NOT NULL,

  ticket_number INT NOT NULL,
  queue_date DATE NOT NULL,

  status ENUM('waiting','serving','completed','cancelled') DEFAULT 'waiting',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
`
const createQueueTable = `
CREATE TABLE IF NOT EXISTS queue_state (
  id INT AUTO_INCREMENT PRIMARY KEY,

  office_id INT NOT NULL,
  service_id INT NOT NULL,

  current_ticket_number INT DEFAULT 0,
  last_called_at DATETIME NULL,

  queue_date DATE NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(service_id, queue_date),

  FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
`

  db.query(createUsersTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table ready");
    }
  });
  db.query(createOfficesTable, (err) => {
    if (err) {
      console.error("Error creating offices table:", err);
    } else {
      console.log("Offices table ready");
    }
  });
  db.query(createServicesTable, (err) => {
    if (err) {
      console.error("Error creating services table:", err);
    } else {
      console.log("Services table ready");
    }
  });  
  db.query(createTicketTable, (err) => {
    if (err) {
      console.error("Error creating tickets table:", err);
    } else {
      console.log("Tickets table ready");
    }
  });
    db.query(createQueueTable, (err) => {
    if (err) {
      console.error("Error creating queue table:", err);
    } else {
      console.log("Queue table ready");
    }
  });
};
