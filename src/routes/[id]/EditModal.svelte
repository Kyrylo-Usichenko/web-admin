<script lang="ts">
	import Modal from '$lib/shared/modal/Modal.svelte';
	import type { Fragrances } from '../../types';

	export let allScents: Fragrances;
	export let toggleModal: () => void;
	export let scents: {
		main: string;
		secondary1: string;
		secondary2: string;
	};

	let scent1 = scents.main;
	let scent2 = scents.secondary1;
	let scent3 = scents.secondary2;
</script>

<Modal {toggleModal}>
	<div>
		<p>New You</p>
		<select bind:value={scent1} class="select">
			{#each allScents as scent}
				<option selected={scents.main.includes(scent.name)}>({scent.code}) {scent.name}</option>
			{/each}
		</select>
		<p>Scent 2</p>
		<select bind:value={scent2} class="select">
			{#each allScents as scent}
				<option selected={scents.secondary1.includes(scent.name)}
					>({scent.code}) {scent.name}</option
				>
			{/each}
		</select>
		<p>Scent 3</p>
		<select bind:value={scent3} class="select" id="3">
			{#each allScents as scent}
				<option selected={scents.secondary2.includes(scent.name)}
					>({scent.code}) {scent.name}</option
				>
			{/each}
		</select>
	</div>

	<button
		on:click={() => {
			toggleModal;
		}}
		class="save">Save</button
	>
</Modal>

<style>
	.save {
		margin: 20px auto 0;
		display: flex;
		justify-content: space-between;
	}
</style>
