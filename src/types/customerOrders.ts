export type OrderType = 'influencerShop' | 'influencerDiy' | 'normalDiy';
export type GetOrdersResBody = {
	orders: CustomersOrders;
};

export type CustomerOrder = {
	id: number;
	orderId: string;
	createdAt: string;
};

export type GetInfluencersResBody = {
	data: Influencer[];
};

export type Influencer = {
	hubspotContactId: number;
	email: string;
	firstName: string;
	lastName: string;
	shopifyOrderNumber: number;
};

export type GetInfluencerResBody = {
	data: InfluencerDetails;
};

export type InfluencerDetails = {
	micrositeSlug: string | null;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	scentCodes: {
		main: string;
		secondary1: string;
		secondary2: string;
	};
	socialHandle: string;
};

export type GetScentsResBody = {
	[size: string]: {
		'5ML'?: Scent;
		'15ML'?: Scent;
		'50ML'?: Scent;
		'100ML'?: Scent;
	};
};

type Scent = {
	id: number;
	title: string;
	qty: number;
};

export type CustomersOrders = CustomerOrder[];
