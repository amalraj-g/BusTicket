import bcrypt from 'bcryptjs';
import  user from '../Models/user.js';
import { ok, notFound, badRequest, serverError, unAuthorized } from '../default/constantvalue.js';
import { userSignIn, userSignUp } from '../Controllers/user.js';


jest.mock( '../Models/user.js');
jest.mock('bcryptjs');

describe('userSignUp', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should register a new user', async () => {
        const req = {
            body: {
                
                email: 'johndoe@example.com',
                password: 'password123',
               
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const expectedUser = {
            
            email: req.body.email,
            password: hashedPassword,
            
        };

        user.findOne.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue(hashedPassword);
        user.create.mockResolvedValue(expectedUser);

        await userSignUp(req, res);

        expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 12);
        expect(user.create).toHaveBeenCalledWith(expectedUser);
        expect(res.status).toHaveBeenCalledWith(created);
        expect(res.json).toHaveBeenCalledWith(expectedUser);
    });

    test('should return a validation error if any field is missing on user registering process', async () => {
        const req = {
            body: {
                
                password: 'password123',
                
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userSignUp(req, res);

        expect(res.status).toHaveBeenCalledWith(badRequest);
        expect(res.json).toHaveBeenCalledWith({ message: 'All fields are mandatory' });
    });

    test('should return a validation error if user already exists', async () => {
        const req = {
            body: {
               
                email: 'johndoe@example.com',
                password: 'password123',
                
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        user.findOne.mockResolvedValue({ email: req.body.email });

        await userSignUp(req, res);

        expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.status).toHaveBeenCalledWith(badRequest);
        expect(res.json).toHaveBeenCalledWith({ message: 'You are already registered' });
    });
});


describe('userSignIn', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return 400 if email or password is missing on user login process', async () => {
        const req = { 
            body: {
                email: 'test@example.com'
        }};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await userSignIn(req, res);

        expect(res.status).toHaveBeenCalledWith(badRequest);
        expect(res.json).toHaveBeenCalledWith({ message: 'All fields are mandatory!' });
    });

    test('should return 401 if user is not found', async () => {
        const req = {
            body: {
            email: 'test@example.com',
            password: 'password'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    user.findOne.mockResolvedValue(null);
    await userSignIn(req, res);

    expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(unAuthorized);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });


    test('should return 401 if password is incorrect from user', async () => {
        const req = {
            body: {
            email: 'test@example.com',
            password: 'password'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockUser = {
        _id: '123',
        email: 'test@example.com',
        password: '123456', // hashed "password"
        role: 'user'
    };
    user.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await userSignIn(req, res);

    expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
    expect(res.status).toHaveBeenCalledWith(unAuthorized);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });

    test('should return 200 with successfully login message for admin user', async () => {
        const req = {
            body: {
            email: 'admin@example.com',
            password: 'password'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockUser = {
        _id: '123',
        email: 'admin@example.com',
        password:'123456', // hashed "password"
        role: 'admin'
    };

    user.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    await userSignIn(req, res);

    expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
    expect(res.status).toHaveBeenCalledWith(ok);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful - Admin' });
    });

    test('should return 200 with successfully login message for normal user', async () => {
        const req = {
            body: {
            email: 'user@example.com',
            password: 'password'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    const mockUser = {
        _id: '123',
        email: 'user@example.com',
        password: '123456', // hashed "password"
        role: 'user'
    };

    user.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    await userSignIn(req, res);

    expect(user.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
    expect(res.status).toHaveBeenCalledWith(ok);
    expect(res.json).toHaveBeenCalledWith({ message: 'Login successful - Normal user' });
    });
});