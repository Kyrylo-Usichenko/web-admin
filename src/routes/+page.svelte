<script lang="ts">
	import { goto } from '$app/navigation';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import { ordersStore } from '$lib/stores/ordersStore';
	import Grid from 'gridjs-svelte';
	import { onMount } from 'svelte';
	import type { Order, Orders } from '../types';
	import { columns } from './utils';

	let orders: Orders = [];
	let loading = false;

	const fetchOrders = async () => {
		try {
			const res = await fetch('https://api.scentcraft.ai/admin/influencer-store-orders');
			const orders = await res.json();
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
		goto(`/${cellInfo.detail[1].cells[3].data}`);
	};

	onMount(async () => {
		ordersStore.subscribe(async (value) => {
			orders = value;
			console.log(value);

			if (value.length === 0) {
				loading = true;
				const ordersRes = await fetchOrders();
				ordersStore.set(ordersRes);
			}
		});
	});
</script>

<main class="wrapper">
	{#if loading}
		<div class="loader">
			<Loader />
		</div>
	{:else}
		<h1>Orders</h1>
		<Grid data={orders} {columns} search pagination={{ limit: 15 }} on:rowClick={onOrderClick} />
	{/if}
</main>

<style global>
	@import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';
	.loader {
		margin: 0 auto;
		width: fit-content;
	}
</style>
