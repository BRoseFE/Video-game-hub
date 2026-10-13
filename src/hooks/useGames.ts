import type { GameQuery } from "@/App";
import APIClient from "@/components/services/api-client";
import type { Platform } from "@/hooks/usePlatforms";
import { useInfiniteQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Game>("/games");

export interface Game {
	id: number;
	name: string;
	background_image: string;
	parent_platforms: { platform: Platform }[];
	metacritic: number;
	rating_top: number;
}

const useGames = (gameQuery: GameQuery) =>
	useInfiniteQuery({
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
		staleTime: 24 * 60 * 60 * 1000, //24h
	});

export default useGames;
