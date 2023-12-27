export async function load({ url }) {
	const ordersType = url.searchParams.get('ordersType');
	const ordersStatus = url.searchParams.get('ordersStatus');

	// if (!ordersType) {
	// 	return {
	// 		status: 404,
	// 		error: new Error('Not found')
	// 	};
	// }

	return { ordersType, ordersStatus };
}
