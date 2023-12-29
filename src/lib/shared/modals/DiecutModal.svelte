<script lang="ts">
	import Modal from '$lib/shared/modal/Modal.svelte';
	import Button from '../button/Button.svelte';
	import OpenIcon from '../icons/OpenIcon.svelte';

	export let toggleModal: () => void;
	export let isLoading: boolean;
	export let isOpened: boolean;
	export let onSave: (file: File) => void;

	let dropZoneInput: HTMLInputElement;
	let file: File | null | undefined = null;

	const onInputChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		file = target?.files?.[0];
	};

	const onDrop = (e: DragEvent) => {
		e.preventDefault();
		file = e?.dataTransfer?.files[0];
	};

	const onDragOver = (e: DragEvent) => {
		e.preventDefault();
	};



	const onSaveClick = () => {
		if (!file) return;
		onSave(file);
	};

	const onToggleModal = () => {
		file = null;
		if (dropZoneInput?.value) dropZoneInput.value = '';
		toggleModal();
	};
</script>

<Modal toggleModal={onToggleModal} {isOpened} isClosable={!isLoading}>
	<div class="inner">
		<input type="file" style="display: none;" bind:this={dropZoneInput} on:change={onInputChange} />
		{#if !file}
			<div class="dropzone" on:drop={onDrop} on:click={() => dropZoneInput.click()} on:dragover={onDragOver}>
				<h3>Drop diecut here</h3>
				<p>or</p>
				<button class="browse"> browse </button>
			</div>
		{:else}
			<div class="filled-wrapper">
				<p>Name: {file.name}</p>
				<p>Size: {file.size / 1000 / 1000} MB</p>
				<a href={URL.createObjectURL(file)} target="_blank" class="open_link-wrapper">
					<span class="open_link"> Open in new tab </span>
					<OpenIcon />
				</a>

				<iframe src={URL.createObjectURL(file)} width="100%" height="300px" />
			</div>
		{/if}
		<div class="save">
			<Button text="Save" onClick={onSaveClick} {isLoading} />
		</div>
	</div>
</Modal>

<style>
	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.dropzone {
		padding: 30px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border: 1px dashed #000;
		border-radius: 10px;
		cursor: pointer;
	}
	.browse {
		padding: 0 20px;
		background: #fff;
		border: none;
		text-decoration: underline;
		cursor: pointer;
	}
	.open_link-wrapper {
		width: 190px;
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
	}
	.open_link {
		display: block;
		background: #fff;
		border: none;
		text-decoration: underline;
	}
	.filled-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
