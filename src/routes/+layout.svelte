<script>
	import { page } from '$app/stores';
	import Container from './../lib/shared/container/Container.svelte';
	import './../styles/index.css';
</script>

<Container>
	<div>
		<h1 class="title">Scentcraft WebAdmin</h1>
		<nav class="nav">
			<a
				href="/orders?ordersType=influencerShop"
				class:active={$page.url.pathname.includes('/orders')}
			>
				Orders
			</a>
			<a href="/influencers" class:active={$page.url.pathname.includes('/influencers')}>
				Influencers
			</a>
		</nav>
		<slot />
	</div>
</Container>

<style>
	.title {
		margin: 20px 0 0;
		text-align: center;
	}
	.nav {
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: center;
		gap: 10px;
		padding: 20px 0;
	}
	.active {
		border-bottom: 2px solid #000;
	}
</style>
