/**
 * Tickets Controller
 */

const Ticket = require('./Ticket');
const { readFile, writeFile } = require('./utils')


const tickets = Symbol('tickets')

class TicketCollection {
    constructor() {
        this[tickets] = []
    }

    /**
     * create and save a new ticket
     * @param {String} username 
     * @param {Number} price 
     * @return {Ticket}
     */
    create(username, price) {
        const ticket = new Ticket(username, price)
        this[tickets].push(ticket)
        return ticket
    }

    /**
     * retutrn all tickets from db
     * @return {Ticket[]}
     */
    find() {
        return this[tickets]
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
        )
        return ticket
    }

    /**
     * find tickets by username
     * @param {String} username 
     * @return {Ticket[]} tickets 
     */
    findByUsername(username) {
        const tickets = this[tickets].filter(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.username === username
        )
        return tickets
    }

    /**
     * update ticket by id
     * @param {String} id 
     * @param {{username: String, price: Number}} updateBody 
     * @return {Ticket} ticket
     */
    updateById(id, updateBody) {
        const ticket = this.findById(id)
        ticket.username = updateBody.username ?? ticket.username;
        ticket.price = updateBody.price ?? ticket.price;
        return ticket
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
        )
        if(index == -1) {
            return false
        } else {
            this[tickets].splice(index, 1);
            return true
        }
    }
}

const collection = new TicketCollection;

