<script lang="ts">
	export let toggleModal: () => void;
	export let isOpened: boolean;
	export let isClosable: boolean;

	const handleModal = () => {
		if (!isClosable) return;
		toggleModal();
	};

	const closeModal = (e: KeyboardEvent) => {
		if (!isClosable) return;
		if (e.key === 'Escape') {
			toggleModal();
		}
	};
</script>

<div class={isOpened ? 'wrapper' : 'hidden'}>
	<div class="inner">
		<slot />
	</div>
	<div on:click={handleModal} class="grey" on:keydown={closeModal} role="button" tabindex="0" />
</div>

<style>
	.wrapper {
		position: fixed;
		height: 100%;
		width: 100%;
		left: 0;
		top: 0;
	}
	.grey {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgb(102, 102, 102, 0.5);
		z-index: 1;
	}
	.inner {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
		padding: 30px;
		background: white;
		border-radius: 10px;
	}

	.hidden {
		visibility: hidden;
	}
</style>
