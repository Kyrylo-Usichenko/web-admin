export const getOrders = (text: string) => {
	// split text by space and detect orders, example of order: #C5442 #C5443 #C5445
	const orders = text.split(' ').filter((word) => word.startsWith('#c') || word.startsWith('#C'));
	return orders;
};
