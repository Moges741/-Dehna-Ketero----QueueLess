import db from "../config/db.js";
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
const isAdminOrManager = (role) => {
    return role === "admin" || role === "manager";
}

export const createService = async (req, res) =>{
    try{
        if(!isAdminOrManager(req.user.role)){
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

      db.query(
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

export const getAllServices = async (req, res) => {
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

// GET SERVICES BY OFFICE

export const getServicesByOffice = async (req, res) => {
    try {
        const {office_id} = req.params;
    const sql = `
      SELECT * FROM services
      WHERE office_id = ? AND is_active = TRUE
    `;
 db.query(sql, [office_id], (err, results) => {
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
};


/* =====================================================
   GET SINGLE SERVICE
===================================================== */

export const getSingleService = async (req, res) => {
    try {
        const {serviceId} = req.params;
        const sql = `SELECT * FROM services WHERE id = ?`;
        db.query(sql, [serviceId], (err, results) => {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: "Database error" });
      }

      if (results.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "Service not found" });
      }

      res.status(StatusCodes.OK).json(results[0]);
    });

    } catch (error) {
           res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
        
    }


}

/* =====================================================
   UPDATE SERVICE
===================================================== */
export const updateService = async (req, res) => {
    try {
       if (!isAdminOrManager(req.user.role)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Not authorized" });
    }
    const { serviceId } = req.params;
    let { name, description, avg_duration_minutes } = req.body;

    name = xss(name);
    description = xss(description);

    const sql = `
      UPDATE services
      SET name = ?, description = ?, avg_duration_minutes = ?
      WHERE id = ?
    `;
db.query(
      sql,
      [name, description, avg_duration_minutes, serviceId],
      (err) => {
        if (err) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Database error" });
        }

        res.status(StatusCodes.OK).json({
          msg: "Service updated successfully"
        });
      }
    );
    } catch (error) {

       res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
        
    }
};

export const updateServiceStatus = async (req, res) => {
  try {
    if (!isAdminOrManager(req.user.role)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Not authorized" });
    }

    const { serviceId } = req.params;
    const { is_active } = req.body;

    const sql = `
      UPDATE services
      SET is_active = ?
      WHERE id = ?
    `;

    db.query(sql, [is_active, serviceId], (err) => {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: "Database error" });
      }

      res.status(StatusCodes.OK).json({
        msg: "Service status updated"
      });
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Server error" });
  }
};