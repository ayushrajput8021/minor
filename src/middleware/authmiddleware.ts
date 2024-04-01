import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user';

dotenv.config();

const secret: string = process.env.ACCESS_TOKEN || 'default-secret';

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        let decodedUser: any;
        try {
            decodedUser = jwt.verify(token, secret);
        } catch (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
				console.log('decodedUser:', decodedUser)
        const userExist = await User.findOne({
            where: { id: decodedUser.id || '' },
        });

        if (!userExist) {
            return res.status(404).json({ message: 'User not exists' });
        }

        // Add the user object to the request for further processing if needed
        req.user = decodedUser.id;

        next();
    } catch (err) {
        console.log('Error in Login', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
