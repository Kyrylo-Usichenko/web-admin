<script lang="ts">
	import Papa from 'papaparse';

	const config = {
		quotes: false, //or array of booleans
		quoteChar: '"',
		escapeChar: '"',
		delimiter: ',',
		header: true,
		newline: '\r\n',
		skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
		columns: null //or array of strings
	};

	const fields = ['Column 1', 'Column 2'];
	const data = [
		['foo', 'bar'],
		['abc', 'def']
	];

	const csv = Papa.unparse({
		fields: fields,
		data: data
	});
</script>

<h1>CSV Generator</h1>
{#if csv}
	<a href="data:text/csv;charset=utf-8,{encodeURIComponent(csv)}" download="data.csv"
		>Download CSV
	</a>
{/if}
