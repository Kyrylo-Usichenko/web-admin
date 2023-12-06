import type { OrderType } from '$types/customerOrders';

export const routes = {
	home: '/',
	// influencers
	influencer: (id: string | number) => `/influencers/${id}`,
	// orders
	orders: '/orders',
	ordersWithType: (orderType: OrderType) => `/orders?ordersType=${orderType}`,
	// order
	influencerShopOrder: (id: string | number) =>
		`/orders/influencerShop/${id}?ordersType=influencerShop`,
	diyOrder: (id: string | number) => `/orders/normalDiy/${id}?ordersType=normalDiy`,
	influencerDiyOrder: (id: string | number) =>
		`/orders/influencerDiy/${id}?ordersType=influencerDiy`
};

export const asertNever = (it: never, message: string): never => {
	throw new Error(message);
};
