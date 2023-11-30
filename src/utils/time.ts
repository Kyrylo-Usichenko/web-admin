export const formatDate = (date: string) => {
	return new Date(date).toLocaleString();
};

export const relativeDate = (date: string) => {
	const nowDate = new Date();
	const orderDate = new Date(date);
	const diff = nowDate.getTime() - orderDate.getTime();
	const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
	if (diffDays > 30) {
		return formatDate(date);
	}
	return `${diffDays} days ago`;
};
