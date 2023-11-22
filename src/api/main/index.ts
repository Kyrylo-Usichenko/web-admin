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

	public getOrders = () => this.instance.get('/admin/influencer-store-orders');

	public getOrder = (id: string) =>
		this.instance.get<GetOrderResBody>(`/admin/influencer-store-orders/order/${id}`);

	public setScents = (body: SetScentsReqBody) =>
		this.instance.put('/admin/influencer-store-orders/order', body);
}

export default Ai;
