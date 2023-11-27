import type {
	GetInfluencerResBody,
	GetInfluencersResBody,
	GetOrdersResBody,
	GetScentsResBody,
	OrderType
} from '../../types/customerOrders';
import HttpClient from '../http/http';
import type { GetOrderResBody, SetScentsReqBody } from './types';

class Ai extends HttpClient {
	private static instanceCached: Ai;

	private constructor() {
		super('https://api.scentcraft.ai');
	}

	static getInstance = () => {
		if (!Ai.instanceCached) {
			Ai.instanceCached = new Ai();
		}

		return Ai.instanceCached;
	};

	public getInfluencerOrders = () => this.instance.get('/admin/influencer-store-orders');

	public getInfluencerOrder = (id: string) =>
		this.instance.get<GetOrderResBody>(`/admin/influencer-store-orders/order/${id}`);

	public getOrders = (orderType: OrderType) =>
		this.instance.get<GetOrdersResBody>(`/admin/orders?orderType=${orderType}`);

	public getOrder = (orderId: string | number) => this.instance.get(`/admin/orders/${orderId}`);

	public getInfluencers = () => this.instance.get<GetInfluencersResBody>('/admin/influencers');

	public getInfluencer = (id: string | number) =>
		this.instance.get<GetInfluencerResBody>(`/admin/influencers/${id}`);

	public setInfluencerScents = (body: SetScentsReqBody) =>
		this.instance.put('/admin/update-influencer-scents', body);

	public getScents = () =>
		this.instance.get<GetScentsResBody>('/admin/influencer-store-orders/scents');
}

export default Ai;
