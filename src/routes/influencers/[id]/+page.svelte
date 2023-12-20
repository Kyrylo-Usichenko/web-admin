<script lang="ts">
	import { aiApi } from '$api/index';
	import Button from '$lib/shared/button/Button.svelte';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import EditModal from '$lib/shared/modals/EditScentsModal.svelte';
	import type { InfluencerDetails } from '$types/customerOrders';
	import type { AllScents } from '$types/index.js';
	import { onMount } from 'svelte';

	export let data;

	let influencer: InfluencerDetails | null = null;
	let loading = true;
	let allScents: AllScents | null = null;
	let scents = {
		main: '',
		secScent1: '',
		secScent2: ''
	};
	let isModalOpened = false;
	let isSaving = false;

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

	const toggleModal = () => {
		isModalOpened = !isModalOpened;
	};

	onMount(async () => {
		try {
			const [influencerRes, scentsRes] = await Promise.all([
				await aiApi.getInfluencer(data.id),
				await aiApi.getScents()
			]);
			influencer = influencerRes.data.data;

			const mainScents = Object.keys(scentsRes.data)
				.map((key) => {
					const title = scentsRes.data[key]['50ML']?.title;
					const qty = scentsRes.data[key]['50ML']?.qty;
					if (!title || !qty) return null;
					return {
						name: title.substring(title.indexOf('-') + 1, title.lastIndexOf('-')).trim(),
						quantity: qty,
						code: key
					};
				})
				.filter((scent) => scent !== null);
			const secindaryScents1 = Object.keys(scentsRes.data)
				.map((key) => {
					const title = scentsRes.data[key]['5ML']?.title;
					const qty = scentsRes.data[key]['5ML']?.qty;
					if (!title || !qty) return null;

					return {
						name: title.substring(title.indexOf('-') + 1, title.lastIndexOf('-')).trim(),
						quantity: qty,
						code: key
					};
				})
				.filter((scent) => scent !== null);
			const secindaryScents2 = Object.keys(scentsRes.data)
				.map((key) => {
					const title = scentsRes.data[key]['5ML']?.title;
					const qty = scentsRes.data[key]['5ML']?.qty;
					if (!title || !qty) return null;

					return {
						name: title.substring(title.indexOf('-') + 1, title.lastIndexOf('-')).trim(),
						quantity: qty,
						code: key
					};
				})
				.filter((scent) => scent !== null);
			allScents = {
				main: mainScents,
				secondary1: secindaryScents1,
				secondary2: secindaryScents2
			};
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
	});
</script>

<main class="wrapper">
	{#if loading}
		<div class="loader">
			<Loader />
		</div>
	{:else if influencer}
		<h1>Influencer contactId: {data.id}</h1>

		<table class="table">
			<h2 class="scentsTitle">Influencer's info</h2>
			<tr>
				<td>Name</td>
				<td
					>{`${influencer.info.firstName?.trim() || ''}  ${
						influencer.info.lastName?.trim() || ''
					}`}</td
				>
			</tr>
			<tr>
				<td>Email</td>
				<td>{influencer.info.email}</td>
			</tr>
			<tr>
				<td>Social Handle</td>
				<td>{influencer.info.socialHandle}</td>
			</tr>
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
				<tr>
					<td>Microsite</td>
					<td>
						{influencer.journey.micrositeSlug}
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
			<tr>
				<td>Main</td>
				<td>{scents?.main}</td>
			</tr>
			<tr>
				<td>Secondary1</td>
				<td>{scents?.secScent1}</td>
			</tr>
			<tr>
				<td>Secondary2</td>
				<td>{scents?.secScent2}</td>
			</tr>
		</table>

		<div class="editWrapper">
			<Button onClick={toggleModal} text="Edit scent" />
		</div>
	{/if}
</main>

{#if allScents}
	<EditModal
		{allScents}
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

<style>
	.editWrapper {
		margin: 8px auto 0;
	}

	.scentsTitle {
		margin: 40px 0 8px;
		font-size: 20px;
		font-weight: 600;
	}

	.table {
		border-collapse: collapse;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;

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
