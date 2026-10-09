import type { GameQuery } from "@/App";
import APIClient from "@/components/services/api-client";
import type { Platform } from "@/hooks/usePlatforms";
import { useQuery } from "@tanstack/react-query";

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
	useQuery({
		queryKey: ["games", gameQuery],
		queryFn: () =>
			apiClient.getAll({
				params: {
					genres: gameQuery.genre?.id,
					parent_platforms: gameQuery.platform?.id,
					ordering: gameQuery.sortOrder,
					search: gameQuery.searchText,
				},
			}),
	});

export default useGames;
