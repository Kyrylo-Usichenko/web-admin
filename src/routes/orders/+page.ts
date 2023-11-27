export async function load({ url }) {
	const ordersType = url.searchParams.get('ordersType');

	if (!ordersType) {
		return {
			status: 404,
			error: new Error('Not found')
		};
	}

	return { ordersType };
}
