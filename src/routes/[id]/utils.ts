import type { OrderDetails } from '../../types';

export const fetchOrder = async (data: { id: string }): Promise<OrderDetails> => {
	const res = await fetch(
		`https://api.scentcraft.ai/admin/influencer-store-orders/order/${data.id}`
	);
	const order = await res.json();
	return order.data.data;
};

export const fetchFragrances = async () => {
	const res = await fetch(`https://api.scentcraft.ai/admin/influencer-store-orders/scents`);
	const order = await res.json();
	return order.data;
};

export const extractScentCode = (scent: string) => {
	return scent.replace('(', '').replace(')', '').split(' ')[0];
};

export const availableScentTypes = ['New You', 'Scent 2', 'Scent 3'];
