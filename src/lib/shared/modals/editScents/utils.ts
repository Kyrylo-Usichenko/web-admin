type Scents = {
	count?: number;
	name: string;
	scentCode: string;
}[];

export const findScent = (scentCode: string, scents: Scents) => {
	return scents.find((scent) => scent.scentCode === scentCode) || scents[0];
};
