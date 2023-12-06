import type { OrderType } from '$types/customerOrders';

export type NavigateData =
	| {
			currentPage: 'home';
	  }
	| {
			currentPage: 'orders';
			id: string | number;
			orderType: OrderType;
	  }
	| {
			currentPage: 'orders/orderTypeSelection';
			orderType: 'influencerShop' | 'influencerDiy' | 'normalDiy' | '';
	  }
	| {
			currentPage: 'influencers';
			id: string | number;
	  };

export type RedirectRes = {
	to: string;
	type: 'redirect';
};

export type NoneRes = {
	type: 'none';
};

export type NavigateRes = RedirectRes | NoneRes;
