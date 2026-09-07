import { HStack, Image, List, Text } from "@chakra-ui/react";
import GenreListSkeleton from "./GenreListSkeleton";
import useGenres from "@/hooks/useGenres";
import getCroppedImageUrl from "./services/image-url";

function GenreList() {
	const { data, error, isLoading } = useGenres();
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	return (
		<>
			{error && <Text color="red">{error}</Text>}
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
							<Text fontSize="lg">{genre.name}</Text>
						</HStack>
					</List.Item>
				))}
			</List.Root>
		</>
	);
}

export default GenreList;
