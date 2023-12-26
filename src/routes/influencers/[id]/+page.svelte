<script lang="ts">
	import { aiApi } from '$api/index';
	import Button from '$lib/shared/button/Button.svelte';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import DiecutModal from '$lib/shared/modals/DiecutModal.svelte';
	import EditModal from '$lib/shared/modals/editScents/EditScentsModal.svelte';
	import type { GetAllScentsResBody, InfluencerDetails } from '$types/customerOrders';
	import { onMount } from 'svelte';
	import Toastify from 'toastify-js';
	import ScentRow from './../../../lib/shared/scentRow/ScentRow.svelte';
	import { callAlert } from '$utils/alert';

	export let data;

	let influencer: InfluencerDetails | null = null;
	let loading = true;
	let allScents: GetAllScentsResBody | null = null;
	let isModalOpened = false;
	let isSaving = false;
	let isDiecutSaving = false;
	let isDiecutModalOpened = false;
	let scents = {
		main: '',
		secScent1: '',
		secScent2: ''
	};

	const toggleModal = () => {
		isModalOpened = !isModalOpened;
	};

	const toggleDiecutModal = () => {
		isDiecutModalOpened = !isDiecutModalOpened;
	};

	const saveDiecut = async (diecut: File) => {
		isDiecutSaving = true;
		try {
			const form = new FormData();
			form.append('file', diecut);
			form.append('contactId', data.id);
			const newDiecut = await aiApi.saveInfluencerDiecut(form);
			isDiecutModalOpened = false;
			if (influencer) influencer.journey.diecutLink = newDiecut;
		} catch (err) {
			callAlert('Something went wrong');
		} finally {
			isDiecutSaving = false;
		}
	};

	const saveScents = async (scentsToSave: {
		main: string;
		secScent1: string;
		secScent2: string;
	}) => {
		isSaving = true;

		try {
			await aiApi.setInfluencerScents({
				contactId: data.id,
				main: scentsToSave.main,
				secScent1: scentsToSave.secScent1,
				secScent2: scentsToSave.secScent2
			});
			scents = scentsToSave;
			toggleModal();
		} catch (err) {
			console.log(err);
		} finally {
			isSaving = false;
		}
	};
	const getInfluencer = async () => {
		loading = true;
		try {
			const influencerRes = await aiApi.getInfluencer(data.id);

			influencer = influencerRes.data.data;

			scents = {
				main: influencer.journey?.scentCodes?.main || '',
				secScent1: influencer.journey?.scentCodes?.secondary1 || '',
				secScent2: influencer.journey?.scentCodes?.secondary2 || ''
			};
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	};
	const getScents = async () => {
		try {
			const res = await aiApi.getAllScents();
			allScents = res.data;
		} catch (err) {
			console.log(err);
		}
	};
	onMount(() => {
		Promise.all([getInfluencer(), getScents()]);
	});
</script>

<main class="wrapper">
	{#if loading}
		<div class="loader">
			<Loader />
		</div>
	{:else if influencer}
		<h2>
			Hubspot contact ID - {data.id}
		</h2>

		<!-- {#if influencer.shopify}
			<h2 class="scentsTitle">Order info</h2>
			<table class="table">
				<tr>
					<td> financialStatus </td>
					<td>{influencer.shopify.financialStatus || ''}</td>
				</tr>
				<tr>
					<td> Status </td>
					<td>
						<a href={influencer.shopify.statusUrl} target="_blank">Link</a>
					</td>
				</tr>
				<tr>
					<td> Price </td>
					<td>
						{influencer.shopify.price || ''}
						{influencer.shopify.currency || ''}
					</td>
				</tr>
				<tr>
					<td> Creation At </td>
					<td>
						{influencer.shopify.createdAt || ''}
					</td>
				</tr>
				<tr>
					<td> Processed At </td>
					<td>
						{influencer.shopify.processedAt || ''}
					</td>
				</tr>
			</table>
		{/if} -->
		<h2 class="scentsTitle">Influencer's info</h2>
		<table class="table">
			{#if influencer.info.firstName || influencer.info.lastName}
				<tr>
					<td>Name</td>
					<td
						>{`${influencer.info.firstName?.trim() || ''}  ${
							influencer.info.lastName?.trim() || ''
						}`}</td
					>
				</tr>
			{/if}

			<tr>
				<td>Email</td>
				<td>{influencer.info.email}</td>
			</tr>
			<tr>
				<td> Contact Id </td>
				<td>{data.id}</td>
			</tr>
			{#if influencer.info.socialHandle}
				<tr>
					<td>Social Handle</td>
					<td>{influencer.info.socialHandle}</td>
				</tr>
			{/if}
		</table>
		{#if influencer.journey}
			<h2 class="scentsTitle">Journey</h2>
			<table class="table">
				<tr>
					<td>Answers</td>
					<td>
						{influencer.journey.gender} / {influencer.journey.time} / {influencer.journey.mode ||
							influencer.journey.mood ||
							''}
					</td>
				</tr>
				<tr>
					<td>Fragrance</td>
					<td>
						{influencer.journey.fragrance.name} / {influencer.journey.fragrance.family}
						/ {influencer.journey.fragrance.gender}
						<a href={influencer.journey.fragrance.image} target="_blank">Image link</a>
					</td>
				</tr>
				<tr>
					<td>Pyramid</td>
					<td>
						<p>
							Top: {influencer.journey.fragrance.pyramid?.top.map((note) => note).join(', ') || ''}
						</p>
						<p>
							Middle: {influencer.journey.fragrance.pyramid?.middle
								.map((note) => note)
								.join(', ') || ''}
						</p>
						<p>
							Order: {influencer.journey.fragrance.pyramid?.base.map((note) => note).join(', ') ||
								''}
						</p>
					</td>
				</tr>
				{#if influencer.journey.micrositeSlug}
					<tr>
						<td>Microsite</td>
						<td>
							{influencer.journey.micrositeSlug}
						</td>
					</tr>
				{/if}
				{#if influencer.journey.bottleLabel}
					<tr>
						<td> Bottle label </td>
						<td>
							<a href={influencer.journey.bottleLabel} target="_blank">Link</a>
						</td>
					</tr>
				{/if}
				{#if influencer.journey.boxLabel}
					<tr>
						<td> Box label </td>
						<td>
							<a href={influencer.journey.boxLabel} target="_blank">Link</a>
						</td>
					</tr>
				{/if}

				<tr>
					<td> Diecut </td>
					<td>
						<div class="diecut">
							{#if influencer.journey.diecutLink}
								<a href={influencer.journey.diecutLink} target="_blank"> Link </a>
							{:else}
								<span>No diecut</span>
							{/if}
							<button class="generate-diecut-button" on:click={toggleDiecutModal}> Upload </button>
						</div>
					</td>
				</tr>
			</table>
		{/if}
		{#if influencer.journey.initialScents}
			<h2 class="scentsTitle">Initial scents</h2>
			<table class="table">
				<tr>
					<td>Main</td>
					<td> {influencer.journey.initialScents.main || ''}</td>
				</tr>
				<tr>
					<td>Secondary1</td>
					<td> {influencer.journey.initialScents.secondary1 || ''}</td>
				</tr>
				<tr>
					<td>Secondary2</td>
					<td> {influencer.journey.initialScents.secondary2 || ''}</td>
				</tr>
			</table>
		{/if}

		<h2 class="scentsTitle">Scents</h2>
		<table class="table">
			<ScentRow
				scent={{
					code: scents.main,
					oosStatus: false
				}}
				key="Main"
			/>
			<ScentRow
				scent={{
					code: scents.secScent1,
					oosStatus: false
				}}
				key="Secondary 1"
			/>
			<ScentRow
				scent={{
					code: scents.secScent2,
					oosStatus: false
				}}
				key="Secondary 2"
			/>
		</table>

		<div class="editWrapper">
			<Button onClick={toggleModal} text="Edit scent" />
		</div>
	{/if}
</main>

{#if allScents}
	<EditModal
		availableScents={{
			main: allScents,
			secondary1: allScents,
			secondary2: allScents
		}}
		{toggleModal}
		scents={{
			main: scents.main,
			secondary1: scents.secScent1,
			secondary2: scents.secScent2
		}}
		onSave={saveScents}
		isLoading={isSaving}
		isOpened={isModalOpened}
	/>
{/if}
<DiecutModal
	isOpened={isDiecutModalOpened}
	toggleModal={toggleDiecutModal}
	onSave={saveDiecut}
	isLoading={isDiecutSaving}
/>

<style>
	.editWrapper {
		margin: 8px auto 0;
	}

	.scentsTitle {
		margin: 40px 0 8px;
		font-size: 20px;
		font-weight: 600;
	}
	.diecut {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.generate-diecut-button {
		background: none;
		border: none;
		text-decoration: underline;
	}
	.table {
		border-collapse: collapse;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		& a {
			color: rgb(1, 8, 155);
		}
		& td {
			min-width: 103px;
			border: 1px solid #000;
			padding: 8px;
		}
		& td {
			& table {
				width: 100%;
				border-collapse: collapse;
				margin: -2px;
				width: calc(100% + 4px);
				& td {
					min-width: unset;
				}
			}
		}
	}
</style>
