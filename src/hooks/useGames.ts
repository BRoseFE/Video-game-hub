import APIClient from "@/components/services/api-client";
import { normalizeGame } from "@/components/services/gamebrain-mapper";
import type GameBrainGame from "@/entities/GameBrainGame";
import useGameQueryStore from "@/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new APIClient<GameBrainGame>("/games");

const useGames = () => {
	const gameQuery = useGameQueryStore((s) => s.gameQuery);

	return useInfiniteQuery({
		queryKey: ["games", gameQuery],

		initialPageParam: 1,

		queryFn: async ({ pageParam }) => {
			const response = await apiClient.getAll({
				params: {
					search: gameQuery.searchText,
					page: pageParam,
					page_size: 20,
					"generate-filter-options": true,
					filters: JSON.stringify(gameQuery.activeFilters ?? []),
					sort: gameQuery.sorting?.key ?? undefined,
					sort_order: gameQuery.sorting?.direction?.toLowerCase(),
				},
			});

			return {
				...response,
				results: response.results.map(normalizeGame),
			};
		},

		getNextPageParam: (lastPage, allPages) => {
			return lastPage.next ? allPages.length + 1 : undefined;
		},

		staleTime: ms("24h"),
		throwOnError: true,
	});
};

export default useGames;
