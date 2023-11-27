<script lang="ts">
	import { aiApi } from '$api/index';
	import Button from '$lib/shared/button/Button.svelte';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import type { Fragrances, JourneyData } from '$types/index';
	import { onMount } from 'svelte';
	import type { SetScentsReqBodyScents } from '../../../api/main/types';
	import AllocationInfo from './AllocationInfo.svelte';
	import EditModal from '../../orders/influencers/[id]/components/EditModal.svelte';
	import type { Scents } from './types.js';
	import { extractScentCode, fetchFragrances } from './utils.js';

	export let data;

	let allScents: Fragrances | null = null;
	let loading = true;
	let isSaving = false;
	let isModalOpened: boolean = false;
	let orderName = '';
	let orderInfo: any = null;
	let scents: Scents = {
		main: '',
		secondary1: '',
		secondary2: ''
	};
	let journey: JourneyData | null = null;

	const saveScents = async (scentsToSave: SetScentsReqBodyScents) => {
		isSaving = true;
		try {
			await aiApi.setInfluencerScents({
				orderId: +data.id,
				main: extractScentCode(scentsToSave.main),
				secScent1: extractScentCode(scentsToSave.secScent1),
				secScent2: extractScentCode(scentsToSave.secScent2)
			});
			scents = {
				main: scentsToSave.main,
				secondary1: scentsToSave.secScent1,
				secondary2: scentsToSave.secScent2
			};
			toggleModal();
		} catch (e) {
			alert(e);
		} finally {
			isSaving = false;
		}
	};

	const toggleModal = () => {
		isModalOpened = !isModalOpened;
	};

	onMount(async () => {
		loading = true;
		try {
			const [orderRes, fragrancesRes] = await Promise.all([
				await aiApi.getInfluencerOrder(data.id),
				fetchFragrances()
			]);

			const { note_attributes, name, journeyData } = orderRes.data.data;

			// const asd = webAdminApi.getFragnanceDetails(journeyData.fragrance.name);

			journey = journeyData;

			scents = {
				main: note_attributes.find((attribute) => attribute.value === 'New You')?.name || '',
				secondary1: note_attributes.find((attribute) => attribute.value === 'Scent 2')?.name || '',
				secondary2: note_attributes.find((attribute) => attribute.value === 'Scent 3')?.name || ''
			};

			orderName = name;
			orderInfo = orderRes;
			allScents = fragrancesRes;
		} catch (e) {
			console.log(e);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<Loader />
{:else}
	<main class="wrapper">
		<a href="/">
			<Button text="Go back" />
		</a>

		<h2>Order: {orderName} {data.id}</h2>

		<AllocationInfo
			data={{
				gender: journey?.gender,
				time: journey?.time,
				mood: journey?.mode
			}}
		/>

		<p class="scents">SCENTS</p>
		<table class="table1">
			{#if scents}
				<tr>
					<td>New You</td>
					<td>{scents.main}</td>
				</tr>
				<tr>
					<td>Scent 2</td>
					<td>{scents.secondary1}</td>
				</tr>
				<tr>
					<td>Scent 3</td>
					<td>{scents.secondary2}</td>
				</tr>
			{/if}
		</table>

		<div class="editWrapper">
			<Button onClick={toggleModal} text="Edit scent" />
		</div>

		{#if allScents}
			<EditModal
				{allScents}
				{toggleModal}
				{scents}
				onSave={saveScents}
				isLoading={isSaving}
				isOpened={isModalOpened}
			/>
		{/if}
	</main>
{/if}

<style>
	.table1 {
		table-layout: fixed;
		border-spacing: 0;
		border-collapse: collapse;
		text-overflow: ellipsis;

		& td {
			min-width: 103px;
			max-width: 163px;
			height: 32px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			padding: 0 8px;
			font-size: 14px;
			border: 1px solid black;

			&:first-child {
				min-width: 83px !important;
				max-width: 120px !important;
			}
		}
	}
	.editWrapper {
		margin: 8px auto 0;
	}

	.scents {
		margin: 48px auto 16px;
	}
	.loader {
		margin: 0 auto;
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
