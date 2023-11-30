<script lang="ts">
	import { aiApi } from '$api/index.js';
	import Button from '$lib/shared/button/Button.svelte';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import EditModal from '$lib/shared/modals/EditScentsModal.svelte';
	import type { GetShopOrderData } from '$types/customerOrders.js';
	import type { AllScents } from '$types/index.js';
	import { formatDate, relativeDate } from '$utils/time.js';
	import { onMount } from 'svelte';

	export let data;

	let order: GetShopOrderData | null = null;

	let loading: boolean = true;
	let isModalOpened: boolean = false;
	let isSaving: boolean = false;
	let allScents: AllScents | null = null;
	let scents: {
		main: string;
		secScent1: string;
		secScent2: string;
	} = {
		main: '',
		secScent1: '',
		secScent2: ''
	};

	const toggleModal = () => {
		isModalOpened = !isModalOpened;
	};

	const saveScents = async (scentsToSave: {
		main: string;
		secScent1: string;
		secScent2: string;
	}) => {
		isSaving = true;
		try {
			await aiApi.setShopOrderScents({
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

	const getOrders = async () => {
		loading = true;
		try {
			const res = await aiApi.getInfluencerShopOrder(data.id);
			console.log(res.data.data);
			order = res.data.data;

			scents = {
				main: order.attributes?.scents.main || '',
				secScent1: order.attributes?.scents.secondary1 || '',
				secScent2: order.attributes?.scents.secondary2 || ''
			};
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	};

	onMount(async () => {
		const [influencerRes, scentsRes] = await Promise.all([getOrders(), aiApi.getScents()]);

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
	});
	$: console.log(scents);
</script>

<main class="wrapper">
	{#if loading}
		<div class="loader">
			<Loader />
		</div>
	{:else if order}
		<h1 class="title">{order.orderName} | {order.subtotalPrice} {order.currency}</h1>
		<div class="tags">
			<div class="tag">{order.orderType}</div>
			<div class="tag">{order.financialStatus}</div>
			<div class="tag">{order.confirmed ? 'Confirmed' : 'Not confirmed'}</div>
		</div>

		<table class="table mainInfo">
			<tr>
				<td>Email</td>
				<td>{order.customerEmail}</td>
			</tr>
			<tr>
				<td>Price</td>
				<td>{order.subtotalPrice} {order.currency}</td>
			</tr>

			<tr>
				<td> Order status URL </td>
				<td>
					<a href={order.orderStatusUrl} target="_blank"> Link </a>
				</td>
			</tr>
			<tr>
				<td> Processed at </td>
				<td>
					{relativeDate(order.processedAt)}
					<span class="date">
						-
						{formatDate(order.processedAt)}
					</span>
				</td>
			</tr>
			<tr>
				<td> Created at </td>
				<td>
					{relativeDate(order.createdAt)}
					<span class="date">
						-
						{formatDate(order.createdAt)}
					</span>
				</td>
			</tr>
		</table>
		{#if order.attributes}
			<h2 class="journeyTitle">Purchase</h2>

			<table class="table">
				<tr>
					<td>Influencer microsite</td>
					<td>{order.attributes.micrositeSlug || ''}</td>
				</tr>
				<tr>
					<td>Mockup</td>
					<td>
						<a href={order.attributes.selectedMockup} target="_blank"> Link </a>
					</td>
				</tr>
				<tr>
					<td> Bottle size </td>
					<td>
						{order.attributes.bottleSize || ''}
					</td>
				</tr>
			</table>
			<h2 class="scentsTitle">Scents</h2>
			<table class="table">
				<tr>
					<td> Main </td>
					<td> {scents.main} </td>
				</tr>
				<tr>
					<td> Secondary</td>
					<td> {scents.secScent1} </td>
				</tr>
				<tr>
					<td> Secondary 2</td>
					<td> {scents.secScent2} </td>
				</tr>
			</table>
			<div class="editWrapper">
				<Button onClick={toggleModal} text="Edit scents" />
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
	.title {
		margin: 10px 0 0;
	}

	.tags {
		display: flex;
		gap: 5px;
	}
	.journeyTitle {
		margin: 10px 0 0;
	}
	.tag {
		margin: 5px 0 0;
		width: fit-content;
		padding: 8px 12px;
		background: #333;
		border-radius: 2px;
		color: #fff;
		text-transform: uppercase;
		line-height: 16px;
	}
	.date {
		color: #999;
	}
	.mainInfo {
		margin: 20px 0 0;
	}

	.editWrapper {
		margin: 10px 0 0;
	}
	.scentsTitle {
		margin: 20px 0 0;
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
