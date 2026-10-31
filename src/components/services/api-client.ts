import axios, { type AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
	count: number;
	next: string | null;
	results: T[];
}

const axiosInstance = axios.create({
	baseURL: "/api/rawg",
});

class APIClient<T> {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll = (config?: AxiosRequestConfig) => {
		return axiosInstance
			.get<FetchResponse<T>>(this.endpoint, config)
			.then((res) => res.data);
	};

	get = (id: string) => {
		return axiosInstance
			.get<T>(`${this.endpoint}/${encodeURIComponent(id)}`)
			.then((res) => res.data);
	};
}

export default APIClient;
