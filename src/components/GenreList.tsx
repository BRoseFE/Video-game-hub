import { Button, HStack, Image, List } from "@chakra-ui/react";
import GenreListSkeleton from "./GenreListSkeleton";
import useGenres, { type Genre } from "@/hooks/useGenres";
import getCroppedImageUrl from "./services/image-url";

interface Props {
	onSelectGenre: (genre: Genre) => void;
	selectedGenre: Genre | null;
}

function GenreList({ onSelectGenre, selectedGenre }: Props) {
	const { data, error, isLoading } = useGenres();
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	if (error) return null;

	return (
		<>
			<List.Root unstyled={true}>
				{isLoading &&
					skeletons.map((skeleton) => (
						<GenreListSkeleton key={skeleton} />
					))}
				{data.map((genre) => (
					<List.Item key={genre.id} paddingY="5px">
						<HStack>
							<Image
								boxSize="32px"
								borderRadius={8}
								src={getCroppedImageUrl(genre.image_background)}
							/>
							<Button
								variant="ghost"
								fontSize="lg"
								fontWeight={
									genre.id === selectedGenre?.id
										? "Bold"
										: "normal"
								}
								onClick={() => onSelectGenre(genre)}
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
