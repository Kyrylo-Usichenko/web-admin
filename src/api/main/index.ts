import type {
	GetDiyOrder,
	GetInfluencerDiyOrder,
	GetInfluencerResBody,
	GetInfluencersResBody,
	GetOrderResBody,
	GetOrdersResBody,
	GetScentsResBody,
	GetShopOrder,
	OrderType
} from '../../types/customerOrders';
import HttpClient from '../http/http';
import type {
	GetInfluencerOrderResBody,
	SetInfluencerDiyScentsReqBody,
	SetInfluencerScentsReqBody,
	SetScentsReqBody,
	SetShopOrderScentsReqBody
} from './types';

class Ai extends HttpClient {
	private static instanceCached: Ai;

	private constructor() {
		super('https://api.scentcraft.com');
	}

	static getInstance = () => {
		if (!Ai.instanceCached) {
			Ai.instanceCached = new Ai();
		}

		return Ai.instanceCached;
	};

	public getInfluencerOrders = () => this.instance.get('/admin/influencer-store-orders');

	public getInfluencerOrder = (id: string) =>
		this.instance.get<GetInfluencerOrderResBody>(`/admin/influencer-store-orders/order/${id}`);

	public getOrders = (orderType: OrderType) =>
		this.instance.get<GetOrdersResBody>(`/admin/orders?orderType=${orderType}`);

	public getOrder = (orderId: string | number) =>
		this.instance.get<GetOrderResBody>(`/admin/orders/${orderId}`);

	public getInfluencerDiyOrder = (orderId: string | number) =>
		this.instance.get<GetInfluencerDiyOrder>(`/admin/orders/influencerDiy/${orderId}`);

	public getDiyOrder = (orderId: string | number) =>
		this.instance.get<GetDiyOrder>(`/admin/orders/normalDiy/${orderId}`);

	public getInfluencerShopOrder = (orderId: string | number) =>
		this.instance.get<GetShopOrder>(`/admin/orders/influencerShop/${orderId}`);

	public getInfluencers = () => this.instance.get<GetInfluencersResBody>('/admin/influencers');

	public getInfluencer = (id: string | number) =>
		this.instance.get<GetInfluencerResBody>(`/admin/influencers/${id}`);

	public setInfluencerScents = (body: SetInfluencerScentsReqBody) =>
		this.instance.put('/admin/update-influencer-scents', body);

	public getScents = () =>
		this.instance.get<GetScentsResBody>('/admin/influencer-store-orders/scents');

	public setScents = (body: SetScentsReqBody) => this.instance.put('/admin/orders/scents', body);
	public setDiyScents = (body: SetScentsReqBody) =>
		this.instance.put('/admin/orders/normalDiy/scents', body);

	public setInfluencerDiyScents = (body: SetInfluencerDiyScentsReqBody) =>
		this.instance.put('/admin/orders/influencerDiy/scents', body);

	public setShopOrderScents = (body: SetShopOrderScentsReqBody) =>
		this.instance.put('/admin/orders/influencerShop/scents', body);
}

export default Ai;
