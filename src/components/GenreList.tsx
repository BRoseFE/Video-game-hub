import useGenres from "@/hooks/useGenres";
import { Text } from "@chakra-ui/react";
import GenreListSkeleton from "./GenreListSkeleton";

function GenreList() {
	const { genres, error, isLoading } = useGenres();
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	return (
		<>
			{error && <Text color="red">{error}</Text>}
			<ul>
				{isLoading &&
					skeletons.map((skeleton) => (
						<GenreListSkeleton key={skeleton} />
					))}
				{genres.map((genre) => (
					<li key={genre.id}>{genre.name}</li>
				))}
			</ul>
		</>
	);
}

export default GenreList;
