<script lang="ts">
	import Button from '$lib/shared/button/Button.svelte';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import type { InfluencerDetails } from '$types/customerOrders';
	import { onMount } from 'svelte';
	import { aiApi } from '../../../../api';
	import EditModal from './components/EditModal.svelte';
	import type { AllScents } from './components/types';

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
			console.log('🚀 ~ file: [id].svelte ~ line 70 ~ saveScents ~ scentsToSave', scentsToSave);

			await aiApi.setInfluencerScents({
				orderId: data.id,
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
				main: influencer.scentCodes.main,
				secScent1: influencer.scentCodes.secondary1,
				secScent2: influencer.scentCodes.secondary2
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
			<tr>
				<td>Scent codes</td>
				<td class="scents">
					<table>
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
				</td>
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
	.table {
		margin: 40px 0 0;
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
	.scents {
		padding: 0 !important;
	}
</style>
