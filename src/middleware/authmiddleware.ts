import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
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
		const authHeader = req?.headers?.authorization;

		const token = authHeader?.split(' ')[1] ?? undefined;
		if (!token) {
			res.status(401).json({ message: 'No token provided' });
		}

		(req as any).user = jwt?.decode(token as string);
		const UserExist = await User.findOne({
			where: { email: (req as any).user.email },
		});
		if (!UserExist) {
			res.status(404).json({ message: 'User not exists' });
		}
		next();
	} catch (err) {
		console.log('Error in Login', err);
	}
};
