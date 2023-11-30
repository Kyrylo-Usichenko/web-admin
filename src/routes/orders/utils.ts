export const columns = [
	{
		name: 'Id',
		hidden: true
	},
	{
		name: 'Order name'
	},
	{
		name: 'name'
	},
	{
		name: 'Email'
	},
	{
		name: 'Financial Status'
	},
	{
		name: 'Total Price'
	},
	{
		name: 'Created At'
	}
];
export const routes: Route[] = [
	{
		name: 'Customers orders',
		path: '/orders?ordersType=influencerShop',
		ordersType: 'influencerShop'
	},
	{
		name: 'Influencers DIY',
		path: '/orders?ordersType=influencerDiy',
		ordersType: 'influencerDiy'
	},
	{
		name: 'DIY',
		path: '/orders?ordersType=normalDiy',
		ordersType: 'normalDiy'
	}
];
export type Route = {
	name: string;
	path: string;
	ordersType: 'influencerShop' | 'influencerDiy' | 'normalDiy';
};
