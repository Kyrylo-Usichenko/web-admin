export type Route = {
	name: OrderTypeName;
	path: string;
	ordersType?: OrderType;
};
export type OrderTypeName = 'All orders' | 'Follower order' | 'Follower DIY' | 'DIY orders';
export type OrderType = 'influencerShop' | 'influencerDiy' | 'normalDiy' | 'All orders';
