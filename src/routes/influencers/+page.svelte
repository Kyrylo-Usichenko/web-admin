<script lang="ts">
	import { aiApi } from '$api/index';
	import { goto } from '$app/navigation';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import Table from '$lib/shared/table/Table.svelte';
	import type { Influencer } from '$types/customerOrders';
	import { navigate } from '$utils/navigate';
	import { onMount } from 'svelte';
	import { defaultColumns } from './utils';

	let tableData: Influencer[] = [];
	let loading = true;
	let limit = 50;
	let offset = 0;
	let total = 0;
	let page = 1;
	let search = '';

	const onOrderClick = (cellInfo: {
		original: {
			id: string;
		};
	}) => {
		const redirect = navigate({
			currentPage: 'influencers',
			id: cellInfo.original.id
		});
		if (redirect.type === 'redirect') return goto(redirect.to);
	};

	const setInfluencers = async () => {
		loading = true;
		try {
			const ordersRes = await aiApi.getInfluencers(limit, offset, search);
			tableData = ordersRes.data.data.influencers;
			total = ordersRes.data.data.total;
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	};

	const onPageChange = async (newPage: number) => {
		page = newPage;
		handlePageChange();
	};

	const onNextClick = async () => {
		page++;
		handlePageChange();
	};

	const onPrevClick = async () => {
		page--;
		handlePageChange();
	};

	const onInputChange = () => {
		page = 1;
		handlePageChange();
	};

	const handlePageChange = async () => {
		offset = (page - 1) * limit;
		try {
			const ordersRes = await aiApi.getInfluencers(limit, offset, search);
			tableData = ordersRes.data.data.influencers;
			total = ordersRes.data.data.total;
		} catch (error) {
			console.log(error);
		}
	};
	onMount(() => {
		setInfluencers();
	});
</script>

<div>
	<input
		type="search"
		bind:value={search}
		on:input={onInputChange}
		class="input"
		placeholder="Email or Contact ID"
	/>
	{#if loading}
		<div style="position: relative;">
			<Loader />
		</div>
	{:else if tableData}
		<Table
			data={tableData.map((influencer) => {
				return {
					hubspotContactId: influencer.hubspotContactId,
					email: influencer.email,
					name: influencer.name,
					id: influencer.hubspotContactId
				};
			})}
			columns={defaultColumns}
			pagination={{
				page,
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
</div>

<style>
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
