import type { OrderType } from '$types/customerOrders';

export type NavigateData =
	| {
			currentPage: 'home';
	  }
	| {
			currentPage: 'orders';
			id: string | number;
			orderType: OrderType;
	  };

export type RedirectRes = {
	to: string;
	type: 'redirect';
};

export type NoneRes = {
	type: 'none';
};

export type NavigateRes = RedirectRes | NoneRes;
