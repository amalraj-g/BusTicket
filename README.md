                                    "# BusTicket #" 

`~Functionalities included in this code as of now 

*** 1.booking a ticket ***

*** 2.signup and signin  ***

*** 3.Displaying all the tickets. ***

*** 4.displaying the tickets which are booked. *** 

*** 5.displaying the tickets which are not booked. *** 

*** 6.updating the booked ticket details. *** 

*** 7.cancelling the ticket *** 

*** 8.displaying the ticket details of a single id *** 

~API DOCS:

````POST :'/createReservation'````

-> saving the ticket object in the ticket collection, only when the document count is less than 20 and user receives a confirmation mails with seat no with the registered email id.

-> returns 200, if success otherwise returns 400 with an error in the format {message:"error details"}

````POST :'/login'```

->logging into to acceses authentication,only when used correct credentials.

-> returns 200, if success otherwise returns 400 with an error in the format {message:"error details"}

````GET : '/busDetails'````

->returns all the tickets

->returns 200, if success otherwise returns 400 with an error in the format {message:"error details"}

````GET :'/availableTickets'```

->returns all the tickets which are open

->returns 200, if success otherwise returns 400 with an error in the format {message:"error details"}

````GET :'/ticket/:ticket_id'````

->returns the status of a ticket, whether it is booked or not

->returns 200, if success otherwise returns 400 with an error in the format {message:"error details"}

````GET:'/:t_id'````

-> returns the single ticket document with the help of ID

->returns 200, if success otherwise returns 400 with an error in the format {message:"error details"}

````DELETE : '/deleteReservation'````

->delete's the ticket, where ID is requested of that ticket and sends cancellation mail to registered email id associated with the ID

->returns 200, if success otherwise returns 400 with an error in the format {message:"error details"}

````PATCH :'/updateReservation'````

-> updates the ticket details with the help of ID, where ID is requested

->returns 200, if success otherwise returns 400 with an error in the format {message:"error details"}

