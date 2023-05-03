import express from 'express';
import { availableTickets, printbookedTicket, createReservation, updateReservation,  deleteReservation, busDetails } from '../Controllers/adminBook.js';
import auth from '../middleware/auth.js';
const router = express.Router();


router.get('/', busDetails);
router.get('/admin/mybus', availableTickets);
router.get('/admin', printbookedTicket);
router.post('/mybus', createReservation);
router.delete('/mybus/:id',deleteReservation);
router.post('/admin', auth, createReservation);
router.patch('/admin/:id', auth, updateReservation);
router.delete('/admin/:id', auth, deleteReservation);

export default router;