import { DataTypes, Model, Optional, Association, Sequelize } from 'sequelize';
import db from '../config/db';
class Order extends Model {
	public order_id!: number;
	public user_id!: number;
	public amount!: number;
}
Order.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		amount: {
			type: DataTypes.FLOAT,
		},
	},
	{
		sequelize: db,
		modelName: 'Order',
		tableName: 'order',
		timestamps: false,
	}
);
export default Order;
