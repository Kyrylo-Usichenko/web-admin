<script lang="ts">
	import Button from '$lib/shared/button/Button.svelte';
	import Modal from '$lib/shared/modal/Modal.svelte';
	import type { SetScentsReqBodyScents } from '../../api/main/types';
	import type { Fragrances } from '../../types';

	export let allScents: Fragrances;
	export let toggleModal: () => void;
	export let isLoading: boolean;
	export let isOpened: boolean;
	export let onSave: (scents: SetScentsReqBodyScents) => void;
	export let scents: {
		main: string;
		secondary1: string;
		secondary2: string;
	};

	let scent1 = scents.main || `(${allScents[0].code}) ${allScents[0].name}`;
	let scent2 = scents.secondary1 || `(${allScents[0].code}) ${allScents[0].name}`;
	let scent3 = scents.secondary2 || `(${allScents[0].code}) ${allScents[0].name}`;

	const onSaveClick = () => {
		onSave({
			main: scent1,
			secScent1: scent2,
			secScent2: scent3
		});
	};
</script>

<Modal {toggleModal} {isOpened} isClosable={!isLoading}>
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
</style>
