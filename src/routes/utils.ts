export type Route = {
	name: string;
	path: string;
};

export const routes: Route[] = [
	{
		name: 'Customers orders',
		path: '/orders?ordersType=influencerShop'
	},
	{
		name: 'Influencers DIY',
		path: '/orders?ordersType=influencerDiy'
	},
	{
		name: 'DIY',
		path: '/orders?ordersType=normalDiy'
	},
	{
		name: 'Influencers',
		path: '/orders/influencers'
	}
];
