import express from 'express';
import { Request, Response } from "express";
import { Sequelize } from 'sequelize';
import User from './routes/user_routes';
import Order from './routes/order_routes';
import login from './routes/authroute';
import UserModel from './model/user'
import { getUser } from './controller/usercontroller';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Welcome to my page');
});
app.use('/api/login',login)
app.use('/api/users',User);
app.use('/api/orders',Order);
export default app;
