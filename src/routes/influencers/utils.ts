import type { ColumnDef } from '@tanstack/svelte-table';

export const columns = [
	{
		name: 'Id'
	},
	{
		name: 'Email'
	},
	{
		name: 'Name'
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
		accessorKey: 'email',
		header: () => 'Email',
		cell: (info) => info.getValue()
	},
	{
		accessorKey: 'name',
		header: () => 'Name',
		cell: (info) => info.getValue()
	}
];
