import type { Gender, Mood, Time } from '.';

export type OrderType = 'influencerShop' | 'influencerDiy' | 'normalDiy';
export type BottleSize = '5ML' | '15ML' | '50ML' | '100ML';
export type LabelType = 'GENERIC' | 'CUSTOM';

export type GetOrdersResBody = {
	orders: CustomersOrders;
};

export type CustomerOrder = {
	id: number;
	orderId: string;
	createdAt: string;
	email: string;
	financialStatus: string;
	name: string;
	orderType: string;
	totalPrice: string;
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
	name: string;
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

export type GetOrderResBody = {
	data: Order;
};

export type InfluencerDiyJourney = {
	data: Order;
};

export type ShopifyOrder = {
	orderName: string;
	orderNumber: string;
	orderType: OrderType;
	customerEmail: string;
	subtotalPrice: string;
	currency: string;
	financialStatus: string;
	orderStatusUrl: string;
	createdAt: string;
	processedAt: string;
	confirmed: boolean;
};

export type SelectedFragrance = {
	name: string;
	gender: string;
	family: string;
	image: string;
};

export interface GetInfluencerDiyOrderData extends ShopifyOrder {
	attributes: {
		allInfluencerData?: string | null;
		journeyData?: string | null;
		time: Time;
		mood: Mood;
		orderType: OrderType;
		micrositeSlug: string;
		email: string;
		bottleSize: BottleSize;
		finalLabelImage: string;
		gender: Gender;
		labelName: string;
		labelType: LabelType;
		selectedFragrance: SelectedFragrance;
		scents: {
			main: string;
			secondary: string;
			influencerScent: string;
		};
		selectedMockup: string;
	} | null;
}

export type GetDiyOrder = {
	data: GetDiyOrderData;
};

export type GetInfluencerDiyOrder = {
	data: GetInfluencerDiyOrderData;
};

export interface GetDiyOrderData extends ShopifyOrder {
	attributes: {
		allInfluencerData?: string | null;
		journeyData?: string | null;
		time: Time;
		mood: Mood;
		orderType: OrderType;
		micrositeSlug: string;
		email: string;
		bottleSize: BottleSize;
		finalLabelImage: string;
		gender: Gender;
		labelName: string;
		labelType: LabelType;
		selectedFragrance: SelectedFragrance;
		scents: {
			main: string;
			secondary1: string;
			secondary2: string;
		};
		selectedMockup: string;
	} | null;
}

export type GetShopOrder = {
	data: GetShopOrderData;
};
export interface GetShopOrderData extends ShopifyOrder {
	attributes: {
		allInfluencerData?: string | null;
		journeyData?: string | null;
		orderType: OrderType;
		micrositeSlug: string;
		email: string;
		bottleSize: BottleSize;
		scents: {
			main: string;
			secondary1: string;
			secondary2: string;
		};
		selectedMockup: string;
	} | null;
}

export type GetInfluencerDiyOrderResBody = {
	data: {
		orderName: string;
		orderNumber: string;
		orderType: OrderType;
		customerEmail: string;
		subtotalPrice: string;
		currency: string;
		financialStatus: string;
		orderStatusUrl: string;
		createdAt: string;
		processedAt: string;
		confirmed: boolean;
		noteAttributes: InfluencerDiyJourney;
	};
};

export type Order = {
	orderName: string;
	orderNumber: string;
	orderType: OrderType;
	customerEmail: string;
	subtotalPrice: string;
	currency: string;
	financialStatus: string;
	orderStatusUrl: string;
	createdAt: string;
	processedAt: string;
	confirmed: boolean;
	noteAttributes: NoteAttribute[];
};

export type NoteAttribute =
	| {
			name: 'influencerId';
			value: string;
	  }
	| {
			name: 'newwebsite';
			value: string;
	  }
	| {
			name: 'journey';
			value: string;
	  }
	| {
			name: 'journeyData';
			value: string;
	  };

export type CustomersOrders = CustomerOrder[];