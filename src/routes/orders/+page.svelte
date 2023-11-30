<script lang="ts">
	import { aiApi } from '$api/index';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import type { OrderType } from '$types/customerOrders';
	import { formatDate } from '$utils/time';
	import Grid from 'gridjs-svelte';
	import { columns, routes } from './utils';
	let selectedRoute = $page.data.ordersType;

	let tableData: {
		id: string;
		orderName: string;
		name: string;
		email: string;
		financialStatus: string;
		totalPrice: string;
		createdAt: string;
	} = [];
	let loading = false;

	const onOrderClick = (cellInfo: any) => {
		const id = cellInfo.detail[1]._cells[0].data;

		goto(`/orders/${$page.data.ordersType}/${id}?ordersType=${$page.data.ordersType}`);
	};

	const setOrders = async (ordersType: OrderType) => {
		loading = true;
		try {
			const ordersRes = await aiApi.getOrders(ordersType);
			tableData = ordersRes.data.orders.map((order) => {
				return {
					id: order.id,
					orderName: order.orderId,
					name: order.name,
					email: order.email,
					financialStatus: order.financialStatus,
					totalPrice: order.totalPrice,
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
		<div>
			<span> Orders type: </span>
			<select
				bind:value={selectedRoute}
				on:change={() => {
					goto(`/orders?ordersType=${selectedRoute}`);
				}}
			>
				{#each routes as route}
					<option value={route.ordersType}>{route.name}</option>
				{/each}
			</select>
			<slot />
		</div>

		<Grid
			className={{
				table: 'generalTable'
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
