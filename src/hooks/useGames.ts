import APIClient from "@/components/services/api-client";
import useGameQueryStore from "@/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import type { Game } from "../entities/Game";

const apiClient = new APIClient<Game>("/games");

const useGames = () => {
	const gameQuery = useGameQueryStore((s) => s.gameQuery);

	return useInfiniteQuery({
		queryKey: ["games", gameQuery],

		initialPageParam: 1,

		queryFn: ({ pageParam }) =>
			apiClient.getAll({
				params: {
					genres: gameQuery.genreId,
					parent_platforms: gameQuery.platformId,
					ordering: gameQuery.sortOrder,
					search: gameQuery.searchText,
					page: pageParam,
				},
			}),

		getNextPageParam: (lastPage, allPages) => {
			return lastPage.next ? allPages.length + 1 : undefined;
		},
		staleTime: ms("24h"),
	});
};

export default useGames;
