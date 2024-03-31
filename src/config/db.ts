import { Sequelize } from 'sequelize';
import User from '../model/user';

const db = new Sequelize(
	'mysql://udo6tq2ssgncx7vu:Q8g3H7WX6VwM4AujwvGl@bnhzebdpvlmdsmp08xvk-mysql.services.clever-cloud.com:3306/bnhzebdpvlmdsmp08xvk'
);

db.sync()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
export default db;
