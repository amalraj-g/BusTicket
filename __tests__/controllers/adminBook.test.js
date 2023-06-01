import mongoose from 'mongoose';
import request from 'supertest';
import Details from '../../Models/ticketSchema.js';
import { ok, notFound, conflict, created } from '../../default/constantvalue.js';
import { availableTickets, printbookedTicket, createReservation, updateReservation,  deleteReservation, busDetails } from '../../Controllers/adminBook.js';import express from 'express';
import auth from '../../middleware/auth.js';

jest.mock('mongoose');
jest.mock('jsonwebtoken');
jest.mock('../../Models/ticketSchema.js',() => ({
  find: jest.fn(),
  }));

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





jest.mock('../../Models/ticketSchema.js'); // Replace 'your-details-model' with the actual path to your model

describe('printbookedTicket', () => {
  let req, res;

  beforeEach(() => {
    req = {}; // Mock the request object as per your requirements
    res = {
      status: jest.fn(() => res),
      json: jest.fn()
    }; // Mock the response object with necessary methods
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('should respond with booked tickets if found', async () => {
    const bookedTickets = [{ ticketId: 1 }, { ticketId: 2 }];
    Details.find.mockResolvedValue(bookedTickets);

    await printbookedTicket(req, res);

    expect(Details.find).toHaveBeenCalledWith({ is_booked: true });
    expect(res.status).toHaveBeenCalledWith(ok);
    expect(res.json).toHaveBeenCalledWith(bookedTickets);
  });

  test('should respond with an error if an exception is thrown', async () => {
    const errorMessage = 'Some error message';
    Details.find.mockRejectedValue(new Error(errorMessage));

    await printbookedTicket(req, res);

    expect(Details.find).toHaveBeenCalledWith({ is_booked: true });
    expect(res.status).toHaveBeenCalledWith(notFound);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});


