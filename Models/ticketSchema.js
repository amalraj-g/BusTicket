import mongoose from 'mongoose';

const TicketSchema =new  mongoose.Schema({
    message: String,
    contactno: Number,
    busname: String,
    busno: Number,
    seatno: Number,
    totalseats: Number,
    amount: Number,
    is_booked: Boolean,
    selectedFile: String,
    from: String,
    to: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Details = mongoose.model('Details', TicketSchema);
export default Details;