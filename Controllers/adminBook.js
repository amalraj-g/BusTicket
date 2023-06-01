import express from 'express';
import mongoose from 'mongoose';

import Details from '../Models/ticketSchema.js';
import { ok, notFound, conflict, created } from '../default/constantvalue.js';
const router = express.Router();

export const busDetails= async(req, res)=>{
   try {
        const tickets=  await Details.find();
        res.status(ok).json(tickets);
   } catch(err) {
        res.status(notFound).json({message:err});
   } 
};

export const availableTickets = async (req, res ) => {
    try {
        const fromtickets=  await Details.find({is_booked:{ $ne:true}});
        res.status(ok).json(fromtickets);
    } catch (error) {
        res.status( notFound).json({ message: error.message });
    }
};

export const printbookedTicket = async (req, res ) => {
    try {
        const postReversation= await Details.find({is_booked:true});
        res.status(ok).json(postReversation);
        } catch (error) {
        res.status( notFound).json({ message: error.message });
    }
};

export const createReservation = async (req, res) => {
    const book = req.body;
    
    try {
        const newBookDetails =new  Details({ ...book ,createdAt: new Date().toISOString() });
        await newBookDetails.save();
        res.status(created).json(newBookDetails );
    } catch (error) {
        res.status(conflict).json({ message: error.message });
    }
};

export const updateReservation = async (req, res) => {
    const { id } = req.params;
    const {  busname, from, to, message, is_booked, contactno, amount, address, busno, seatno, totalseats } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status( notFound).send(`No book with id: ${id}`);
    const updateReservation = { busname, from, to, contactno, is_booked, amount, address, busno, totalseats, seatno, message , _id: id };
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