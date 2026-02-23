import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import xss from "xss";
import db from "../config/db.js";

/**
 * REGISTER USER
 */
export const registerUser = async (req, res) => {
  try {
    let { name, email, phone, password, role } = req.body;

    name = xss(name?.trim());
    email = xss(email?.trim());
    phone = xss(phone?.trim());
    role = xss(role?.trim() || "user");

    if (!name || !email || !phone || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Name, email, phone, and password are required"
      });
    }

    const checkQuery = "SELECT id FROM users WHERE email = ? OR phone = ? LIMIT 1";

    db.query(checkQuery, [email, phone], async (err, result) => {
      if (err) {
        console.error("DB check error:", err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Database error" });
      }

      if (result.length > 0) {
        return res.status(StatusCodes.CONFLICT).json({
          msg: "User already exists"  // ← this is working on second try
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const insertQuery = `
        INSERT INTO users (name, email, phone, password_hash, role)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [name, email, phone, hashedPassword, role],
        (err, insertResult) => {
          if (err) {
            console.error("Insert error:", err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              msg: "Failed to create user - database issue"
            });
          }

          // Optional: auto-login after register (recommended)
          const newUser = { id: insertResult.insertId, name, email, role };
          const token = jwt.sign(
            { userId: newUser.id, phone: newUser.phone, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );

          return res.status(StatusCodes.CREATED).json({
            msg: "User registered successfully",
            user: newUser,
            token
          });
        }
      );
    });
  } catch (error) {
    console.error("Unexpected registration error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Server error - please try again later"
    });
  }
};

/**
 * LOGIN USER (Using NAME + PASSWORD)
 */
export const loginUser = async (req, res) => {
  try {
    let { name, password } = req.body;

    // 🛡 XSS Sanitize
    name = xss(name?.trim());

    if (!name || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Name and password required",
      });
    }

    // Find user by name
    const query = "SELECT * FROM users WHERE name = ? LIMIT 1";

    db.query(query, [name], async (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: "Database error" });
      }

      if (result.length === 0) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          msg: "Invalid credentials",
        });
      }

      const user = result[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          msg: "Invalid credentials",
        });
      }

      // Generate JWT
      const token = jwt.sign(
        {
          userId: user.id,
          phone: user.phone,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(StatusCodes.OK).json({
        msg: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
  }
};
