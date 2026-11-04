import APIClient from "@/components/services/api-client";
import { normalizeGame } from "@/components/services/gamebrain-mapper";
import type GameBrainGame from "@/entities/GameBrainGame";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new APIClient<GameBrainGame>("/games");

const useGame = (id: string) =>
	useQuery({
		queryKey: ["games", id],

		queryFn: async () => {
			const game = await apiClient.get(id);

			return normalizeGame(game);
		},

		staleTime: ms("24h"),
	});

export default useGame;
