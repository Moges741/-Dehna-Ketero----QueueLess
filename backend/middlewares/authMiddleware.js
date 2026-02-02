import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "ማረጋገጫ ያስፈልጋል - Authentication required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { userId, phone, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { 
      userId,      
      phone,      
      role        
    };
    
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ 
        msg: "ያልተሰራ ማረጋገጫ - Invalid or expired token",
        suggestion: "እንደገና ይግቡ - Please login again"
      });
  }
}

export default authMiddleware;