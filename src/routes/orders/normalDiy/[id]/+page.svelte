<script lang="ts">
	import { aiApi } from '$api/index.js';
	import Alert from '$lib/shared/alert/Alert.svelte';
	import Button from '$lib/shared/button/Button.svelte';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import EditModal from '$lib/shared/modals/EditScentsModal.svelte';
	import type { GetDiyOrderData } from '$types/customerOrders.js';
	import type { AllScents } from '$types/index.js';
	import { formatDate, relativeDate } from '$utils/time.js';
	import { onMount } from 'svelte';
	import JSONTree from 'svelte-json-tree';

	export let data;

	let order: GetDiyOrderData | null = null;
	let loading = true;
	let isModalOpened = false;
	let isSaving = false;
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
			await aiApi.setDiyScents({
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
			const res = await aiApi.getDiyOrder(data.id);
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
</script>

<main class="wrapper">
	{#if loading}
		<div class="loader">
			<Loader />
		</div>
	{:else if order}
		<h1 class="title">{order.orderName} | {order.subtotalPrice} {order.currency}</h1>
		<div class="tags">
			<div class="tag" style="cursor: help" title={order.orderType}>DIY order</div>
			<div class="tag">{order.confirmed ? 'Confirmed' : 'Not confirmed'}</div>
		</div>

		<table class="table mainInfo">
			<tr>
				<td>Email</td>
				<td>{order.financialStatus}</td>
			</tr>
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

		{#if order.attributes && !order?.attributes?.allInfluencerData && !order?.attributes?.journeyData}
			<h2 class="journeyTitle">Journey</h2>
			<table class="table">
				<tr>
					<td>Answers</td>
					<td>
						{order.attributes.gender} / {order.attributes.time} / {order.attributes.mood}
					</td>
				</tr>
				<tr>
					<td>Fragrance</td>
					<td>
						{order.attributes.selectedFragrance?.name} / {order.attributes.selectedFragrance.family}
						/ {order.attributes.selectedFragrance?.gender}
						<a href={order.attributes.selectedFragrance?.image} target="_blank">Image link</a>
					</td>
				</tr>
				<tr>
					<td>Label type</td>
					<td>
						{order.attributes.labelType}
					</td>
				</tr>
				<tr>
					<td>Label Name</td>
					<td>{order.attributes.labelName}</td>
				</tr>
				{#if order.attributes.labelType !== 'GENERIC'}
					<tr>
						<td>Final Label Image</td>
						<td> <a href={order.attributes.finalLabelImage} target="_blank"> </a></td>
					</tr>
				{/if}
				<tr>
					<td>Bottle Size</td>
					<td>{order.attributes.bottleSize}</td>
				</tr>
				<!-- <tr>
					<td>Selected mockup</td>
					<td>
						<a href={order.attributes.selectedMockup} target="_blank"> Link </a>
					</td>
				</tr> -->
			</table>
			<h2 class="scentsTitle">Initial scents</h2>
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
		{:else}
			<Alert>
				<p>Looks like we cannot process this order.</p>
				<p>This order is old or was created not by our scentcraft api</p>
				<p>You can see order just with JSON format below</p>
			</Alert>
			<div
				style="
				--json-tree-string-color: #cb3f41;
				--json-tree-symbol-color: #cb3f41;--json-tree-boolean-color: #112aa7;--json-tree-function-color: #112aa7;--json-tree-number-color: #3029cf;--json-tree-label-color: #871d8f;--json-tree-property-color: #000000;--json-tree-arrow-color: #727272;--json-tree-operator-color: #727272;--json-tree-null-color: #8d8d8d;--json-tree-undefined-color: #8d8d8d;--json-tree-date-color: #8d8d8d;--json-tree-internal-color: grey;--json-tree-regex-color: #cb3f41;/* position */--json-tree-li-indentation: 1em;--json-tree-li-line-height: 1.3;/* font */--json-tree-font-size: 16px;
				--json-tree-font-family: 'Courier New', Courier, monospace;"
			>
				<JSONTree defaultExpandedLevel={1} value={order} />
			</div>
		{/if}
	{/if}
</main>

<style>
	.title {
		margin: 20px 0 0;
	}

	.tags {
		display: flex;
		gap: 5px;
	}
	.journeyTitle {
		margin: 40px 0 8px;
		font-size: 20px;
		font-weight: 600;
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
		margin: 20px 0;
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
