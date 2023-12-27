import type { OrderStatus } from '$types/index';

export type Route = {
	name: OrderTypeName;
	path: string;
	ordersType?: OrderType;
};
export type OrderTypeName = 'All orders' | 'Follower order' | 'Follower DIY' | 'DIY orders';
export type OrderType = 'influencerShop' | 'influencerDiy' | 'normalDiy' | 'All orders';
export type Status = 'All statuses' | OrderStatus;

export type SetOrdersArguments = {
	ordersType: OrderType;
	orderStatus: Status;
	shouldLoad?: boolean;
};
