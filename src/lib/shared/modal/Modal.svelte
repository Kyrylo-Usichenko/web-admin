<script lang="ts">
	export let toggleModal: () => void;
	export let isOpened: boolean;
	export let isClosable: boolean;
</script>

<div class={isOpened ? 'wrapper' : 'hidden'}>
	<div class="inner">
		<slot />
	</div>
	<div on:click={isClosable ? toggleModal : () => {}} class="grey" />
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
		width: min-content;
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
