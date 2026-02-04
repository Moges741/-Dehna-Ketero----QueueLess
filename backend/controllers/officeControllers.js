import { StatusCodes } from "http-status-codes";
import xss from "xss";
import dbConnection from "../config/db.js";

export const createOffice = async (req, res) =>{
    try{
        let {name, city, address, phone} = req.body;

        name = xss(name?.trim());
        city = xss(city?.trim());
        address = xss(address?.trim());
        phone = xss(phone?.trim());

        if(!name || !address || !city){
            return res.status(StatusCodes.BAD_REQUEST).json({
            msg: "Name, city and address are required",
            });
        }
        
const query = `
      INSERT INTO offices (name, city, address, phone)
      VALUES (?, ?, ?, ?)
    `;
           db.query(query, [name, city, address, phone || null], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          msg: "Failed to create office",
        });
      }

      return res.status(StatusCodes.CREATED).json({
        msg: "Office created successfully",
        officeId: result.insertId,
      });
    });
    }catch(error){
           console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Server error",
    });
    }
}
/**
 * GET ALL OFFICES
 */
export const getAllOffices = async (req, res) => {
  try {
    const query = `
      SELECT * FROM offices
      ORDER BY created_at DESC
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          msg: "Failed to fetch offices",
        });
      }

      res.status(StatusCodes.OK).json({
        count: results.length,
        offices: results,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Server error",
    });
  }
};


/**
 * GET OFFICE BY ID
 */

export const getOfficeById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM offices WHERE id = ? LIMIT 1`;

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          msg: "Database error",
        });
      }

      if (results.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          msg: "Office not found",
        });
      }

      res.status(StatusCodes.OK).json(results[0]);
    });

    }catch (error){
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Server error",
    });

    }
};

/**
 * UPDATE OFFICE
 */

export const updateOffice = async (req, res) =>{
    try{
        const {id} = req.params;
        let  {name, city, address, phone} = req.body;

        name = xss(name?.trim());
        city = xss(city?.trim());
        address = xss(address?.trim());
        phone = xss(phone?.trim());

const query = `
      UPDATE offices
      SET name=?, city=?, address=?, phone=?
      WHERE id=?
    `;
db.query(query, [name, city, address, phone || null, id], (err, result) =>{
    if(err){
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          msg: "Failed to update office",
        })
    }
    res.status(StatusCodes.OK).json({
        msg: "Office updated successfully",
    });
});
}catch(error){
        console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Server error",
    });
}
};

