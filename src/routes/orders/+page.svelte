<script lang="ts">
	import { aiApi } from '$api/index';
	import { page } from '$app/stores';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import type { CustomersOrders, OrderType } from '$types/customerOrders';
	import { formatDate } from '$utils/formatDate';
	import Grid from 'gridjs-svelte';
	import { columns } from './utils';
	import { goto } from '$app/navigation';

	let tableData: CustomersOrders = [];
	let loading = false;

	const onOrderClick = (cellInfo: any) => {
		const id = cellInfo.detail[1]._cells[0].data;

		goto(`/orders/${id}?ordersType=${$page.data.ordersType}`);
	};

	const setOrders = async (ordersType: OrderType) => {
		loading = true;
		try {
			const ordersRes = await aiApi.getOrders(ordersType);
			tableData = ordersRes.data.orders.map((order) => {
				return {
					...order,
					createdAt: formatDate(order.createdAt)
				};
			});
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	};

	$: setOrders($page.data.ordersType);
</script>

<div>
	{#if loading}
		<Loader />
	{:else}
		<Grid
			className={{
				table: 'table'
			}}
			data={tableData}
			height="500px"
			search
			{columns}
			pagination={{
				limit: 50
			}}
			fixedHeader
			on:rowClick={onOrderClick}
		/>
	{/if}
</div>
