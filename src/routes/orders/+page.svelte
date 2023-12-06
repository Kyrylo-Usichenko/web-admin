<script lang="ts">
	import { aiApi } from '$api/index';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import Table from '$lib/shared/table/Table.svelte';
	import type { OrderType } from '$types/customerOrders';
	import { navigate } from '$utils/navigate';
	import { formatDate } from '$utils/time';
	import Dropdown from './components/Dropdown.svelte';
	import type { OrderTypeName } from './types';
	import { defaultColumns, routes } from './utils';
	let selectedRoute = $page.data.ordersType;

	let isLoading: boolean = true;
	let currentPage: number = 1;
	let offset: number = 0;
	let total: number = 0;
	let search: string = '';
	let orderTypeValue: OrderTypeName = 'All orders';
	const limit = 50;
	let tableData: {
		id: number;
		orderName: string;
		name: string;
		email: string;
		financialStatus: string;
		totalPrice: string;
		createdAt: string;
	}[] = [];

	const onOrderClick = (cellInfo: any) => {
		const id = cellInfo.original.id;
		let orderType = null;
		console.log(selectedRoute);

		if (selectedRoute !== '' && selectedRoute) orderType = selectedRoute;
		if (selectedRoute === '' || !selectedRoute) {
			if (cellInfo.original.orderType === 'influencer_shop') {
				orderType = `influencerShop`;
			}
			if (cellInfo.original.orderType === 'influencer_diy') {
				orderType = `influencerDiy`;
			}
			if (cellInfo.original.orderType === 'normal_diy') {
				orderType = `normalDiy`;
			}
		}

		const redirect = navigate({
			currentPage: 'orders',
			id,
			orderType
		});
		if (redirect.type === 'redirect') return goto(redirect.to);
	};

	const onPageChange = async (newPage: number) => {
		currentPage = newPage;
	};

	const onNextClick = async () => {
		currentPage++;
	};

	const onPrevClick = async () => {
		currentPage--;
	};

	const onInputChange = () => {
		currentPage = 1;
		setOrders({
			ordersType: selectedRoute,
			shouldLoad: false
		});
	};

	const onOrderTypeChange = (value: string) => {
		currentPage = 1;
		const newRoute = routes.find((route) => route.name === value);
		if (!newRoute) alert('Wrong input value');
		selectedRoute = newRoute?.ordersType;
		const redirect = navigate({
			currentPage: 'orders/orderTypeSelection',
			orderType: selectedRoute
		});
		if (redirect.type === 'redirect') return goto(redirect.to);
	};

	const setOrders = async ({
		ordersType,
		shouldLoad
	}: {
		ordersType: OrderType;
		shouldLoad?: boolean;
	}) => {
		if (shouldLoad) isLoading = true;
		offset = (currentPage - 1) * limit;
		try {
			const ordersRes = await aiApi.getOrders({
				ordersType: ordersType,
				limit,
				offset,
				search
			});
			total = ordersRes.data.total;
			tableData = ordersRes.data.orders.map((order) => {
				return {
					id: order.id,
					orderName: order.orderId,
					name: order.name,
					email: order.email,
					financialStatus: order.financialStatus,
					orderType: order.orderType,
					totalPrice: order.totalPrice,
					createdAt: formatDate(order.createdAt)
				};
			});
		} catch (error) {
			console.log(error);
		} finally {
			if (shouldLoad) isLoading = false;
		}
	};

	$: orderTypeValue =
		routes.find((route) => route.ordersType === selectedRoute)?.name || 'All orders';

	$: currentPage,
		selectedRoute,
		setOrders({
			ordersType: $page.data.ordersType,
			shouldLoad: true
		});
</script>

<div class="filters">
	<input
		bind:value={search}
		on:input={onInputChange}
		class="input"
		placeholder="Email or Order Name"
		type="search"
	/>

	<div class="order-type_wrapper">
		<Dropdown
			options={routes.map((route) => route.name)}
			value={orderTypeValue}
			onChange={onOrderTypeChange}
		/>
	</div>
</div>
{#if isLoading}
	<div class="content">
		<Loader />
	</div>
{:else}
	<Table
		data={tableData}
		columns={defaultColumns}
		pagination={{
			page: currentPage,
			onNextClick,
			onPrevClick,
			offset,
			total,
			limit,
			onPageChange
		}}
		onRowClick={onOrderClick}
	/>
{/if}

<style>
	.content {
		width: 100%;
		position: relative;
		height: 100%;
	}
	.filters {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.order-type_wrapper {
		display: flex;
		align-items: center;
	}
	.input {
		margin: 20px 0;
		width: 250px;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: #fff;
		border: 1px solid #d2d6dc;
		border-radius: 5px;
		font-size: 14px;
		line-height: 1.45;
		outline: none;
		padding: 10px 13px;
	}
</style>
