import type { Gender, Mood, OrderStatus, ScentToUpdate, Time } from '.';

export type OrderType = 'influencerShop' | 'influencerDiy' | 'normalDiy';
export type BottleSize = '5ML' | '15ML' | '50ML' | '100ML';
export type LabelType = 'GENERIC' | 'CUSTOM';

export type GetOrdersResBody = {
	orders: CustomersOrders;
	total: number;
};

export type CustomerOrder = {
	id: number;
	orderId: string;
	createdAt: string;
	email: string;
	financialStatus: string;
	orderStatus: OrderStatus;
	name: string;
	orderType: string;
	totalPrice: string;
};

export type GetInfluencersResBody = {
	data: {
		influencers: Influencer[];
		total: number;
	};
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
	shopify: {
		price: string;
		currency: string;
		financialStatus: string;
		statusUrl: string;
		createdAt: string;
		processedAt: string;
		orderNumber: number;
	};
	info: {
		email: string | null;
		firstName: string | null;
		lastName: string | null;
		socialHandle: string;
	};
	journey: {
		gender: Gender;
		time: Time;
		mode: Mood;
		mood: Mood;
		fragrance: SelectedFragrance;
		micrositeSlug: string | null;
		initialScents: {
			main: string;
			secondary1: string;
			secondary2: string;
		};
		scentCodes: {
			main: string;
			secondary1: string;
			secondary2: string;
		};
		bottleLabel: string;
		boxLabel: BottleSize;
		diecutLink: string | null;
	};
};

export type AllScentsScent = {
	name: string;
	scentCode: string;
};

export type GetAllScentsResBody = AllScentsScent[];

export type GetFollowerDiyJson = string[][];

export type GetScentsResBody = {
	scents: {
		main: {
			count: number;
			name: string;
			scentCode: string;
		}[];
		secondary1: {
			count: number;
			name: string;
			scentCode: string;
		}[];
		secondary2: {
			count: number;
			name: string;
			scentCode: string;
		}[];
	};
};

export type GetOrderResBody = {
	data: Order;
};

export type InfluencerDiyJourney = {
	data: Order;
};

export type ShopifyOrder = {
	isBrokenOrder: boolean;
	orderName: string;
	orderStatus: OrderStatus;
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
	diecutLink: string | null;
};

export type SelectedFragrance = {
	name: string;
	gender: string;
	family: string;
	image: string;
	pyramid: {
		top: string[];
		middle: string[];
		base: string[];
	};
};
export interface InfluencerDiyShopifyOrder extends ShopifyOrder {
	diecutLink: string | null;
	diecutRenderStatus: 'none' | 'pending' | 'complete';
	influencer: {
		contactId: number;
		micrositeSlug: string;
		name: string | null;
		email: string;
		scentCodes: {
			main: string;
			secondary1: string;
			secondary2: string;
		};
		socialHandle: string | null;
	} | null;
}
export interface GetInfluencerDiyOrderData extends InfluencerDiyShopifyOrder {
	attributes: {
		allInfluData?: string | null;
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
		initialScents: {
			main: string;
			secondary: string;
			influencerScent: string;
		};

		scents: {
			main: ScentToUpdate;
			secondary: ScentToUpdate;
			influencerScent: ScentToUpdate;
		};
		selectedMockup: string;
	};
}

export type GetDiyOrder = {
	data: GetDiyOrderData;
};

export type GetInfluencerDiyOrder = {
	data: GetInfluencerDiyOrderData;
};

export interface GetDiyOrderData extends ShopifyOrder {
	attributes: {
		allInfluData?: string | null;
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
		initialScents: {
			mainScent?: string;
			secondary1: string;
			secondary2: string;
			main?: string;
		};
		selectedFragrance: SelectedFragrance;
		scents: {
			main: ScentToUpdate;
			secondary1: ScentToUpdate;
			secondary2: ScentToUpdate;
		};
		selectedMockup: string;
	};
}

export type GetShopOrder = {
	data: GetShopOrderData;
};

export interface FollowerShopifyOrder extends ShopifyOrder {
	diecutLink: string | null;
	diecutRenderStatus: 'none' | 'pending' | 'complete';
	influencer: {
		contactId: number;
		micrositeSlug: string;
		name: string | null;
		email: string;
		scentCodes: {
			main: string;
			secondary1: string;
			secondary2: string;
		};
		socialHandle: string | null;
	} | null;
}
export interface GetShopOrderData extends FollowerShopifyOrder {
	attributes: {
		allInfluData?: string | null;
		journeyData?: string | null;
		orderType: OrderType;
		micrositeSlug: string;
		email: string;
		bottleSize: BottleSize;
		initialScents: {
			main: string;
			secondary1: string;
			secondary2: string;
		};
		scents: {
			main: {
				oosStatus: boolean;
				code: string;
			};
			secondary1: {
				oosStatus: boolean;
				code: string;
			};
			secondary2: {
				oosStatus: boolean;
				code: string;
			};
		};
		selectedMockup: string;
	};
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
