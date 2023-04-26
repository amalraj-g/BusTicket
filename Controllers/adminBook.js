import express from 'express';
import mongoose from 'mongoose';

import Details from '../Models/ticketSchema.js';
import { ok, notFound, conflict, created } from '../default/constantvalue.js';
const router = express.Router();

export const printTicket = async (req, res ) => {
    try {
        const postReversation= await Details.find();
        res.status(ok).json(postReversation);
            
    }
    catch (error) {
        res.status( notFound).json({ message: error.message });
    
    }
};


export const createReservation = async (req, res) => {
    const book = req.body;

    const newBookDetails = new Details({ ...book ,createdAt: new Date().toISOString() });

    try {
        await newBookDetails.save();

        res.status(created).json(newBookDetails );
    } catch (error) {
        res.status(conflict).json({ message: error.message });
    }
};

export const updateReservation = async (req, res) => {
    const { id } = req.params;
    const {  name,from,to,message, contact, amount, address, busno, seats, selectedFile} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status( notFound).send(`No book with id: ${id}`);

    const updateReservation = { name,from,to,contact,amount, address, busno, seats, message ,selectedFile, _id: id };

    await Details.findByIdAndUpdate(id, updateReservation, { new: true });

    res.json(updateReservation);
};

export const deleteReservation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status( notFound).send(`No book  with id: ${id}`);

    await Details.findByIdAndRemove(id);

    res.json({ message: 'Reservation deleted successfully.' });
};




export default router;