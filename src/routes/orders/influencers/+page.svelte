<script lang="ts">
	import { aiApi } from '$api/index';
	import { goto } from '$app/navigation';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import type { Influencer } from '$types/customerOrders';
	import Grid from 'gridjs-svelte';
	import { onMount } from 'svelte';
	import { columns } from './utils';

	let tableData: Influencer[] = [];
	let loading = false;

	const onOrderClick = (cellInfo: any) => {
		const id = cellInfo.detail[1]._cells[0].data;
		goto(`/orders/influencers/${id}`);
	};

	const setInfluencers = async () => {
		loading = true;
		try {
			const ordersRes = await aiApi.getInfluencers();
			tableData = ordersRes.data.data;
			console.log(tableData);
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	};
	onMount(() => {
		setInfluencers();
	});
</script>

<div>
	{#if loading}
		<Loader />
	{:else}
		<Grid
			className={{
				table: 'table'
			}}
			data={tableData.map((influencer) => {
				return {
					id: influencer.hubspotContactId,
					email: influencer.email,
					name: `${influencer?.firstName?.trim() || ''} ${influencer?.lastName?.trim() || ''}`
				};
			})}
			height="500px"
			{columns}
			search
			pagination={{
				limit: 50
			}}
			fixedHeader
			on:rowClick={onOrderClick}
		/>
	{/if}
</div>
