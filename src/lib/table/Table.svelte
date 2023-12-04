<script lang="ts">
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		type TableOptions
	} from '@tanstack/svelte-table';
	import { writable } from 'svelte/store';
	export let data: any = [];
	export let columns: any = [];
	export let page: number = 1;
	export let offset: number = 0;
	export let total: number = 0;
	export let onPageChange: (page: number) => void = () => {};
	export let onNextClick: () => void = () => {};
	export let onPrevClick: () => void = () => {};
	export let onRowClick: (row: any) => void = () => {};
	type Person = {
		id: number;
		email: string;
		name: string;
	};
	let options = writable<TableOptions<Person>>({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		pageCount: 2,
		autoResetPageIndex: true
	});

	const handlePageChange = (newPage: string) => {
		onPageChange(+newPage);
	};

	export const rerender = () => {
		options.update((options) => ({
			...options,
			data
		}));
	};

	$: data, options.update((options) => ({ ...options, data }));

	export const table = createSvelteTable(options);
</script>

<div class="wrapper">
	<table class="table">
		<thead class="header">
			{#each $table.getHeaderGroups() as headerGroup}
				<tr>
					{#each headerGroup.headers as header}
						<th>
							{#if !header.isPlaceholder}
								<svelte:component
									this={flexRender(header.column.columnDef.header, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</thead>
		<tbody class="body">
			{#each $table.getRowModel().rows as row}
				<tr on:click={() => onRowClick(row)}>
					{#each row.getVisibleCells() as cell}
						<td>
							<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot class="footer">
			{#each $table.getFooterGroups() as footerGroup}
				<tr>
					{#each footerGroup.headers as header}
						<th>
							{#if !header.isPlaceholder}
								<svelte:component
									this={flexRender(header.column.columnDef.footer, header.getContext())}
								/>
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
		</tfoot>
	</table>
</div>
<!-- <button on:click={() => rerender()} class="border p-2"> Rerender </button> -->
<div class="pagination_wrapper">
	<div>Showing <b>{offset + 1} </b>to <b>{offset + 50}</b> of <b>{total}</b> results</div>
	<div>
		<button disabled={page === 1} on:click={onPrevClick} class="prev"> prev </button>
		<select on:change={(e) => handlePageChange(e.target?.value)} bind:value={page}>
			{#each Array.from({ length: Math.ceil(total / 50) }, (_, i) => i + 1) as page1}
				<option value={page1}>{page1}</option>
			{/each}
		</select>
		<button disabled={page === Math.ceil(total / 50)} on:click={onNextClick} class="prev">
			next
		</button>
	</div>
</div>

<style>
	.wrapper {
		height: 500px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		border-color: #e5e7eb;
		border-radius: 8px 8px 0 0;
		border-top-width: 1px;
		box-shadow:
			0 1px 3px 0 rgba(0, 0, 0, 0.1),
			0 1px 2px 0 rgba(0, 0, 0, 0.26);
		display: block;
		overflow: auto;
		position: relative;
		width: 100%;
		z-index: 1;
	}
	.table {
		border-collapse: collapse;
		display: table;
		margin: 0;
		max-width: 100%;
		overflow: auto;
		padding: 0;
		table-layout: fixed;
		text-align: left;
		width: 100%;
		text-indent: initial;
		border-spacing: 2px;
		border-color: gray;
	}
	.header {
		width: 100%;
		left: 0;
		top: 0;
		position: sticky;
		background-color: #f9fafb;
		& th {
			border: 1px solid #e5e7eb;
			border-top: none;
			box-sizing: border-box;
			color: #6b7280;
			outline: none;
			padding: 14px 24px;
			position: relative;
			-webkit-user-select: none;
			-moz-user-select: none;
			user-select: none;
			vertical-align: middle;
			white-space: nowrap;
		}
	}
	.body {
		background-color: #fff;
		box-sizing: border-box;
		& td {
			border: 1px solid #e5e7eb;
			box-sizing: content-box;
			padding: 12px 24px;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		& tr {
			&:hover {
				background-color: #f0f0f0;
				cursor: pointer;
			}
		}
	}
	.pagination_wrapper {
		position: relative;
		display: flex;
		justify-content: space-between;
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
