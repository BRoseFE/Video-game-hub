import useGame from "@/hooks/useGame";
import { Image, SimpleGrid } from "@chakra-ui/react";

interface Props {
	gameId: number;
}

function GameScreenshots({ gameId }: Props) {
	const { data: game, error, isLoading } = useGame(String(gameId));

	if (isLoading) return null;

	if (error) throw error;

	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
			{game?.screenshot.map((file) => (
				<Image key={file.id} src={file.image} />
			))}
		</SimpleGrid>
	);
}

export default GameScreenshots;
