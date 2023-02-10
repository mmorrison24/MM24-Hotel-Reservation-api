# Reservation API

## Pre-reqs

- Install [Node.js](https://nodejs.org/en/)
- Install [mongodb](https://www.mongodb.com/docs/manual/installation/)

## Getting started

Install dependencies

```
cd <project_name>
npm install
```

Build and run the project

```
npm run dev

```

Use Postman collection to interact with routes ```./reservation-api.postman_collection.json```

### Routes
GET
getAllGuests
getGuestSummary [byId]

POST
post Guests - create

### Reservations
GET
getAllReservations
getAllReservation [byID]
searchReservation [byDate]

POST
createReservation and Create Guest by Name
createReservations [byID]

PATCH
cancelReservation [byID]

## Caveats and Notes
Enjoyed the project, I wanted to try and leverage Prisma which is new for me.
In a production product I would likely leverage Mongoose to leverage with MogoDb , I noticed a few places where Mongo had native idiomas that would have simplifed code. 

In terms of testing, I keep that light, in an actual product I would focus my testing efforts on some of the more complicated routes, ```cancelReservation``` , ```createReservationandCreateGuest [byName]```

Another thing to consider is the amount of internal data to be returned by the API, depending on the API consumer we would want to create a seperate unrelated set of ID's for security and convenience


