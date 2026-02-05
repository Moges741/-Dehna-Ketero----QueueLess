import dbConnection from "../config/db";
import { StatusCodes } from "http-status-codes";

/* =======  Basic XSS Protection Helper =======
*/
import xss from 'xss'
// const sanitizeInput = (value) =>{
//     if(!value) return value;
//     return value
//     .replace(/</g, "")
//     .replace(/>/g, "")
//     .replace(/script/g, "" );
// };

// check if user is admin or manager
const isAdminManager = (role) => {
    return role === "admin" || role === "manager";
}

export const createService = async (req, res) =>{
    try{
        if(!isAdminManager(req.user.role)){
            return res
            .status(StatusCodes.FORBIDDEN)
            .json({msg: "Not authorized"});
        }
    let { office_id, name, description, avg_duration_minutes } = req.body;
    name = xss(name);
    description = xss(description);
    if(!office_id || !name){
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg : "Office ID and Service Name required"
        });
    }
    const sql = `
      INSERT INTO services
      (office_id, name, description, avg_duration_minutes)
      VALUES (?, ?, ?, ?)`;

      dbConnection.query(
        sql, [office_id, name, description, avg_duration_minutes || 10], (err, result) => {
            if(err){
            console.error(err);
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ msg: "Database error" });

            }
              res.status(StatusCodes.CREATED).json({
          msg: "Service created successfully",
          serviceId: result.insertId
        });
        }
      );

    }catch(error){
          res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });

    }
};


// GET ALL SERVICES

export const getAllSevices = async (req, res) => {
    try {
           const sql = `SELECT * FROM services WHERE is_active = TRUE`;

    db.query(sql, (err, results) => {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: "Database error" });
      }

      res.status(StatusCodes.OK).json(results);
    });

        
    } catch (error) {
         res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
        
    }
}