import type {
	GetAllScentsResBody,
	GetDiyOrder,
	GetFollowerDiyJson,
	GetInfluencerDiyOrder,
	GetInfluencerResBody,
	GetInfluencersResBody,
	GetOrderResBody,
	GetOrdersResBody,
	GetScentsResBody,
	GetShopOrder
} from '../../types/customerOrders';
import HttpClient from '../http/http';
import type {
	GetInfluencersReqBody,
	GetOrdersReqBody,
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

	public getOrders = ({ limit, offset, search, ordersType, orderStatus }: GetOrdersReqBody) => {
		const body: GetOrdersReqBody = {
			offset,
			limit
		};
		if (search) body.search = search;
		if (ordersType) body.orderType = ordersType;
		if (orderStatus) body.orderStatus = orderStatus;
		return this.instance.post<GetOrdersResBody>('/admin/orders', body);
	};

	public getOrder = (orderId: string | number) =>
		this.instance.get<GetOrderResBody>(`/admin/orders/${orderId}`);

	public getFollowerDiyOrder = (orderId: string | number) =>
		this.instance.get<GetInfluencerDiyOrder>(`/admin/orders/influencerDiy/${orderId}`);

	public getDiyOrder = (orderId: string | number) =>
		this.instance.get<GetDiyOrder>(`/admin/orders/normalDiy/${orderId}`);

	public getFollowerOrder = (orderId: string | number) =>
		this.instance.get<GetShopOrder>(`/admin/orders/influencerShop/${orderId}`);

	public getInfluencers = (limit: number, offset: number, search: string) => {
		const body: GetInfluencersReqBody = {
			limit,
			offset
		};
		if (search) body.search = search;
		return this.instance.post<GetInfluencersResBody>('/admin/influencers', body);
	};

	public getInfluencer = (id: string | number) =>
		this.instance.get<GetInfluencerResBody>(`/admin/influencers/${id}`);

	public setInfluencerScents = (body: SetInfluencerScentsReqBody) =>
		this.instance.put('/admin/update-influencer-scents', body);

	public getScents = (orderId: number | string) =>
		this.instance.get<GetScentsResBody>(`/admin/scents?orderId=${orderId}`);

	public setDiyScents = (body: SetScentsReqBody) =>
		this.instance.put('/admin/orders/normalDiy/scents', body);

	public setInfluencerDiyScents = (body: SetInfluencerDiyScentsReqBody) =>
		this.instance.put('/admin/orders/influencerDiy/scents', body);

	public setShopOrderScents = (body: SetShopOrderScentsReqBody) =>
		this.instance.put('/admin/orders/influencerShop/scents', body);

	public saveDiecut = (formData: FormData): Promise<string> =>
		this.instance.postForm('/admin/upload-diecut', formData);

	public saveInfluencerDiecut = (formData: FormData): Promise<string> =>
		this.instance.postForm('/admin/upload-diecut-influencer', formData);

	public getAllScents = () => this.instance.get<GetAllScentsResBody>('/admin/influencer/scents');

	public approveOrder = (orderId: number | string) =>
		this.instance.put('/admin/orders/approve', { orderId });

	public getFollowerDiyJSON = (orderNames: string[]) =>
		this.instance.post<GetFollowerDiyJson>('/admin/influencerDiy-csv', { orderNames });
}

export default Ai;
