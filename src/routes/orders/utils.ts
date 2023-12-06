import type { ColumnDef } from '@tanstack/svelte-table';
import type { Route } from './types';

export const columns = [
	{
		name: 'Id',
		hidden: true
	},
	{
		name: 'Order name'
	},
	{
		name: 'name'
	},
	{
		name: 'Email'
	},
	{
		name: 'Financial Status'
	},
	{
		name: 'Total Price'
	},
	{
		name: 'Created At'
	}
];

type Person = {
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
		accessorKey: 'financialStatus',
		header: () => 'Financial Status',
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
		ordersType: ''
	},
	{
		name: 'Customers orders',
		path: '/orders?ordersType=influencerShop',
		ordersType: 'influencerShop'
	},
	{
		name: 'Influencers DIY',
		path: '/orders?ordersType=influencerDiy',
		ordersType: 'influencerDiy'
	},
	{
		name: 'DIY orders',
		path: '/orders?ordersType=normalDiy',
		ordersType: 'normalDiy'
	}
];

