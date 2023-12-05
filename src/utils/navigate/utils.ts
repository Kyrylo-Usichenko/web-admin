export const routes = {
	home: '/',
	orders: '/orders',
	influencerShopOrder: (id: string | number) =>
		`/orders/influencerShop/${id}?ordersType=influencerShop`,
	diyOrder: (id: string | number) => `/orders/normalDiy/${id}?ordersType=normalDiy`,
	influencerDiyOrder: (id: string | number) =>
		`/orders/influencerDiy/${id}?ordersType=influencerDiy`,
	influencer: (id: string | number) => `/influencers/${id}`
};

export const asertNever = (it: never, message: string): never => {
	throw new Error(message);
};
