<script lang="ts">
	import { aiApi } from '$api/index';
	import Button from '$lib/shared/button/Button.svelte';
	import { callAlert } from '$utils/alert';
	import Papa from 'papaparse';
	import { getOrders } from './utils';

	let files: any = [];
	let isLoading = false;
	let text = '';
	let ordersToShow: string[] = [];
	const generetaCsv = async () => {
		try {
			const orders = getOrders(text);
			isLoading = true;
			ordersToShow = orders;
			const res = await aiApi.getFollowerDiyJSON(orders.map((order) => order.toUpperCase()));
			const newJsons = res.data;
			const newCsv = newJsons.map((data, i) => {
				return {
					name: orders[i],
					data: Papa.unparse({
						fields: [
							'order name',
							'order id',
							'order size',
							'customer email',
							'influencer email',
							'customer initials',
							'labelid',
							'perfume name',
							'Main bottle qr',
							'Customer 5ml qr',
							'Influencer 5ml qr',
							'Main bottle code',
							'Customer 5ml code',
							'Influencer 5ml code'
						],
						data: [Object.values(data)]
					})
				};
			});
			files = newCsv;
		} catch (err) {
			callAlert(`Something went wrong /n ${err}`);
		} finally {
			isLoading = false;
		}
	};

	$: ordersToShow = getOrders(text);
</script>

<!-- const names = text.split(' ');
	const isValid = names.every((name) => name.startsWith('#c') || name.startsWith('#C'));
	if (isValid) {
		return names;
	}
	return null; -->
<h1>CSV Generator (Just follower DIY)</h1>
<div class="form">
	<input bind:value={text} placeholder="#C5443 #C5445" type="text" />

	<Button onClick={generetaCsv} text="Generate CSV" {isLoading} />
</div>
{#if ordersToShow.length > 0}
	Orders: {ordersToShow?.join(', ')}
{/if}

{#if files.length > 0}
	<h3 class="result">Order's CSVs:</h3>
	<div class="list">
		{#each files as file}
			<a
				download={`${file.name}.csv`}
				href="data:text/csv;charset=utf-8,{encodeURIComponent(file.data)}"
			>
				<Button text={`Download ${file.name}.csv`} />
			</a>
		{/each}
	</div>
{/if}

<style>
	.form {
		display: flex;
		gap: 8px;
	}

	.result {
		margin: 16px 0;
	}
	.list {
		margin: 8px 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
