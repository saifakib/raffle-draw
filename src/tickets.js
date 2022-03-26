/**
 * Tickets Controller
 */

const Ticket = require("./Ticket");
const { readFile, writeFile } = require("./utils");

const tickets = Symbol("tickets");

class TicketCollection {
  constructor() {
    (async function () {
      this[tickets] = await readFile();
    }.bind(this))();
  }

  /**
   * create and save a new ticket
   * @param {String} username
   * @param {Number} price
   * @return {Ticket}
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this[tickets].push(ticket);
    console.log(this[tickets].length)
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * create bulk ticket
   * @param {String} username
   * @param {Number} price
   * @param {Number} quantity
   * @return {Ticket[]}
   */
  createBulk(username, price, quantity) {
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      tickets.push(ticket);
    }
    return tickets;
  }

  /**
   * retutrn all tickets from db
   * @return {Ticket[]}
   */
  find() {
    return this[tickets];
  }

  /**
   * find ticket by id
   * @param {String} id
   * @return {Ticket}
   */
  findById(id) {
    const ticket = this[tickets].find(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === id
    );
    return ticket;
  }

  /**
   * find tickets by username
   * @param {String} username
   * @return {Ticket[]} tickets
   */
  findByUsername(username) {
    const userTickets = this[tickets].filter(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.username === username
    );
    return userTickets;
  }

  /**
   * update ticket by id
   * @param {String} id
   * @param {{username: String, price: Number}} updateBody
   * @return {Ticket} ticket
   */
  updateById(id, updateBody) {
    const ticket = this.findById(id);
    ticket.username = updateBody.username ?? ticket.username;
    ticket.price = updateBody.price ?? ticket.price;
    ticket.updatedAt = new Date();
    writeFile(this[tickets]);
    return ticket;
  }

  /**
   * update bulk ticket
   * @param {String} username
   * @param {{username: String, price: Number}} ticketsbody
   * @return {Ticket[]}
   */
  updateBulk(username, ticketsbody) {
    const userTickets = this.findByUsername(username);
    const updatedTickets = userTickets.map(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => this.updateById(ticket.id, ticketsbody)
    );
    return updatedTickets;
  }

  /**
   * delete ticket by id
   * @param {String} id
   * @return {Boolean}
   */
  deleteById(id) {
    const index = this[tickets].findIndex(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => ticket.id === id
    );
    if (index == -1) {
      return false;
    } else {
      this[tickets].splice(index, 1);
      writeFile(this[tickets]);
      return true;
    }
  }

  /**
   * delete bulk tickets by usernamr
   * @param {String} username
   * @return {Boolean[]}
   */
  deleteBulk(username) {
    const userTickets = this.findByUsername(username);
    const deleteTickets = userTickets.map(
      /**
       * @param {Ticket} ticket
       */
      (ticket) => this.deleteById(ticket.id)
    );
    return deleteTickets;
  }

  /**
   * find winners
   * @param {Number} winnerCount
   * @return {Ticket[]}
   */
  drwa(winnerCount) {
    const winnerIndexs = new Array(winnerCount);

    let index = 0;
    while (index < winnerCount) {
      const ticketIndex = Math.floor(Math.random() * this[tickets].length);
      if (!winnerIndexs.includes(ticketIndex)) {
        winnerIndexs[index++] = ticketIndex;
        continue;
      }
    }
    const winners = winnerIndexs.map(
      /**
       * @param {Number} index
       */
      (index) => this[tickets][index]
    );

    return winners;
  }
}

const ticketCollection = new TicketCollection();

module.exports = ticketCollection;
