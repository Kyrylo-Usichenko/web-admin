type Props = {
	params: {
		id: string;
	};
};
export const load = ({ params }: Props) => {
	return {
		id: params.id
	};
};
