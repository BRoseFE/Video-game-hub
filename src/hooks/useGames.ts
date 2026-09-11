import type { GameQuery } from "@/App";
import type { Platform } from "@/hooks/usePlatforms";
import type { Ordering } from "./useOrdering";
import useData from "./useData";

export interface Game {
	id: number;
	name: string;
	background_image: string;
	parent_platforms: { platform: Platform }[];
	metacritic: number;
	ordering: Ordering;
}

const useGames = (gameQuery: GameQuery) =>
	useData<Game>(
		"/games",
		{
			params: {
				genres: gameQuery.genre?.id,
				parent_platforms: gameQuery.platform?.id,
				ordering: gameQuery.ordering?.name,
			},
		},
		[gameQuery],
	);

export default useGames;
