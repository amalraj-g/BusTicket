/**
 * @swagger
 * /user/signUp:
 *   post:
 *     summary: signup a new user
 *     description: Use this endpoint to signup a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               id:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registration successful
 *       400:
 *         description: Bad Request 
 *       404:
 *         description: notFound
 *       500:
 *         description: Internal server error
 */

/**
 * 
 * @swagger
 * /user/logIn:
 *   post:
 *     summary: Login a user
 *     description: Login a user with email and password
 *     tags: [Users]
 *     requestBody:
 *       description: Login user with email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: login successful
 *       400:
 *         description: Bad Request 
 *       404:
 *         description: notFound
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /ticket/:
 *   get:
 *     summary: Get all bus ticket details
 *     description: Returns a list of all available buses.
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *       400:
 *         description: Bad request 
 */

/**
 * @swagger
 * /ticket/admin:
 *   get:
 *     summary: Get all booked ticket list
 *     description: Returns a list of all  buses.
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *       400:
 *         description: Bad request 
 */
/**
 * @swagger
 * /ticket/admin/mybus:
 *   get:
 *     summary: Get available  bus ticket list
 *     description: Returns a list of all available buses.
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *             type: array
 *       400:
 *         description: Bad request 
 */


/**
 * @swagger
 * /ticket/mybus:
 *   post:
 *     summary: Create a new bus ticket
 *     description: Create a new bus record with the given details
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busno:
 *                 type: integer
 *               busname:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *               is_booked:
 *                 type: boolean
 *             example:
 *               busno: "8796"
 *               busname: "jayavilas"
 *               from: "Mumbai"
 *               to: "Pune"
 *               message: "ready"
 *               totalSeats: 30
 *               
 *     responses:
 *       201:
 *         description: Bus details created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the newly created bus record
 *                 busno:
 *                   type: integer
 *                 busname:
 *                   type: string
 *                 from:
 *                   type: string
 *                 to:
 *                   type: string
 *                 message:
 *                   type: string
 *                 totalSeats:
 *                   type: integer
 *                 is_booked:
 *                   type: boolean
 *               example:
 *                 _id: "609170d64c9ac313185ddca4"
 *                 busno: 8796
 *                 busname: "jayavilas"
 *                 from: "Mumbai"
 *                 to: "Pune"
 *                 message: "ready"
 *                 totalSeats: 30
 *            
 *       400:
 *         description: Bad request 
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /ticket/admin:
 *  post:
 *     summary: Create a new bus ticket
 *     description: Create a new bus record with the given details
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busno:
 *                 type: integer
 *               busname:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *               is_booked:
 *                 type: boolean
 *             example:
 *               busno: "8796"
 *               busname: "jayavilas"
 *               from: "Mumbai"
 *               to: "Pune"
 *               message: "ready"
 *               totalSeats: 30
 *               
 *     responses:
 *       201:
 *         description: Bus details created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the newly created bus record
 *                 busno:
 *                   type: integer
 *                 busname:
 *                   type: string
 *                 from:
 *                   type: string
 *                 to:
 *                   type: string
 *                 message:
 *                   type: string
 *                 totalSeats:
 *                   type: integer
 *                 is_booked:
 *                   type: boolean
 *               example:
 *                 _id: "609170d64c9ac313185ddca4"
 *                 busno: 8796
 *                 busname: "jayavilas"
 *                 from: "Mumbai"
 *                 to: "Pune"
 *                 message: "ready"
 *                 totalSeats: 30
 *            
 *       400:
 *         description: Bad request 
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /ticket/admin/{id}:
 *   patch:
 *     summary: Update bus details
 *     description: Update the details of an existing bus
 *     tags: [Tickets] 
 *     parameters:
 *       - in: path
 *         name: id
 *         description: update the id of bus ticket
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New bus details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busno:
 *                 type: integer
 *               busname:
 *                 type: string
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *               is_booked:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Bus details updated successfully
 *       404:
 *         description: Not found bus details
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 *
 * /ticket/mybus/{id}:
 *   delete:
 *     summary: Delete bus details by user
 *     description: Delete bus details based on ID
 *     tags: [Tickets] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the bus to delete
 *     responses:
 *       200:
 *         description: The particular ticket was successfully deleted
 *       404:
 *         description: The bus with the specified ID was not found
 */
/**
 * @swagger
 *
 * /ticket/admin/{id}:
 *   delete:
 *     summary: Delete bus details by admin
 *     description: Delete bus details based on ID
 *     tags: [Tickets] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the bus to delete
 *     responses:
 *       200:
 *         description: The particular ticket was successfully deleted
 *       404:
 *         description: The bus with the specified ID was not found
 */