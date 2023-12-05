import { navigate } from '$utils/navigate';
import { redirect } from '@sveltejs/kit';

export function load() {
	const navigator = navigate({
		currentPage: 'home'
	});
	if (navigator.type === 'redirect') throw redirect(307, navigator.to);
}
