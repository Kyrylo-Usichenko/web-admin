export type AllScents = {
	main: Scent[];
	secondary1: Scent[];
	secondary2: Scent[];
};

export type Scent = {
	name: string;
	quantity: number;
	code: string;
};

export type Scents = {
	main: string;
	secondary1: string;
	secondary2: string;
};
