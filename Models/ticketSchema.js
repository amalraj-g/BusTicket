import mongoose from 'mongoose';

const TicketSchema =new  mongoose.Schema({
    message: String,
    address: String,
    contact: Number,
    name: String,
    busno: Number,
    seats: Number,
    amount: Number,
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