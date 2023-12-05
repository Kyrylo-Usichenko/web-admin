export type PaginationProps = {
	page: number;
	offset: number;
	total: number;
	limit: number;
	onPageChange: (page: number) => void;
	onNextClick: () => void;
	onPrevClick: () => void;
};
