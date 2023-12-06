export type Route = {
	name: OrderTypeName;
	path: string;
	ordersType?: OrderType;
};
export type OrderTypeName = 'All orders' | 'Customers orders' | 'Follower DIY' | 'DIY orders';
export type OrderType = 'influencerShop' | 'influencerDiy' | 'normalDiy' | '';
