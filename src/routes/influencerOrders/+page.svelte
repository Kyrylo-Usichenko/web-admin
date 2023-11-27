<script lang="ts">
	import { goto } from '$app/navigation';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import { ordersStore } from '$lib/stores/ordersStore';
	import Grid from 'gridjs-svelte';
	import { onMount } from 'svelte';
	import { aiApi } from '../../api';
	import type { Order, Orders } from '../../types';
	import { columns } from './utils';

	let orders: Orders = [];
	let loading = true;

	const fetchOrders = async () => {
		try {
			const orders = await aiApi.getInfluencerOrders();

			return orders.data.data.map((order: Order) => {
				return {
					orderId: order.name,
					email: order.customer?.email || '',
					orderVersion: order.orderVersion,
					hiddenId: order.id
				};
			});
		} catch (e) {
			console.log(e);
		} finally {
			loading = false;
		}
	};

	const onOrderClick = (cellInfo: any) => {
		goto(`/influencerOrders/${cellInfo.detail[1].cells[3].data}`);
	};

	onMount(async () => {
		ordersStore.subscribe(async (value) => {
			orders = value;

			if (value.length === 0) {
				const ordersRes = await fetchOrders();
				ordersStore.set(ordersRes);
			}
			loading = false;
		});
	});
</script>

<main class="wrapper">
	{#if loading}
		<Loader />
	{:else}
		<h1>Orders</h1>
		<Grid
			className={{
				table: 'table'
			}}
			data={orders}
			{columns}
			height="500px"
			search
			pagination={{
				limit: 50
			}}
			fixedHeader
			on:rowClick={onOrderClick}
		/>
	{/if}
</main>

<style>
	.table {
		& tr:hover td {
			background-color: black;
			& td {
				background-color: black;
			}
		}
	}
</style>
