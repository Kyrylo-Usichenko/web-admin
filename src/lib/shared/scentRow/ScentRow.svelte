<script lang="ts">
	export let key: string;
	export let scent: {
		code: string;
		oosStatus: boolean;
	};
</script>

<tr class:oos={scent.oosStatus} title={scent.oosStatus ? 'OOS' : ''}>
	<td> {key} </td>
	<td>
		{scent.code || ''}
		{#if scent.oosStatus}
			<span> - OOS</span>
		{/if}
	</td>
</tr>

<style>
	.oos {
		background: #ff0000ba;
		cursor: help;
	}
</style>
