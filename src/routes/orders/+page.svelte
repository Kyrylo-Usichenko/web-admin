<script lang="ts">
	import { aiApi } from '$api/index';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import OrderStatusTag from '$lib/shared/orderStatusTag/OrderStatusTag.svelte';
	import Table from '$lib/shared/table/Table.svelte';
	import { callAlert } from '$utils/alert';
	import { navigate } from '$utils/navigate';
	import { formatDate } from '$utils/time';
	import { flexRender, type ColumnDef } from '@tanstack/svelte-table';
	import { onMount } from 'svelte';
	import Dropdown from './components/Dropdown.svelte';
	import type { OrderTypeName, SetOrdersArguments, Status } from './types';
	import { routes, statuses, type Person } from './utils';

	const defaultColumns: ColumnDef<Person>[] = [
		{
			accessorKey: 'orderName',
			header: () => 'Order Name',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'orderStatus',
			header: () => 'Status',
			cell: (info) => flexRender(OrderStatusTag, { status: info.getValue() })
		},
		{
			accessorKey: 'name',
			header: () => 'Name',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'email',
			header: () => 'Email',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'totalPrice',
			header: () => 'Price',
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'createdAt',
			header: () => 'Created At',
			cell: (info) => info.getValue()
		}
	];

	let selectedRoute = $page.data.ordersType as OrderTypeName;
	let selectedStatus = $page.data.ordersStatus;

	let isLoading: boolean = true;
	let currentPage: number = 1;
	let offset: number = 0;
	let total: number = 0;
	let search: string = '';
	let ordersStatusValue: Status = 'All statuses';
	let orderTypeValue: OrderTypeName = 'All orders';
	const limit = 50;
	let tableData: {
		id: number;
		orderName: string;
		name: string;
		email: string;
		orderStatus: string;
		totalPrice: string;
		createdAt: string;
	}[] = [];

	const onOrderClick = (cellInfo: any) => {
		const id = cellInfo.original.id;
		let orderType = null;

		if (selectedRoute !== 'All orders' && selectedRoute) orderType = selectedRoute;
		if (selectedRoute === 'All orders' || !selectedRoute) {
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
		setOrders({
			orderStatus: selectedStatus,
			ordersType: selectedRoute,
			shouldLoad: true
		});
	};

	const onNextClick = async () => {
		currentPage++;
		setOrders({
			orderStatus: selectedStatus,
			ordersType: selectedRoute,
			shouldLoad: true
		});
	};

	const onPrevClick = async () => {
		currentPage--;
		setOrders({
			orderStatus: selectedStatus,
			ordersType: selectedRoute,
			shouldLoad: true
		});
	};

	const onInputChange = () => {
		currentPage = 1;
		setOrders({
			orderStatus: selectedStatus,
			ordersType: selectedRoute,
			shouldLoad: false
		});
	};

	const onOrderTypeChange = (value: string) => {
		currentPage = 1;
		const newOrderType = routes.find((route) => route.name === value)?.ordersType;
		if (!newOrderType) return callAlert('Wrong input value');
		selectedRoute = newOrderType || 'All orders';

		if (value === 'All orders') {
			$page.url.searchParams.delete('ordersType');
		} else {
			$page.url.searchParams.set('ordersType', newOrderType);
		}
		goto(`?${$page.url.searchParams.toString()}`);
		setOrders({
			ordersType: selectedRoute,
			orderStatus: selectedStatus,
			shouldLoad: true
		});
	};

	const onOrdersStatusChange = (value: string) => {
		currentPage = 1;
		selectedStatus = value as Status;
		if (value === 'All statuses') {
			$page.url.searchParams.delete('ordersStatus');
		} else {
			$page.url.searchParams.set('ordersStatus', selectedStatus);
		}
		goto(`?${$page.url.searchParams.toString()}`);
		setOrders({
			orderStatus: selectedStatus,
			ordersType: selectedRoute,
			shouldLoad: true
		});
	};

	const setOrders = async ({ ordersType, orderStatus, shouldLoad }: SetOrdersArguments) => {
		if (shouldLoad) isLoading = true;
		offset = (currentPage - 1) * limit;
		try {
			const ordersRes = await aiApi.getOrders({
				ordersType: ordersType === 'All orders' ? undefined : ordersType,
				orderStatus: orderStatus === 'All statuses' ? undefined : orderStatus,
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
					orderStatus: order.orderStatus,
					orderType: order.orderType,
					totalPrice: order.totalPrice,
					createdAt: formatDate(order.createdAt)
				};
			});
		} catch (error) {
			callAlert('Something went wrong while loading orders');
		} finally {
			if (shouldLoad) isLoading = false;
		}
	};

	$: orderTypeValue =
		routes.find((route) => route.ordersType === selectedRoute)?.name || 'All orders';

	$: ordersStatusValue = statuses.find((status) => status === selectedStatus) || 'All statuses';

	onMount(() => {
		setOrders({
			ordersType: $page.data.ordersType,
			orderStatus: $page.data.ordersStatus,
			shouldLoad: true
		});
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
		<Dropdown options={statuses} value={ordersStatusValue} onChange={onOrdersStatusChange} />
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
		gap: 8px;
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
