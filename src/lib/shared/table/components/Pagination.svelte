<script lang="ts">
	import type { PaginationProps } from '../types';

	export let pagination: PaginationProps;

	$: prevDisabled = pagination.page === 1;
	$: nextDisabled = pagination.page === Math.ceil(pagination.total / pagination.limit);
	$: allResults =
		pagination.offset + pagination.limit > pagination.total
			? pagination.total
			: pagination.offset + pagination.limit;
	$: pages = Array.from(
		{ length: Math.ceil(pagination.total / pagination.limit) },
		(_, i) => i + 1
	);

	const handlePageChange = (e: any) => {
		const newPage = e.target?.value;
		pagination.onPageChange(+newPage);
	};
</script>

<div class="pagination_wrapper">
	<p class="pagination_data">
		{#if pagination.total === 0}
			No results found
		{:else}
			Showing <b>{pagination.offset + 1} </b>
			to
			<b>
				{allResults}
			</b>
			of
			<b>{pagination.total}</b>
			results
		{/if}
	</p>
	<div>
		{#if pagination.total !== 0}
			<button disabled={prevDisabled} on:click={pagination.onPrevClick} class="prev"> Prev </button>
			<select on:change={handlePageChange} bind:value={pagination.page}>
				{#each pages as page1}
					<option value={page1}>{page1}</option>
				{/each}
			</select>
			<button disabled={nextDisabled} on:click={pagination.onNextClick} class="prev"> Next </button>
		{/if}
	</div>
</div>

<style>
	.pagination_wrapper {
		min-height: 31px;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 24px;
		color: #3d4044;
		background-color: #fff;
		border-bottom-width: 1px;
		border-color: #e5e7eb;
		border-radius: 0 0 8px 8px;
		border-top: 1px solid #e5e7eb;
		box-shadow:
			0 1px 3px 0 rgba(0, 0, 0, 0.1),
			0 1px 2px 0 rgba(0, 0, 0, 0.26);
		z-index: 5;
	}

	.pagination_data {
		line-height: 16px;
	}

	.prev {
		color: black;
		border: 1px solid #d2d6dc;
		outline: none;
		padding: 5px 14px;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		background-color: #fff;
		border-radius: 6px;
		&:disabled {
			color: #6b7280;
		}
	}
</style>
