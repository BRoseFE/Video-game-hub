import axios, { type AxiosRequestConfig } from "axios";
import type {
	GameBrainActiveFilter,
	GameBrainFilterOption,
	GameBrainSorting,
	GameBrainSortingOption,
} from "@/entities/GameBrainFilters";

export interface FetchResponse<T> {
	count: number;
	next: string | null;
	results: T[];
	filter_options?: GameBrainFilterOption[];
	active_filter_options?: GameBrainActiveFilter[];
	sorting_options?: GameBrainSortingOption[];
	sorting?: GameBrainSorting;
}

interface GameBrainResponse<T> {
	query?: string;
	total_results: number;
	limit: number;
	offset: number;
	results: T[];
	filter_options?: GameBrainFilterOption[];
	active_filter_options?: GameBrainActiveFilter[];
	sorting_options?: GameBrainSortingOption[];
	sorting?: GameBrainSorting;
}

const axiosInstance = axios.create({
	baseURL: "/api/gamebrain",
});

class APIClient<T> {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	getAll = async (config?: AxiosRequestConfig): Promise<FetchResponse<T>> => {
		const response = await axiosInstance.get<GameBrainResponse<T>>(
			this.endpoint,
			config,
		);

		const data = response.data;

		const hasNextPage = data.offset + data.limit < data.total_results;

		// // Normalize GameBrain pagination into the application's FetchResponse format
		return {
			count: data.total_results,
			next: hasNextPage ? String(data.offset + data.limit) : null,
			results: data.results,
			filter_options: data.filter_options,
			active_filter_options: data.active_filter_options,
			sorting_options: data.sorting_options,
			sorting: data.sorting,
		} satisfies FetchResponse<T>;
	};

	get = (id: string) => {
		return axiosInstance
			.get<T>(`${this.endpoint}/${encodeURIComponent(id)}`)
			.then((res) => res.data);
	};
}

export default APIClient;
