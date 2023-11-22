<script lang="ts">
	import { goto } from '$app/navigation';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import { ordersStore } from '$lib/stores/ordersStore';
	import Grid from 'gridjs-svelte';
	import { onMount } from 'svelte';
	import { aiApi } from '../api';
	import type { Order, Orders } from '../types';
	import { columns } from './utils';

	let orders: Orders = [];
	let loading = true;

	const fetchOrders = async () => {
		try {
			const orders = await aiApi.getOrders();
			console.log(orders);
			
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
				const ordersRes = await fetchOrders();
				ordersStore.set(ordersRes);
			}
			loading = false;
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
	@import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';
	.loader {
		margin: 0 auto;
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.table {
		& tr:hover td {
			background-color: black;
			& td {
				background-color: black;
			}
		}
	}
</style>
