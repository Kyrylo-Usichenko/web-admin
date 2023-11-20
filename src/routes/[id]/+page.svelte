<script lang="ts">
	import Loader from '$lib/shared/loader/Loader.svelte';
	import { onMount } from 'svelte';
	import type { Fragrances } from '../../types';
	import EditModal from './EditModal.svelte';
	import type { Scents } from './types.js';
	import { fetchFragrances, fetchOrder } from './utils.js';

	export let data;

	let allScents: Fragrances | null = null;
	let loading = true;
	let isModalOpened: boolean = false;
	let orderName = '';
	let scents: Scents = {
		main: '',
		secondary1: '',
		secondary2: ''
	};

	const toggleModal = () => {
		isModalOpened = !isModalOpened;
	};

	onMount(async () => {
		loading = true;
		try {
			const [orderRes, fragrancesRes] = await Promise.all([fetchOrder(data), fetchFragrances()]);
			scents = {
				main:
					orderRes.note_attributes.find((attribute) => attribute.value === 'New You')?.name || '',
				secondary1:
					orderRes.note_attributes.find((attribute) => attribute.value === 'Scent 2')?.name || '',
				secondary2:
					orderRes.note_attributes.find((attribute) => attribute.value === 'Scent 3')?.name || ''
			};
			orderName = orderRes.name;
			allScents = fragrancesRes;
		} catch (e) {
			console.log(e);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="loader">
		<Loader />
	</div>
{:else}
	<main class="wrapper">
		<a href="/"> <button>Go back</button></a>

		<h2>Order: {orderName} {data.id}</h2>

		<p class="scents">SCENTS</p>
		<table class="table">
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

		<button on:click={toggleModal} class="editScent">Edit scents</button>

		{#if isModalOpened && allScents}
			<EditModal {allScents} {toggleModal} {scents} />
		{/if}
	</main>
{/if}

<style>
	.table {
		border-spacing: 0;
		border-collapse: collapse;
		text-overflow: ellipsis;

		& td {
			max-width: 200px;
			height: 32px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			padding: 0 8px;
			font-size: 14px;
			border: 1px solid black;

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
