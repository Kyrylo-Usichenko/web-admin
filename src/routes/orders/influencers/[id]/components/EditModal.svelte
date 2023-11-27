<script lang="ts">
	import type { SetScentsReqBodyScents } from '$api/main/types';
	import Button from '$lib/shared/button/Button.svelte';
	import Modal from '$lib/shared/modal/Modal.svelte';
	import type { AllScents, Scents } from './types';
	import { findScent } from './utils';

	export let allScents: AllScents;
	export let toggleModal: () => void;
	export let isLoading: boolean;
	export let isOpened: boolean;
	export let onSave: (scents: SetScentsReqBodyScents) => void;
	export let scents: Scents;

	allScents.main.map((scent) => {
		if (scent.code === scents.main) {
		}
		return scent;
	});

	let scent1 = findScent(scents.main, allScents.main);
	let scent2 = findScent(scents.secondary1, allScents.secondary1);
	let scent3 = findScent(scents.secondary2, allScents.secondary2);

	const onSaveClick = () => {
		onSave({
			main: scent1.code,
			secScent1: scent2.code,
			secScent2: scent3.code
		});
	};
</script>

<Modal {toggleModal} {isOpened} isClosable={!isLoading}>
	<p>New You</p>
	<select bind:value={scent1} class="select">
		{#each allScents.main as scent}
			<option value={scent}>
				({scent.code}) {scent.name} [{scent.quantity}]
			</option>{/each}
	</select>
	<select bind:value={scent2} class="select">
		{#each allScents.secondary1 as scent}
			<option value={scent}>
				({scent.code}) {scent.name} [{scent.quantity}]
			</option>{/each}
	</select>
	<select bind:value={scent3} class="select">
		{#each allScents.secondary2 as scent}
			<option value={scent}>
				({scent.code}) {scent.name} [{scent.quantity}]
			</option>
		{/each}
	</select>

	<div class="save">
		<Button onClick={onSaveClick} text="Save" {isLoading} />
	</div>
</Modal>

<style>
	.save {
		margin: 20px auto 0;
		display: flex;
		justify-content: center;
	}
	.select {
		margin: 10px 0;
	}
</style>
