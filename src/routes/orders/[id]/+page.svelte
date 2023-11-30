<script lang="ts">
	import { aiApi } from '$api/index.js';
	import Loader from '$lib/shared/loader/Loader.svelte';
	import type { Order } from '$types/customerOrders.js';
	import { formatDate } from '$utils/time.js';
	import { onMount } from 'svelte';
	import JSONTree from 'svelte-json-tree';

	export let data;

	let order: Order | null = null;
	let journey: any = null;
	let loading = true;
	let scents: {
		main: '';
		secScent1: '';
		secScent2: '';
	};
	const getOrders = async () => {
		loading = true;
		try {
			const res = await aiApi.getOrder(data.id);
			order = res.data.data;
			const PreJourney = res.data.data.noteAttributes[2];
			journey = JSON.parse(PreJourney.value);
			scents = {
				main: journey?.scents.mainScent,
				secScent1: journey?.scents.secondary,
				secScent2: journey?.scents.influencersScent
			};
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		getOrders();
	});
	$: console.log(journey);
</script>

<main class="wrapper">
	{#if loading}
		<div class="loader">
			<Loader />
		</div>
	{:else if order !== null}
		<h1 class="title">Order: {order.orderNumber}</h1>
		<div class="tag">{order.orderType}</div>

		<table class="table mainInfo">
			<tr>
				<td>Influencer microsite</td>
				<td>
					{order.noteAttributes[0].value}
				</td>
			</tr>
			<tr>
				<td>Email</td>
				<td>{order.customerEmail}</td>
			</tr>
			<tr>
				<td>Price</td>
				<td>{order.subtotalPrice} {order.currency}</td>
			</tr>
			<tr>
				<td> Financial status </td>
				<td>{order.financialStatus}</td>
			</tr>
			<tr>
				<td> Order status URL </td>
				<td>
					<a href={order.orderStatusUrl} target="_blank"> Link </a>
				</td>
			</tr>
			<tr>
				<td> Processed at </td>
				<td>
					{formatDate(order.processedAt)}
				</td>
			</tr>
			<tr>
				<td> Created at </td>
				<td>
					{formatDate(order.createdAt)}
				</td>
			</tr>
			<tr>
				<td>Status</td>
				<td>
					{order.confirmed ? 'Confirmed' : 'Not confirmed'}
				</td>
			</tr>
		</table>
		<h2>Journey</h2>

		<table class="table">
			<tr>
				<td>Gender</td>
				<td>
					{journey?.gender}
				</td>
			</tr>
			<tr>
				<td>Time</td>
				<td>{journey?.time}</td>
			</tr>
			<tr>
				<td> Mood </td>
				<td>{journey?.mood}</td>
			</tr>
			<tr>
				<td> Selected fragrance </td>
				<td>
					<table>
						<tr>
							<td>Id</td>
							<td>{journey?.selectedFragrance?.id}</td>
						</tr>
						<tr>
							<td>Name</td>
							<td>{journey?.selectedFragrance?.name}</td>
						</tr>
						<tr>
							<td>Image</td>
							<td>
								<a href={journey?.selectedFragrance?.image} target="_blank">
									{journey?.selectedFragrance?.image}
								</a>
							</td>
						</tr>
						<tr>
							<td>Gender</td>
							<td>{journey?.selectedFragrance?.gender}</td>
						</tr>
						<tr>
							<td>Family</td>
							<td>{journey?.selectedFragrance?.family}</td>
						</tr>
						<tr>
							<td>Accords</td>
							<td>
								<table>
									{#each journey?.selectedFragrance?.accords as accord}
										<tr>
											<td>{accord.name}</td>
											<td>{accord.weight}</td>
										</tr>
									{/each}
								</table></td
							></tr
						>
					</table>
				</td>
			</tr>
			<tr>
				<td>Ingredients</td>
				<td>
					<table>
						{#each journey?.ingredients as ingredient}
							<tr>
								<td>{ingredient.ingredientName}</td>
								<td>
									<a href={ingredient.ingredientImage} target="_blank">
										{ingredient.ingredientImage}
									</a>
								</td>
							</tr>
						{/each}
					</table>
				</td>
			</tr>
			<tr>
				<td>Label type</td>
				<td>
					{journey?.labelType}
				</td>
			</tr>
			<tr>
				<td>Label Name</td>
				<td>{journey?.labelName}</td>
			</tr>
			<tr>
				<td> Final Label Image </td>
				<td>
					<a href={journey?.finalLabelImage} target="_blank">
						{journey?.finalLabelImage}
					</a>
				</td>
			</tr>
			<tr>
				<td> Email </td>
				<td>{journey?.email}</td>
			</tr>
			<tr>
				<td>Bottle Size</td>
				<td>{journey?.bottleSize}</td>
			</tr>
			<tr>
				<td>Selected mockup</td>
				<td>
					<a href={journey?.selectedMockup} target="_blank">
						{journey?.selectedMockup}
					</a>
				</td>
			</tr>
			<tr>
				<td> Scents </td>
				<td>
					<table>
						<tr>
							<td>Main</td>
							<td>{scents.main}</td>
						</tr>
						<tr>
							<td>Secondary1</td>
							<td>{scents.secScent1}</td>
						</tr>
						<tr>
							<td>Secondary2</td>
							<td>{scents.secScent2}</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<!-- <div class="editWrapper">
			<Button onClick={toggleModal} text="Edit scent" />
		</div>

		{#if allScents}
			<EditModal
				{allScents}
				{toggleModal}
				scents={{
					main: scents.main,
					secondary1: scents.secScent1,
					secondary2: scents.secScent2
				}}
				onSave={saveScents}
				isLoading={isSaving}
				isOpened={isModalOpened}
			/>
		{/if} -->
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
	.title {
		margin: 10px 0 0;
	}

	.tag {
		margin: 5px 0 0;
		width: fit-content;
		padding: 5px 10px;
		background: #333;
		border-radius: 2px;
		color: #fff;
	}
	.mainInfo {
		margin: 20px 0 0;
	}
	.table {
		border-collapse: collapse;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;

		& a {
			color: rgb(1, 8, 155);
		}

		& td {
			min-width: 103px;
			border: 1px solid #000;
			padding: 8px;
		}
		& td {
			& table {
				width: 100%;
				border-collapse: collapse;
				margin: -2px;
				width: calc(100% + 4px);
				& td {
					min-width: unset;
				}
			}
		}
	}
</style>
