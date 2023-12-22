<script lang="ts">
	import type { SetScentsReqBodyScents } from '$api/main/types';
	import Button from '$lib/shared/button/Button.svelte';
	import Modal from '$lib/shared/modal/Modal.svelte';
	import type { AvailableScents, Scents } from '$types/index';
	import { findScent } from './utils';

	export let availableScents: AvailableScents;
	export let toggleModal: () => void;
	export let isLoading: boolean;
	export let isOpened: boolean;
	export let onSave: (scents: SetScentsReqBodyScents) => void;
	export let scents: Scents;

	let scent1 = findScent(scents.main, availableScents.main);
	let scent2 = findScent(scents.secondary1, availableScents.secondary1);
	let scent3 = findScent(scents.secondary2, availableScents.secondary2);

	const onSaveClick = () => {
		onSave({
			main: scent1.scentCode,
			secScent1: scent2.scentCode,
			secScent2: scent3.scentCode
		});
	};
</script>

<Modal {toggleModal} {isOpened} isClosable={!isLoading}>
	<div class="inner">
		<select bind:value={scent1} class="select">
			{#each availableScents.main as scent}
				<option value={scent}>
					({scent.scentCode}) {scent.name} [{scent.count}]
				</option>{/each}
		</select>
		<select bind:value={scent2} class="select">
			{#each availableScents.secondary1 as scent}
				<option value={scent}>
					({scent.scentCode}) {scent.name} [{scent.count}]
				</option>{/each}
		</select>
		<select bind:value={scent3} class="select">
			{#each availableScents.secondary2 as scent}
				<option value={scent}>
					({scent.scentCode}) {scent.name} [{scent.count}]
				</option>
			{/each}
		</select>

		<div class="save">
			<Button onClick={onSaveClick} text="Save" {isLoading} />
		</div>
	</div>
</Modal>

<style>
	.inner {
		display: flex;
		flex-direction: column;
		& select {
			border: 1px solid #000;
		}
	}
	.save {
		margin: 20px auto 0;
		display: flex;
		justify-content: center;
	}
	.select {
		margin: 10px 0;
	}
</style>
