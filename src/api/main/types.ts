import type { OrderStatus } from "$types/index";

type SetScentsReqBodyScents = {
	main: string;
	secScent1: string;
	secScent2: string;
};

export interface SetInfluencerScentsReqBody extends SetScentsReqBodyScents {
	contactId: number | string;
}

export interface SetScentsReqBody extends SetScentsReqBodyScents {
	orderId: number | string;
}

export interface SetInfluencerDiyScentsReqBody {
	orderId: number | string;
	main: string;
	secScent: string;
	influencerScent: string;
}

export interface SetShopOrderScentsReqBody {
	orderId: number | string;
	main: string;
	secScent1: string;
	secScent2: string;
}

export type GetOrdersReqBody = {
	ordersType?: string;
	orderType?: string;
	limit: number;
	offset: number;
	search?: string;
	orderStatus?: OrderStatus
};

export type GetInfluencersReqBody = {
	limit: number;
	offset: number;
	search?: string;
};

export type { SetScentsReqBodyScents };
