<script lang="ts">
	import Arrow from './Arrow.svelte';

	export let options: string[];
	export let value: string;
	export let onChange: (option: string) => void;
	let isDropdownOpen = false;
	const onSelectClick = () => {
		isDropdownOpen = !isDropdownOpen;
	};
	const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }: any) => {
		if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
		isDropdownOpen = false;
	};

	const onOptionClick = (option: string) => {
		onChange(option);
		isDropdownOpen = false;
	};
</script>

<div class="wrapper" on:focusout={handleDropdownFocusLoss}>
	<button on:click={onSelectClick} class="select">
		{value}
		<div class={`arrow_wrapper ${isDropdownOpen ? 'rotate' : ''}`}>
			<Arrow />
		</div>
	</button>
	<div class="dropdown_wrapper">
		<div class={`dropdown ${isDropdownOpen ? '' : 'hidden'}`}>
			{#each options as option}
				<button on:click={() => onOptionClick(option)} class="option">{option}</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
	}
	.rotate {
		transform: rotate(180deg);
	}
	.arrow_wrapper {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dropdown_wrapper {
		position: relative;
		z-index: 2;
	}
	.select {
		width: 210px;
		padding: 0 0 0 16px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: #fff;
		border: 1px solid #d2d6dc;
		border-radius: 5px;
		font-size: 14px;
		line-height: 1.45;
		outline: none;
	}
	.dropdown {
		position: absolute;
		padding: 10px 0;
		left: 0;
		top: 0;
		background: 220 17% 17%;
		margin: 10px 0;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: #fff;
		border: 1px solid #d2d6dc;
		border-radius: 5px;
		font-size: 14px;
		line-height: 1.45;
		outline: none;
	}
	.option {
		width: 100%;
		padding: 4px 12px;
		text-align: left;
		cursor: pointer;
		display: block;
		border: none;
		background-color: transparent;
		&:hover {
			background-color: #f5f5f5;
		}
	}
	.hidden {
		display: none;
	}
</style>
