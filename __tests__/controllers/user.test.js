import bcrypt from 'bcryptjs';
import { userSignIn, userSignUp } from '../../Controllers/user.js';
import User from '../../Models/user.js';
import jwt from 'jsonwebtoken';


jest.mock( '../../Models/user.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('userSignUp', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'user',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new user and return the result', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword');
    User.create.mockResolvedValue({ email: 'test@example.com' });

    await userSignUp(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
    expect(User.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'hashedPassword',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: { email: 'test@example.com' } });
  });

  it('should return an error if the user already exists', async () => {
    User.findOne.mockResolvedValue({ email: 'test@example.com' });

    await userSignUp(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'user does not exist' });
  });

  it('should return an error if passwords do not match', async () => {
    req.body.confirmPassword = 'differentPassword';

    await userSignUp(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'passwords do not match' });
  });

  it('should return a server error message if an error occurs', async () => {
    User.findOne.mockRejectedValue(new Error('Something went wrong'));

    await userSignUp(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'something went wrong' });
  });
});



describe('userSignIn', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should sign in admin user and return a token', async () => {
    const existingUser = {
      email: 'test@example.com',
      role: 'admin',
      password: 'hashedPassword',
      _id: 'adminId',
    };
    User.findOne.mockResolvedValue(existingUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token');

    await userSignIn(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: 'test@example.com', id: 'adminId' },
      process.env.SECRET,
      { expiresIn: '1hr' }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'token' });
  });

  it('should sign in regular user and return a success message', async () => {
    const existingUser = {
      email: 'test@example.com',
      role: 'user',
      password: 'hashedPassword',
    };
    User.findOne.mockResolvedValue(existingUser);
    bcrypt.compare.mockResolvedValue(true);

    await userSignIn(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'login by user' });
  });

  it('should return an error if the user does not exist', async () => {
    User.findOne.mockResolvedValue({ role: null });

    await userSignIn(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'user does not exist' });
  });

  it('should return an error if the password is incorrect', async () => {
    const existingUser = {
      email: 'test@example.com',
      role: 'admin',
      password: 'hashedPassword',
    };
    User.findOne.mockResolvedValue(existingUser);
    bcrypt.compare.mockResolvedValue(false);

    await userSignIn(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credential' });
  });

  it('should return a server error message if an error occurs', async () => {
    User.findOne.mockRejectedValue(new Error('Something went wrong'));

    await userSignIn(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'something went wrong' });
  });
});
