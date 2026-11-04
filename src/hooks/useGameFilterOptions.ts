import APIClient from "@/components/services/api-client";
import type GameBrainGame from "@/entities/GameBrainGame";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new APIClient<GameBrainGame>("/games");

const useGameFilterOptions = () =>
	useQuery({
		queryKey: ["game-filter-options"],

		queryFn: async () => {
			const response = await apiClient.getAll({
				params: {
					search: "video games",
					limit: 1,
					"generate-filter-options": true,
				},
			});

			return {
				filterOptions: response.filter_options ?? [],
				sortingOptions: response.sorting_options ?? [],
			};
		},

		staleTime: ms("24h"),
		retry: false,
		refetchOnWindowFocus: false,
	});

export default useGameFilterOptions;
