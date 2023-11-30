import type { JourneyData, NoteAttributes } from '../../types';

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

export type GetInfluencerOrderResBody = {
	status: 'success' | 'error';
	data: {
		name: string;
		journeyData: JourneyData;
		note_attributes: NoteAttributes;
	};
};

export type { SetScentsReqBodyScents };
