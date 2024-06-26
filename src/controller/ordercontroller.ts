import { Request, Response } from 'express';
import Order from '../model/order';
import User from '../model/user';
import { OrderInterface } from '../interface/orderInterface';
import { UserInterface } from '../interface/userInterface';

export const createOrder = async (req: Request, res: Response) => {
	try {
		console.log('req.body:', req.body)
		const { amount } = req.body;
		const user_id = req.user;
		console.log('user_id:', req.user);
		const user: UserInterface | null = await User.findOne({
			where: { id: user_id },
		});
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const order: OrderInterface = await Order.create({ user_id, amount });
		if (!order) {
			return res.status(500).json({ message: 'Error creating order' });
		}

		res.status(201).json(order);
	} catch (err) {
		console.error('Error creating order:', err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

export const getAllOrders = async (req: Request, res: Response) => {
	try {
		const orders = await Order.findAll();
		res.json(orders);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const getOrder = async (req: Request, res: Response) => {
	try {
		const orderId = req.params.id;
		const order = await Order.findByPk(orderId?.toString());
		if (!order) {
			return res.status(404).json({ message: 'Order not available' });
		}

		res.json(order);
	} catch (error) {
		console.error('Error fetching order details', error);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const updateOrder = async (req: Request, res: Response) => {
	try {
		const orderId = req.query.id;
		const { user_id, amount } = req.body;
		const order = await Order.findByPk(orderId?.toString());
		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}

		await order.update({ user_id, amount });
		res.json({ message: 'User details updated' });
	} catch (error) {
		console.error('Error updating user', error);
		return res.status(500).json({ message: 'Server error' });
	}
};

export const deleteOrder = async (req: Request, res: Response) => {
	try {
		const orderId = req.query.id;

		const order = await Order.findByPk(orderId?.toString());
		if (!order) {
			return res.status(404).json({ message: 'Order not available' });
		}
		await order.destroy();
		res.json({ message: 'Order deleted' });
	} catch (error) {
		console.error('Error deleting order', error);
		return res.status(500).json({ message: 'Server error' });
	}
};
