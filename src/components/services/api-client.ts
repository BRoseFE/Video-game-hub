import axios, { type AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
	count: number;
	results: T[];
}

const axiosInstance = axios.create({
	baseURL: "https://api.rawg.io/api",
	params: {
		key: "6ba99aa5f482414595fd7777f2610094", // This is a free temp key for build testing
		// Will be refreshed with a new key and vercel environment variable created to hide api
		// from github repo and public view.
	},
});

class APIClient<T> {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll = (config: AxiosRequestConfig) => {
		return axiosInstance
			.get<FetchResponse<T>>(this.endpoint, config)
			.then((res) => res.data);
	};
}

export default APIClient;

// This is the code needed for production, replace all above code with this
// My api key stored on vercel will not be accessible
// I will need to refactor this code to work with my class above
// Basically I keep the class as is and refactor the axiosInstance code with the below code
//
//
//code starts here:
//
// import axios from "axios";

// export default axios.create({
// 	baseURL: "/api",
// });
