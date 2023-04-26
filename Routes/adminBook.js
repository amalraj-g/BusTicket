import express from 'express';

import { printTicket, createReservation, updateReservation,  deleteReservation } from '../Controllers/adminBook.js';

const router = express.Router();
import auth from '../middleware/auth.js';

router.get('/', printTicket);
router.post('/', auth, createReservation);
router.patch('/:id', auth, updateReservation);
router.delete('/:id', auth, deleteReservation);

export default router;