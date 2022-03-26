const ticketCollection = require("./tickets");

// sell single ticket
exports.sellSingleTicket = (req, res) => {
  const { username, price } = req.body;
  const ticket = ticketCollection.create(username, price);
  res.status(201).json({
    message: "Ticket Created Succesfully",
    ticket,
  });
};

// sell bulk tickets
exports.sellBulkTicket = (req, res) => {
  const { username, price, quantity } = req.body;
  const tickets = ticketCollection.createBulk(username, price, quantity);
  res.status(201).json({
    message: "Bulk Ticket Created Succesfully",
    tickets,
    total: tickets.length
  });
};

// find all ticket
exports.findAll = (req, res) => {
  const tickets = ticketCollection.find();
  res.status(201).json({ items: tickets, total: tickets.length });
};

// find ticket by id
exports.findByTicketId = (req, res) => {
  const { id } = req.params;
  const ticket = ticketCollection.findById(id);
  res.status(200).json({ ticket });
};

// find tickets by username
exports.findTicketByUsername = (req, res) => {
  const { username } = req.params;
  const tickets = ticketCollection.findByUsername(username);
  res.status(200).json({ items: tickets, total: tickets.length });
};

// update ticket by id
exports.updateTicketById = (req, res) => {
  const id = req.params.id;
  const ticket = ticketCollection.updateById(id, req.body);
  res.status(200).json({
    message: "Update Ticket Successfully",
    ticket,
  });
};

// update bulk ticket by username
exports.updateTicketByUsername = (req, res) => {
  const { username } = req.params;
  const ticket = ticketCollection.updateBulk(username, req.body);
  res.status(200).json({
    message: "Update Ticket Successfully",
    ticket,
  });
};

// delete ticket by id
exports.deleteTicketById = (req, res) => {
  const ticket = ticketCollection.deleteById(req.params.id);
  res.status(202).json({ ticket });
};

// delete bulk ticket by username
exports.deleteTicketByUsername = (req, res) => {
  const tickets = ticketCollection.deleteBulk(req.params.username);
  res.status(202).json({ message: "User all ticket deleted" });
};

// drwa winners
exports.drawWinners = (req, res) => {
  const wc = req.query.wc ?? 3;
  const winners = ticketCollection.drwa(wc);
  res.status(200).json({ winners });
};
