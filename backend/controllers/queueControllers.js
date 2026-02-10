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


