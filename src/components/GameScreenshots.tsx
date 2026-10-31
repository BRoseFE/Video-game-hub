import useScreenshots from "@/hooks/useScreenshots";
import { Image, SimpleGrid } from "@chakra-ui/react";

interface Props {
	gameId: number;
}

function GameScreenshots({ gameId }: Props) {
	const { data, error, isLoading } = useScreenshots(gameId);

	if (isLoading) return null;

	if (error) throw error;

	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
			{data?.results.map((file) => (
				<Image key={file.id} src={file.image} />
			))}
		</SimpleGrid>
	);
}

export default GameScreenshots;
