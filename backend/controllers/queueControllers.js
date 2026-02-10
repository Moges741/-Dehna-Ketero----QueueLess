import db from "../config/db.js";


const isStaff = (role) => {
  return role === "admin" || role === "staff" || role === "manager";
};

export const getQueueStatus = (req, res) => {
  const { serviceId } = req.params;
  const today = new Date().toISOString().split("T")[0];

  const sql = `
    SELECT * FROM queue_state
    WHERE service_id = ? AND queue_date = ?
  `;

  db.query(sql, [serviceId, today], (err, result) => {
    if (err) return res.status(500).json({ msg: "DB error" });

    res.json(result[0] || {});
  });
};
export const callNextTicket = (req, res) => {
  if (!isStaff(req.user.role)) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  const { service_id, office_id } = req.body;
  const today = new Date().toISOString().split("T")[0];

  const stateQuery = `
    SELECT * FROM queue_state
    WHERE service_id = ? AND queue_date = ?
  `;

  db.query(stateQuery, [service_id, today], (err, stateResult) => {
    if (err) return res.status(500).json({ msg: "DB error" });

    let currentNumber = 0;

    if (stateResult.length === 0) {
      const insertState = `
        INSERT INTO queue_state
        (office_id, service_id, queue_date, current_ticket_number)
        VALUES (?, ?, ?, 0)
      `;

      db.query(insertState, [office_id, service_id, today]);
    } else {
      currentNumber = stateResult[0].current_ticket_number;
    }

    const nextNumber = currentNumber + 1;

    const updateState = `
      UPDATE queue_state
      SET current_ticket_number = ?, last_called_at = NOW()
      WHERE service_id = ? AND queue_date = ?
    `;

    db.query(updateState, [nextNumber, service_id, today]);

    const updateTicket = `
      UPDATE tickets
      SET status = 'serving'
      WHERE service_id = ?
      AND ticket_number = ?
      AND queue_date = ?
    `;

    db.query(updateTicket, [service_id, nextNumber, today]);

    res.json({
      msg: "Next ticket called",
      ticketNumber: nextNumber
    });
  });
};


