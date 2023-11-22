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

export type Fragrance = {
	code: string;
	name: string;
};

export type JourneyData = {
	gender?: Gender;
	time?: Time;
	mode?: Mood;
	fragrance: Fragrance;
};

export type Gender = 'feminine' | 'masculine' | 'unisex';
export type Time = 'day' | 'night';
export type Mood = 'sexy' | 'elegant' | 'fresh';

export type Orders = Order[];
export type Fragrances = Fragrance[];
export type NoteAttributes = NoteAttribute[];
