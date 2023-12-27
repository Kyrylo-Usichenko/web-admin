import type { OrderStatus } from '$types/index';
import type { ColumnDef } from '@tanstack/svelte-table';
import type { Route } from './types';

export type Person = {
	orderName: number;
	email: string;
	name: string;
};

export const defaultColumns: ColumnDef<Person>[] = [
	{
		accessorKey: 'orderName',
		header: () => 'Order Name',
		cell: (info) => info.getValue()
	},
	{
		accessorKey: 'orderStatus',
		header: () => 'Status',
		cell: (info) => info.getValue()
	},
	{
		accessorKey: 'name',
		header: () => 'Name',
		cell: (info) => info.getValue()
	},
	{
		accessorKey: 'email',
		header: () => 'Email',
		cell: (info) => info.getValue()
	},
	{
		accessorKey: 'totalPrice',
		header: () => 'Price',
		cell: (info) => info.getValue()
	},
	{
		accessorKey: 'createdAt',
		header: () => 'Created At',
		cell: (info) => info.getValue()
	}
];

export const routes: Route[] = [
	{
		name: 'All orders',
		path: '/orders',
		ordersType: 'All orders'
	},
	{
		name: 'Follower order',
		path: '/orders?ordersType=influencerShop',
		ordersType: 'influencerShop'
	},
	{
		name: 'Follower DIY',
		path: '/orders?ordersType=influencerDiy',
		ordersType: 'influencerDiy'
	},
	{
		name: 'DIY orders',
		path: '/orders?ordersType=normalDiy',
		ordersType: 'normalDiy'
	}
];

export type Status = 'All statuses' | OrderStatus;
export const statuses: Status[] = [
	'All statuses',
	'Processed',
	'On hold',
	'Ready to ship',
	'Fulfilled'
];
