<script lang="ts">
	import type { OrderStatus } from '$types/index';
	import { getTagColor } from './utils';

	export let status: OrderStatus;

	$: statusColor = getTagColor(status);
</script>

<div
	class="tag"
	style={`
      background: ${statusColor};
    `}
>
	{status}
</div>

<style>
	.tag {
		width: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 8px 12px;
		background: #333;
		border-radius: 2px;
		color: #fff;
		text-transform: uppercase;
		line-height: 16px;
	}
</style>
