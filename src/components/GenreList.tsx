import { Button, Heading, HStack, Image, List } from "@chakra-ui/react";
import GenreListSkeleton from "./GenreListSkeleton";
import useGenres from "@/hooks/useGenres";
import getCroppedImageUrl from "./services/image-url";
import useGameQueryStore from "@/store";

function GenreList() {
	const { data, error, isLoading } = useGenres();
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
	const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

	if (error) return null;

	return (
		<>
			<Heading fontSize="2xl" marginBottom={3}>
				Genres
			</Heading>
			<List.Root unstyled={true}>
				{isLoading &&
					skeletons.map((skeleton) => (
						<GenreListSkeleton key={skeleton} />
					))}
				{data?.results.map((genre) => (
					<List.Item key={genre.id} paddingY="5px">
						<HStack>
							<Image
								boxSize="32px"
								borderRadius={8}
								objectFit="cover"
								src={getCroppedImageUrl(genre.image_background)}
							/>
							<Button
								whiteSpace="normal"
								textAlign="left"
								variant="ghost"
								fontSize="lg"
								fontWeight={
									genre.id === selectedGenreId
										? "Bold"
										: "normal"
								}
								onClick={() => setSelectedGenreId(genre.id)}
							>
								{genre.name}
							</Button>
						</HStack>
					</List.Item>
				))}
			</List.Root>
		</>
	);
}

export default GenreList;
