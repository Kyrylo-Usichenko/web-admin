<script>
	import Grid from 'gridjs-svelte';

	const data = [
		{ name: 'John', email: 'john@example.com' },
		{ name: 'Mark', email: 'mark@gmail.com' }
	];
</script>

<Grid {data} />

<style global>
	@import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';
</style>
