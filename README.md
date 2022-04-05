# Raffle Draw
Ticket based raffle draw project where user can buy a or multiple tickets with price. 
#### Explain
- Create a ticket instance object from Ticket Class.
- Another TicketCollection Class which have crud, search, filtering facilities.
- From Controller have to write operation using TicketCollection instance.
- Using one TicketCollection instance in whole system.
- Data store in `db.json` file using file system.

#### API Endpoint
- `GET` `/api/v1/tickets`
- `POST` `/api/v1/tickets`
```sh
Content-Type: application/json
{
    "username": "akibsaif",
    "price": 200
}
```
- `GET` `/api/v1/tickets/t/{id}`
- `PUT` `/api/v1/tickets/t/{id}`
```sh
Content-Type: application/json
{
    "username": "akib",
    "price": 200
}
```
- `DELETE` `/api/v1/tickets/t/{id}`
- `GET` `/api/v1/tickets/u/{username}`
- `PUT` `/api/v1/tickets/u/{username}`
```sh
Content-Type: application/json

{
    "username": "Saifs",
    "price": 200
}
```
- `DELETE` `http://localhost:8000/api/v1/tickets/u/{username}`
- `POST` `http://localhost:8000/api/v1/tickets/bulk`
```sh
Content-Type: application/json

{
    "username": "rrr",
    "price": 300,
    "quantity": 3
}
```
- `GET` `http://localhost:8000/api/v1/tickets/draw?{wc={number}}`



