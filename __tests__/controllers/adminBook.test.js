
import Details from '../../Models/ticketSchema.js';
import { ok, notFound, conflict, created } from '../../default/constantvalue.js';
import { availableTickets, printbookedTicket, createReservation, updateReservation,  deleteReservation, busDetails } from '../../Controllers/adminBook.js';
import request from 'supertest';
import mongoose from 'mongoose';


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



jest.mock('../../Models/ticketSchema.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('createReservation', () => {
  it('should create a new reservation', async () => {
    const saveMock = jest.fn().mockResolvedValueOnce({ _id: '1',  busname: String,
    busno: Number,
    seatno: Number,
    totalseats: Number, });
    Details.mockImplementationOnce(() => ({
      save: saveMock,
    }));

    const req = {
      body: {
        busname: String,
            busno: Number,
            seatno: Number,
            totalseats: Number,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createReservation(req, res);

    //expect(Details).toHaveBeenCalledTimes(1);
    expect(Details).toHaveBeenCalledWith({
      busname: String,
            busno: Number,
            seatno: Number,
            totalseats: Number,
      createdAt: expect.any(String),
    });

    expect(saveMock).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: '1', busname: String,
    busno: Number,
    seatno: Number,
    totalseats: Number, });
  });

  it('should handle errors', async () => {
    const errorMessage = 'An error occurred.';
    Details.mockImplementationOnce(() => ({
      save: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
    }));

    const req = {
      body: {
        busname: String,
            busno: Number,
            seatno: Number,
            totalseats: Number,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createReservation(req, res);

    //expect(Details).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});


jest.mock('mongoose', () => ({
  Types: {
    ObjectId: {
      isValid: jest.fn(),}
  },
}));
jest.mock('../../Models/ticketSchema.js', () => ({
  __esModule: true,
  default: jest.fn(),
 }));
 beforeEach(() => {
  jest.clearAllMocks();
});

describe('updateReservation', () => {
  it('should update a reservation', async () => {
    console.log('########', mongoose.Types.ObjectId)
    const validId = '644a74544c490973217ea6fa';
    
    const updatedReservation = {
      _id: validId,
      busname: 'New Bus Name',
      from: 'New From Location',
      to: 'New To Location',
      message: 'New Message',
      is_booked: true,
      contactno: '1234567890',
      busno: 'New Bus No',
      seatno: 'New Seat No',
      totalseats: 10,
    };
    console.log('########', mongoose.Types.ObjectId.isValid)
    mongoose.Types.ObjectId.isValid.mockResolvedValue(true)
    Details.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(updatedReservation)

    const req = {
      params: {
        id: validId,
      },
      body: updatedReservation,
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await updateReservation(req, res);
    expect(Details.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(Details.findByIdAndUpdate).toHaveBeenCalledWith(validId, updatedReservation, { new: true });

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(updatedReservation);
  });

it('should return notFound status if id is invalid', async () => {
    const invalidId = 'invalid-id';
    
    const req = {
      params: {
        id: invalidId,
      },
      body: {},
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mongoose.Types.ObjectId.isValid.mockResolvedValue(false);
    await updateReservation(req, res);
    
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith(`No book with id: ${invalidId}`);
  });
});







