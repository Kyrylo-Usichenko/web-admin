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
				main: influencer.scentCodes?.main || '',
				secScent1: influencer.scentCodes?.secondary1 || '',
				secScent2: influencer.scentCodes?.secondary2 || ''
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
			<tr>
				<td>Microsite</td>
				<td>{influencer.micrositeSlug}</td>
			</tr>
			<tr>
				<td>Email</td>
				<td>{influencer.email}</td>
			</tr>
			<tr>
				<td>Name</td>
				<td>{`${influencer.firstName?.trim() || ''}  ${influencer.lastName?.trim() || ''}`}</td>
			</tr>
			<tr>
				<td>Social Handle</td>
				<td>{influencer.socialHandle}</td>
			</tr>
		</table>

		<h2 class="scentsTitle">Scents</h2>
		<table class="table">
			<tr>
				<td>Main</td>
				<td>{scents.main}</td>
			</tr>
			<tr>
				<td>Secondary1</td>
				<td>{scents.secScent1}</td>
			</tr>
			<tr>
				<td>Secondary2</td>
				<td>{scents.secScent2}</td>
			</tr>
		</table>
		<div class="editWrapper">
			<Button onClick={toggleModal} text="Edit scent" />
		</div>

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
	{/if}
</main>

<style>
	.editWrapper {
		margin: 8px auto 0;
	}

	.scentsTitle {
		margin: 20px 0 0;
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
