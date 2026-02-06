import dbConnection from "../config/db";
import { StatusCodes } from "http-status-codes";



const isStaffOrAdmin = (role) => {
  return role === "admin" || role === "staff" || role === "manager";
};

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
 dbConnection.query(lastTicketQuery, [service_id, today], (err, result) => {
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
       dbConnection.query(
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


    dbConnection.query(sql, [userId], (err, results) => {
      if (err) return res.status(500).json({ msg: "DB Error" });

      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const getTicketsByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const today = new Date().toISOString().split("T")[0];

    const sql = `
      SELECT * FROM tickets
      WHERE service_id = ? AND queue_date = ?
      AND status IN ('waiting','serving')
      ORDER BY ticket_number ASC
    `;

    dbConnection.query(sql, [serviceId, today], (err, results) => {
      if (err) return res.status(500).json({ msg: "DB Error" });

      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const getSingleTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const sql = `SELECT * FROM tickets WHERE id = ?`;

    dbConnection.query(sql, [ticketId], (err, result) => {
      if (err) return res.status(500).json({ msg: "DB Error" });

      if (result.length === 0) {
        return res.status(404).json({ msg: "Ticket not found" });
      }

      res.json(result[0]);
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const updateTicketStatus = async (req, res) => {
  try {
    if (!isStaffOrAdmin(req.user.role)) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const { ticketId } = req.params;
    const { status } = req.body;

    const sql = `
      UPDATE tickets
      SET status = ?
      WHERE id = ?
    `;

    dbConnection.query(sql, [status, ticketId], (err) => {
      if (err) return res.status(500).json({ msg: "DB Error" });

      res.json({ msg: "Ticket status updated" });
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
