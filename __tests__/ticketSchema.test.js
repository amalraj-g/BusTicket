import request from 'supertest';
import app from '../index.js';
import Details from '../Models/ticketSchema.js';
import { ok, notFound, badRequest, serverError, unAuthorized } from '../default/constantvalue.js';
import auth from '../middleware/auth.js';


jest.mock('../Models/ticketSchema.js');

describe('Bus API', () => {
  let busData = {
    message: 'a ticket',
    contactno: 9899000001,
    busname: 'pallavan',
    busno: 9700,
    seatno: 14,
    totalseats: 20,
    amount: 250,
    is_booked: true,
    from: 'madurai',
    to: 'salem'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /ticket/', () => {
    it('should return all buses details', async () => {
      const mockedBusDetails = jest.spyOn(Details, 'find');
      mockedBusDetails.mockResolvedValue([busData]);

      const response = await request(app).get('/ticket/');

      expect(response.status).toBe(ok);
      expect(response.body).toEqual([busData]);
      expect(mockedBusDetails).toHaveBeenCalledTimes(1);
    });
  });


  describe('POST /ticket/mybus/', () => {
    it('should create a new bus details', async () => {
      const mockedBusSave = jest.spyOn(Details.prototype, 'save');
      mockedBusSave.mockResolvedValue(busData);

      const response = await request(app)
        .post('/ticket/mybus/')
        .send(busData);

      expect(response.status).toBe(ok);
      expect(response.body).toEqual(busData);
      expect(mockedBusSave).toHaveBeenCalledTimes(1);
    });

    it('should return validation error when required fields are missing', async () => {
      const response = await request(app)
        .post('/ticket/mybus/')
        .send({});

      expect(response.status).toBe(badRequest);
      expect(response.body).toEqual({ message: "All fields are required" });
    });
  });


  describe('Patch /ticket/admin/:id',auth, () => {
    it('should update a specific bus with the provided Id', async () => {
      const mockedBusDetails = jest.spyOn(Details, 'findByIdAndUpdate');
      mockedBusDetails.mockResolvedValue(busData);

      const response = await request(app)
        .patch('/ticket/admin/1')
        .send(busData);

      expect(response.status).toBe(ok);
      expect(response.body).toEqual(busData);
      expect(mockedBusDetails).toHaveBeenCalledWith('1', busData, { new: true });
      expect(mockedBusDetails).toHaveBeenCalledTimes(1);
    });
  });


  describe('DELETE /ticket/mybus/:id', () => {
    it('should delete a specific bus with the provided Id', async () => {
      const mockedBus = {
        deleteOne: jest.fn().mockResolvedValue({}),
      };

      Details.findById.mockResolvedValue(mockedBus);

      const response = await request(app).delete('/ticket/mybus/1');

      expect(response.status).toBe(ok);
      expect(response.body).toEqual({ message: 'deleted successfully' });
      expect(Details.findById).toHaveBeenCalledWith('1');
      expect(mockedBus.deleteOne).toHaveBeenCalledTimes(1);
      expect(mockedBus.deleteOne).toHaveBeenCalledWith({ _id: '1' });
    });
  });

});