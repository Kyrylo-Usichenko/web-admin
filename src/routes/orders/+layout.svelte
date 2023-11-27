<script>
	import Button from '$lib/shared/button/Button.svelte';
	import { routes } from '../utils';
</script>

<div>
	<nav class="nav">
		{#each routes as route}
			<a href={route.path}>
				<Button text={route.name} />
			</a>
		{/each}
	</nav>
	<slot />
</div>

<style>
	.nav {
		display: flex;
		justify-content: center;
		gap: 10px;
		padding: 20px 0;
	}
</style>
