import APIClient from "@/components/services/api-client";
import type Trailer from "@/entities/Trailer";
import { useQuery } from "@tanstack/react-query";

const useTrailers = (gameId: number) => {
	const apiClient = new APIClient<Trailer>(`/games/${gameId}/movies`);

	return useQuery({
		queryKey: ["trailers", gameId],
		queryFn: apiClient.getAll,
	});
};

export default useTrailers;
