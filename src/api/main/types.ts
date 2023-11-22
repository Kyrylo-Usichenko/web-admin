import type { JourneyData, NoteAttributes } from '../../types';

type SetScentsReqBodyScents = {
	main: string;
	secScent1: string;
	secScent2: string;
};

interface SetScentsReqBody extends SetScentsReqBodyScents {
	orderId: string;
}

type GetOrderResBody = {
	status: 'success' | 'error';
	data: {
		name: string;
		journeyData: JourneyData;
		note_attributes: NoteAttributes;
	};
};

export type { GetOrderResBody, SetScentsReqBody, SetScentsReqBodyScents };
