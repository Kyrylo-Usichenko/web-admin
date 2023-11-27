<script>
	import Container from './../lib/shared/container/Container.svelte';
	import './../styles/index.css';
</script>

<Container>
	<slot />
</Container>

<style global>
	@import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';
</style>
