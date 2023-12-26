import Toastify from 'toastify-js';

export const callAlert = (message: string) => {
	Toastify({
		text: message,
		duration: 3000,
		close: true,
		gravity: 'top',
		position: 'center',
		stopOnFocus: true
	}).showToast();
};
