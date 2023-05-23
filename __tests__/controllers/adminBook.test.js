import Details from '../../Models/ticketSchema.js';
import { ok, notFound, conflict, created } from '../../default/constantvalue.js';
import { availableTickets, printbookedTicket, createReservation, updateReservation,  deleteReservation, busDetails } from '../../Controllers/adminBook.js';import express from 'express';
import auth from '../../middleware/auth.js';


describe('busDetails', () => {
  it('should return tickets', async () => {
        const mockTickets = [{
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
        }];
    Details.find = jest.fn().mockResolvedValue(mockTickets);

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await busDetails({}, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(ok);
    expect(mockRes.json).toHaveBeenCalledWith(mockTickets);
  });

  it('should handle error', async () => {
    const mockError = 'Some error message';
    Details.find = jest.fn().mockRejectedValue(mockError);

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await busDetails({}, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(notFound);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError });
  });
});




