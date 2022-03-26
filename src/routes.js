const router = require("express").Router();
const {
  sellSingleTicket,
  sellBulkTicket,
  findAll,
  findByTicketId,
  findTicketByUsername,
  updateTicketById,
  updateTicketByUsername,
  deleteTicketById,
  deleteTicketByUsername,
  drawWinners,
} = require("./controller");

router.route("/t/:id").get(findByTicketId).put(updateTicketById).delete(deleteTicketById);

router.route("/u/:username").get(findTicketByUsername).put(updateTicketByUsername).delete(deleteTicketByUsername);

router.post("/bulk", sellBulkTicket);
router.get("/draw", drawWinners);

router.route("/").get(findAll).post(sellSingleTicket);

module.exports = router;
