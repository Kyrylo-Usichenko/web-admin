import type { Scent } from './types';

export const findScent = (scentCode: string, scents: Scent[]) => {
	return scents.find((scent) => scent.code === scentCode) || scents[0];
};
