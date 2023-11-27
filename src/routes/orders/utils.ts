import type { OrderType } from '$types/customerOrders';
import { aiApi } from '../../api';

export const getOrders = async (orderType: OrderType) => {
	try {
		const response = await aiApi.getOrders(orderType);
		return response.data.orders || [];
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const columns = [
	{
		name: 'Id',
		hidden: true
	},
	{
		name: 'Order ID'
	},
	{
		name: 'Created At'
	}
];
