export const fetchOrder = async (data: {id: string}) => {
	const res = await fetch(
		`https://api.scentcraft.ai/admin/influencer-store-orders/order/${data.id}`
	);
	const order = await res.json();
	return order.data.data
	// .note_attributes
	// 	?.map((scent: any) => {
	// 		return [scent.value, scent.name || 'No scent'];
	// 	})
	// 	.reverse();
};

export const fetchFragrances = async () => {
	const res = await fetch(`https://api.scentcraft.ai/admin/influencer-store-orders/scents`);
	const order = await res.json();
	return order.data;
};
