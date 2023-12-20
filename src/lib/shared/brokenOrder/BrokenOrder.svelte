<script lang="ts">
	import Alert from '$lib/shared/alert/Alert.svelte';
	import JSONTree from 'svelte-json-tree';
	export let order: any = null;
</script>

<Alert>
	<p>Looks like we cannot process this order.</p>
	<p>This order is old or was created not by our scentcraft api</p>
	<p>You can see order just with JSON format below</p>
</Alert>
<div
	style="
				--json-tree-string-color: #cb3f41;
				--json-tree-symbol-color: #cb3f41;--json-tree-boolean-color: #112aa7;--json-tree-function-color: #112aa7;--json-tree-number-color: #3029cf;--json-tree-label-color: #871d8f;--json-tree-property-color: #000000;--json-tree-arrow-color: #727272;--json-tree-operator-color: #727272;--json-tree-null-color: #8d8d8d;--json-tree-undefined-color: #8d8d8d;--json-tree-date-color: #8d8d8d;--json-tree-internal-color: grey;--json-tree-regex-color: #cb3f41;/* position */--json-tree-li-indentation: 1em;--json-tree-li-line-height: 1.3;/* font */--json-tree-font-size: 16px;
				--json-tree-font-family: 'Courier New', Courier, monospace;"
>
	<JSONTree defaultExpandedLevel={1} value={order} />
</div>
