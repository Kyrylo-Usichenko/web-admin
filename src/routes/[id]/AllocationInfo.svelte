<script lang="ts">
	import type { Gender, Mood, Time } from '../../types';

	type Props = {
		gender?: Gender;
		time?: Time;
		mood?: Mood;
	};
	export let data: Props;
</script>

<div>
	<h3>Allocation Info</h3>
	<table class="table">
		<tr>
			<td>Gender</td>
			<td>{data.gender}</td>
		</tr>
		<tr>
			<td>Time</td>
			<td>{data.time}</td>
		</tr>
		<tr>
			<td>Mood</td>
			<td>{data.mood}</td>
		</tr>
	</table>
</div>

<style>
	.table {
		table-layout: fixed;
		border-spacing: 0;
		border-collapse: collapse;
		text-overflow: ellipsis;

		& td {
			padding: 5px 10px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			font-size: 14px;
			border: 1px solid black;
		}
	}
</style>
