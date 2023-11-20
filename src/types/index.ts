type Customer = {
	id: number;
	email: string;
};

export type Order = {
	_id: string;
	id: number;
	name: string;
	orderVersion: string;
	total_price: string;
	created_at: string;
	customer: Customer;
	financial_status: string;
};

export type OrderDetails = {
	note_attributes: NoteAttributes;
	name: string;
};
export type NoteAttribute = {
	name: string;
	value: string;
};

export type NoteAttributes = NoteAttribute[];

export type Orders = Order[];
