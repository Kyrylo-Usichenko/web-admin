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
	if (currentPage === 'orders/orderTypeSelection') {
		const { orderType } = data;
		if (orderType === '') {
			return {
				type: 'redirect',
				to: routes.orders
			};
		}
		return {
			type: 'redirect',
			to: routes.ordersWithType(orderType)
		};
	}
	if (currentPage === 'influencers') {
		const { id } = data;
		return {
			type: 'redirect',
			to: routes.influencer(id)
		};
	}

	return asertNever(currentPage, 'Invalid state');
};
