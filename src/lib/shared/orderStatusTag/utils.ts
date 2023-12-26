import type { OrderStatus } from '$types/index';

export const getTagColor = (status: OrderStatus) => {
	switch (status) {
		case 'Processed':
			return '#FFB800';
		case 'On hold':
			return '#FF0000';
		case 'Ready to ship':
			return '#00a900';
		case 'Fulfilled':
			return '#0000FF';
		default:
			return 'yellow';
	}
};
