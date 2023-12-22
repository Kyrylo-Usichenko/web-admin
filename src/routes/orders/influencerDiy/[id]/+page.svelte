<script lang="ts">
	import { aiApi } from '$api/index.js';
	import BrokenOrder from '$lib/shared/brokenOrder/BrokenOrder.svelte';
	import Button from '$lib/shared/button/Button.svelte';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import DiecutModal from '$lib/shared/modals/DiecutModal.svelte';
	import EditModal from '$lib/shared/modals/editScents/EditScentsModal.svelte';
	import type { GetInfluencerDiyOrderData } from '$types/customerOrders.js';
	import type { AvailableScents } from '$types/index.js';
	import { formatDate, relativeDate } from '$utils/time.js';
	import { onMount } from 'svelte';
	import Toastify from 'toastify-js';

	export let data;

	let order: GetInfluencerDiyOrderData | null = null;
	let loading = true;
	let isModalOpened = false;
	let isSaving = false;
	let availableScents: AvailableScents | null = null;
	let isDiecutSaving = false;
	let isDiecutModalOpened = false;
	let scents: {
		main: string;
		secScent1: string;
		secScent2: string;
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
			form.append('orderId', data.id);
			const newDiecut = await aiApi.saveDiecut(form);
			isDiecutModalOpened = false;
			if (order) order.diecutLink = newDiecut;
		} catch (err) {
			Toastify({
				text: 'Something went wrong',
				duration: 3000,
				close: true,
				gravity: 'top',
				position: 'center',
				stopOnFocus: true
			}).showToast();
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
			const res = await aiApi.setInfluencerDiyScents({
				orderId: data.id,
				main: scentsToSave?.main,
				secScent: scentsToSave?.secScent1,
				influencerScent: scentsToSave?.secScent2
			});
			scents = scentsToSave;
			toggleModal();
		} catch (err) {
			console.log(err);
		} finally {
			isSaving = false;
		}
	};

	const getOrder = async () => {
		loading = true;
		try {
			const res = await aiApi.getFollowerDiyOrder(data.id);
			order = res.data.data;

			scents = {
				main: order.attributes?.scents.main || '',
				secScent1: order.attributes?.scents.secondary || '',
				secScent2: order.attributes?.scents.influencerScent || ''
			};
			isModalOpened = false;
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	};
	const getScents = async () => {
		try {
			const res = await aiApi.getScents2(data.id);
			availableScents = res.data.scents;
		} catch (err) {
			console.log(err);
		}
	};

	onMount(() => {
		Promise.all([getOrder(), getScents()]);
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
			<div class="tag" style="cursor: help" title={order.orderType}>Follower's DIY</div>
			<div class="tag">{order.confirmed ? 'Confirmed' : 'Not confirmed'}</div>
		</div>

		<table class="table mainInfo">
			<tr>
				<td>Status</td>
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
				<td> Diecut </td>
				<td>
					<div class="diecut">
						{#if order.diecutLink}
							<a href={order.diecutLink} target="_blank"> Link </a>
						{:else}
							<span>No diecut</span>
						{/if}
						<button class="generate-diecut-button" on:click={toggleDiecutModal}> Upload </button>
					</div>
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

		{#if order.attributes && !order.attributes?.allInfluencerData && !order.attributes?.journeyData}
			<h2 class="journeyTitle">Journey</h2>

			<table class="table">
				<tr>
					<td>Answers</td>
					<td>
						{order.attributes?.gender} / {order.attributes?.time} / {order.attributes?.mood}
					</td>
				</tr>
				<tr>
					<td>Fragrance</td>
					<td>
						{order.attributes?.selectedFragrance.name} / {order.attributes?.selectedFragrance
							.family} / {order.attributes?.selectedFragrance.gender}
						<a href={order.attributes?.selectedFragrance?.image} target="_blank">Image link</a>
					</td>
				</tr>
				<tr>
					<td>Pyramid</td>
					<td>
						<p>
							Top: {order.attributes.selectedFragrance?.pyramid?.top
								.map((note) => note)
								.join(', ') || ''}
						</p>
						<p>
							Middle: {order.attributes.selectedFragrance?.pyramid?.middle
								.map((note) => note)
								.join(', ') || ''}
						</p>
						<p>
							Order: {order.attributes.selectedFragrance?.pyramid?.base
								.map((note) => note)
								.join(', ') || ''}
						</p>
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
			{#if order.influencer}
				<div style="display: flex;">
					<h2 class="scentsTitle">Influencer</h2>
				</div>

				<table class="table">
					<tr>
						<td> Influencer's microsite </td>
						<td> {order.influencer.micrositeSlug} </td>
					</tr>
					<tr>
						<td> Name </td>
						<td> {order.influencer.name} </td>
					</tr>
					<tr>
						<td> Email </td>
						<td> {order.influencer.email} </td>
					</tr>
					<tr>
						<td> Contact Id </td>
						<td>
							<a href={`/influencers/${order.influencer.contactId}`} target="_blank">
								{order.influencer.contactId}
							</a>
						</td>
					</tr>
					<tr>
						<td> Instagram </td>
						<td> {order.influencer.socialHandle} </td>
					</tr>
					<tr>
						<td> Main scent </td>
						<td> {order.influencer.scentCodes.main} </td>
					</tr>
					<tr>
						<td> Secondary scent </td>
						<td> {order.influencer.scentCodes.secondary1} </td>
					</tr>
					<tr>
						<td> Secondary scent 2 </td>
						<td> {order.influencer.scentCodes.secondary2} </td>
					</tr>
				</table>
			{/if}

			<h2 class="scentsTitle">Initial Scents</h2>
			<table class="table">
				<tr>
					<td> Main </td>
					<td> {order.attributes.initialScents.main || ''} </td>
				</tr>
				<tr>
					<td> Secondary</td>
					<td> {order.attributes.initialScents.secondary || ''} </td>
				</tr>
				<tr>
					<td> Influencer's main scent </td>
					<td> {order.attributes.initialScents.influencerScent || ''} </td>
				</tr>
			</table>
			<h2 class="scentsTitle">Scents</h2>
			<table class="table">
				<tr>
					<td> Main </td>
					<td> {scents?.main} </td>
				</tr>
				<tr>
					<td> Secondary</td>
					<td> {scents?.secScent1} </td>
				</tr>
				<tr>
					<td> Influencer's main scent</td>
					<td> {scents?.secScent2} </td>
				</tr>
			</table>

			<div class="editWrapper">
				<Button onClick={toggleModal} text="Edit scents" />
			</div>
		{:else}
			<BrokenOrder {order} />
		{/if}
	{/if}
</main>

<!-- modals -->

<DiecutModal
	isOpened={isDiecutModalOpened}
	toggleModal={toggleDiecutModal}
	onSave={saveDiecut}
	isLoading={isDiecutSaving}
/>

{#if availableScents}
	<EditModal
		{availableScents}
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
	.title {
		margin: 10px 0 0;
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
		margin: 10px 0 0;
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
