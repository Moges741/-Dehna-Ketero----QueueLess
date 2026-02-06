import dbConnection from "../config/db";
import { StatusCodes } from "http-status-codes";

export const createTicket = async (req, res) => {
    try {
    const userId = req.userId;
    const { office_id, service_id } = req.body;
        if (!office_id || !service_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Office and Service required"
      });

    }
        const today = new Date().toISOString().split("T")[0];

        // Get last ticket number today
    const lastTicketQuery = `
      SELECT ticket_number FROM tickets
      WHERE service_id = ? AND queue_date = ?
      ORDER BY ticket_number DESC
      LIMIT 1
    `;
 db.query(lastTicketQuery, [service_id, today], (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "DB Error" });
      }

      let nextNumber = 1;
      if (result.length > 0) {
        nextNumber = result[0].ticket_number + 1;
      }

      const insertQuery = `
        INSERT INTO tickets
        (user_id, office_id, service_id, ticket_number, queue_date)
        VALUES (?, ?, ?, ?, ?)
      `;
       db.query(
        insertQuery,
        [userId, office_id, service_id, nextNumber, today],
        (err, insertResult) => {
          if (err) {
            return res.status(500).json({ msg: "Insert failed" });
          }

          res.status(StatusCodes.CREATED).json({
            msg: "Ticket created",
            ticketNumber: nextNumber,
            ticketId: insertResult.insertId
          });
        }
      );
    });
    } catch (error) {
            res.status(500).json({ msg: "Server error" });

    }
}
// get my ticket
export const getMyTickets = async (req, res) => {
  try {
    const userId = req.user.userId;

    const sql = `
      SELECT * FROM tickets
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;


    db.query(sql, [userId], (err, results) => {
      if (err) return res.status(500).json({ msg: "DB Error" });

      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
