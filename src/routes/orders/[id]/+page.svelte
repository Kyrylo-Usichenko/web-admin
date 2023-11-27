<script lang="ts">
	import Loader from '$lib/shared/loader/Loader.svelte';
	import { onMount } from 'svelte';
	import JSONTree from 'svelte-json-tree';
	import { aiApi } from '../../../api';

	export let data;

	let order: any = null;
	let loading = true;

	const getOrders = async () => {
		loading = true;
		try {
			const res = await aiApi.getOrder(data.id);
			order = res.data.data;
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		getOrders();
	});
</script>

<main class="wrapper">
	{#if loading}
		<div class="loader">
			<Loader />
		</div>
	{:else}
		<div
			style="--json-tree-string-color: #cb3f41;
--json-tree-symbol-color: #cb3f41;
--json-tree-boolean-color: #112aa7;
--json-tree-function-color: #112aa7;
--json-tree-number-color: #3029cf;
--json-tree-label-color: #871d8f;
--json-tree-property-color: #000000;
--json-tree-arrow-color: #727272;
--json-tree-operator-color: #727272;
--json-tree-null-color: #8d8d8d;
--json-tree-undefined-color: #8d8d8d;
--json-tree-date-color: #8d8d8d;
--json-tree-internal-color: grey;
--json-tree-regex-color: #cb3f41;
/* position */
--json-tree-li-indentation: 1em;
--json-tree-li-line-height: 1.3;
/* font */
--json-tree-font-size: 16px;
--json-tree-font-family: 'Courier New', Courier, monospace;"
		>
			<JSONTree defaultExpandedLevel={1} value={order} />
		</div>
	{/if}
</main>

<style>
	.table {
		table-layout: fixed;
		border-spacing: 0;
		border-collapse: collapse;
		text-overflow: ellipsis;

		& td {
			min-width: 103px;
			max-width: 163px;
			height: 32px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			padding: 0 8px;
			font-size: 14px;
			border: 1px solid black;

			&:first-child {
				min-width: 83px !important;
				max-width: 120px !important;
			}
		}
	}
</style>
