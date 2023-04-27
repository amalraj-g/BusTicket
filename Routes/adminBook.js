import express from 'express';
import { availableTickets, printbookedTicket, createReservation, updateReservation,  deleteReservation, busdetails } from '../Controllers/adminBook.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', busdetails);
router.get('/admin/mybus', availableTickets);
router.get('/admin', printbookedTicket);
router.post('/mybus', createReservation);
router.delete('/mybus',deleteReservation);
router.post('/admin', auth, createReservation);
router.patch('/admin/:id', auth, updateReservation);
router.delete('/admin/:id', auth, deleteReservation);

export default router;