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
