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
    let { name, email, phone, password, role, office_id } = req.body;

    // 🛡 XSS Sanitize
    name = xss(name?.trim());
    email = xss(email?.trim());
    phone = xss(phone?.trim());
    role = xss(role?.trim());

    // Validation
    if (!name || !email || !phone || !password || !role) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "All fields are required",
      });
    }

    // Check duplicate user
    const checkQuery =
      "SELECT id FROM users WHERE email = ? OR phone = ? LIMIT 1";

    db.query(checkQuery, [email, phone], async (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: "Database error" });
      }

      if (result.length > 0) {
        return res.status(StatusCodes.CONFLICT).json({
          msg: "User already exists",
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert user
      const insertQuery = `
        INSERT INTO users (name, email, phone, password_hash, role, office_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [name, email, phone, hashedPassword, role, office_id],
        (err) => {
          if (err) {
            console.error(err);
            return res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ msg: "Failed to create user" });
          }

return res.status(StatusCodes.CREATED).json({
  msg: "User registered successfully",
  user: {
    id: insertResult.insertId,
    name,
    email,
    phone,
    role: role || "user"
  },
  token: jwt.sign(
    { userId: insertResult.insertId, phone, role: role || "user" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
});
        }
      );
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
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
