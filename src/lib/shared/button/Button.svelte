<script lang="ts">
	import Loader from './components/Loader.svelte';

	export let text: string | null = null;
	export let isLoading: boolean | undefined = false;
	export let onClick: (() => void) | null = null;
	export let disabled: boolean | undefined = false;
</script>

<button on:click={onClick} class="button" {...$$restProps} disabled={isLoading || disabled}>
	{#if isLoading}
		<Loader />
	{/if}
	<span class={isLoading ? 'hidden' : ''}>
		{text ? text : ''}
		<slot />
	</span>
</button>

<style>
	.button {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 36px;
		padding: 0 16px;
		background: var(--main-bg-color);
		border-radius: 4px;
		border: none;
		color: #fffbf5;
		cursor: pointer;
		&:disabled {
			cursor: not-allowed;
			background: var(--main-bg-color-disabled);
		}
	}
	.hidden {
		visibility: hidden;
	}
</style>
