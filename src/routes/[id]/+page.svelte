<script lang="ts">
	import Loader from '$lib/shared/loader/Loader.svelte';
	import Modal from '$lib/shared/modal/Modal.svelte';
	import { onMount } from 'svelte';
	import type { OrderDetails } from '../../types/index.js';
	import { fetchFragrances, fetchOrder } from './utils.js';

	export let data;
	let order: OrderDetails | null = null;
	let fragrances: any[] | null = null;
	let loading = true;
	let isModalOpened: boolean = false;

	const toggleModal = () => {
		isModalOpened = !isModalOpened;
	};
	console.log();

	onMount(async () => {
		loading = true;
		try {
			const [orderRes, fragrancesRes] = await Promise.all([fetchOrder(data), fetchFragrances()]);
			order = orderRes;
			fragrances = fragrancesRes;
		} catch (e) {
			console.log(e);
		} finally {
			loading = false;
		}
	});
	$: console.log(order?.note_attributes);
</script>

<a href="/"> <button>Go back</button></a>

<h2>Order: {order?.name} {data.id}</h2>

<p class="scents">SCENTS</p>

<main class="wrapper">
	{#if loading}
		<div class="loader">
			<Loader />
		</div>
	{:else}
		<table class="table">
			{#if order}
				{#each order.note_attributes as atrribute}
					{#if atrribute.value === 'New You' || atrribute.value === 'Scent 2' || atrribute.value === 'Scent 3'}
						<tr>
							<td>{atrribute.value}</td>
							<td>{atrribute.name}</td>
						</tr>
					{/if}
				{/each}
			{/if}
		</table>

		<button on:click={toggleModal} class="editScent">Edit scents</button>
	{/if}

	{#if isModalOpened && fragrances}
		<Modal {toggleModal}>
			<div>
				{#if order}
					<p>New You</p>
					<select class="select" name="" id="">
						{#each fragrances as fragrance}
							<option value={fragrance.code}>({fragrance.code}) {fragrance.name}</option>
						{/each}
					</select>
					<p>Scent 2</p>
					<select class="select" name="" id="">
						{#each fragrances as fragrance}
							<option value={fragrance.code}>({fragrance.code}) {fragrance.name}</option>
						{/each}
					</select>
					<p>Scent 3</p>
					<select class="select" name="" id="">
						{#each fragrances as fragrance}
							<option value={fragrance.code}>({fragrance.code}) {fragrance.name}</option>
						{/each}
					</select>
				{/if}
			</div>
			<div class="buttons">
				<button
					on:click={() => {
						toggleModal;
					}}>Save</button
				>
			</div>
		</Modal>
	{/if}
</main>

<style global>
	@import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';
	.buttons {
		margin: 20px auto 0;
		display: flex;
		justify-content: space-between;
	}
	.table {
		border-spacing: 0;
		border-collapse: collapse;
		& td {
			border: 1px solid black;
		}

		& td {
			padding: 0 8px;
			height: 32px;
			width: 200px;
			font-size: 14px;
			&:first-child {
				width: 120px;
			}
		}
	}
	.editScent {
		height: 36px;
		margin: 8px auto 0;
		padding: 0 16px;
		border-radius: 4px;
	}
	.select {
		height: 36px;
	}
	.scents {
		margin: 48px auto 16px;
	}
</style>
