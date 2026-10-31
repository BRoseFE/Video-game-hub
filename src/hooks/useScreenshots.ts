import APIClient from "@/components/services/api-client";
import type Screenshot from "@/entities/Screenshot";
import { useQuery } from "@tanstack/react-query";

const useScreenshots = (gameId: number) => {
	const apiClient = new APIClient<Screenshot>(`/games/${gameId}/screenshots`);

	return useQuery({
		queryKey: ["screenshots", gameId],
		queryFn: apiClient.getAll,
	});
};

export default useScreenshots;
