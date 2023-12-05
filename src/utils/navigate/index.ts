import type { NavigateData, NavigateRes } from './types';
import { asertNever, routes } from './utils';

export const navigate = (data: NavigateData): NavigateRes => {
	const { currentPage } = data;
	if (currentPage === 'home') {
		return {
			type: 'redirect',
			to: routes.orders
		};
	}
	if (currentPage === 'orders') {
		const { orderType, id } = data;
		if (orderType === 'influencerShop') {
			return {
				type: 'redirect',
				to: routes.influencerShopOrder(id)
			};
		}
		if (orderType === 'normalDiy') {
			return {
				type: 'redirect',
				to: routes.diyOrder(id)
			};
		}
		if (orderType === 'influencerDiy') {
			return {
				type: 'redirect',
				to: routes.influencerDiyOrder(id)
			};
		}
		return {
			type: 'none'
		};
	}

	return asertNever(currentPage, 'Invalid state');
};
