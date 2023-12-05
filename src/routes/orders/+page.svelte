<script lang="ts">
	import { aiApi } from '$api/index';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import Table from '$lib/shared/table/Table.svelte';
	import type { OrderType } from '$types/customerOrders';
	import { formatDate } from '$utils/time';
	import { defaultColumns, routes } from './utils';
	let selectedRoute = $page.data.ordersType;

	let isLoading: boolean = false;
	let currentPage: number = 1;
	let offset: number = 0;
	let total: number = 0;
	let search: string = '';
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
		let ordersType = null;
		if (selectedRoute !== '') ordersType = `?ordersType=${selectedRoute}`;
		if (selectedRoute === '') {
			if (cellInfo.original.orderType === 'influencer_shop') {
				ordersType = `influencerShop`;
			}
			if (cellInfo.original.orderType === 'influencer_diy') {
				ordersType = `influencerDiy`;
			}
			if (cellInfo.original.orderType === 'normal_diy') {
				ordersType = `normalDiy`;
			}
		}
		const orderTypeParam = ordersType ? `?ordersType=${ordersType}` : '';
		if (!ordersType) return alert('Something went wrong');
		const url = `/orders/${ordersType}/${id}${orderTypeParam}`;
		console.log(url);
		console.log(cellInfo);

		goto(url);
	};

	const onPageChange = async (newPage: number) => {
		currentPage = newPage;
		setOrders({
			ordersType: $page.data.ordersType,
			shouldLoad: false
		});
	};

	const onNextClick = async () => {
		currentPage++;
		setOrders({
			ordersType: $page.data.ordersType,
			shouldLoad: false
		});
	};

	const onPrevClick = async () => {
		currentPage--;
		setOrders({
			ordersType: $page.data.ordersType,
			shouldLoad: false
		});
	};

	const onInputChange = () => {
		currentPage = 1;
		setOrders({
			ordersType: $page.data.ordersType,
			shouldLoad: false
		});
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

	$: setOrders({
		ordersType: $page.data.ordersType,
		shouldLoad: true
	});
</script>

{#if isLoading}
	<Loader />
{:else}
	<div class="filters">
		<input
			bind:value={search}
			on:input={onInputChange}
			class="input"
			placeholder="Email or Order Name"
			type="search"
		/>

		<div>
			<span> Orders type: </span>
			<select
				bind:value={selectedRoute}
				on:change={() => {
					currentPage = 1;
					const ordersTypesParam = selectedRoute ? `?ordersType=${selectedRoute}` : '';
					goto(`/orders${ordersTypesParam}`);
				}}
			>
				{#each routes as route}
					<option value={route.ordersType}>{route.name}</option>
				{/each}
			</select>
		</div>
	</div>
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
	.filters {
		display: flex;
		justify-content: space-between;
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
