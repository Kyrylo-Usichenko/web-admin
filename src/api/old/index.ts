import HttpClient from '../http/http';

class WebAdmin extends HttpClient {
	private static instanceCached: WebAdmin;

	private constructor() {
		super('https://webadmin.scentcraft.com/api');
	}

	static getInstance = () => {
		if (!WebAdmin.instanceCached) {
			WebAdmin.instanceCached = new WebAdmin();
		}

		return WebAdmin.instanceCached;
	};

	public getFragnanceDetails = (name: string) =>
		this.instance.post('/influencerstoreorders/getFragnanceDetails', {
			name
		});
}

export default WebAdmin;
