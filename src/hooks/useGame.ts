import APIClient from "@/components/services/api-client";
import { useQuery } from "@tanstack/react-query";
import type { Game } from "../entities/Game";

const apiClient = new APIClient<Game>("/games"); // Avoid relying on an interface in another hook (change at later date)

const useGame = (slug: string) =>
	useQuery({
		queryKey: ["games", slug],
		queryFn: () => apiClient.get(slug),
	});

export default useGame;
