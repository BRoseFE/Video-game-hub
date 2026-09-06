import useGames from "@/hooks/useGames";
import { Text, SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

function GameGrid() {
	const { error, games, isLoading } = useGames();
	const skeletons = [1, 2, 3, 4, 5, 6];

	return (
		<>
			{error && <Text color="red">{error}</Text>}
			<SimpleGrid
				columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
				gap={10}
				padding={10}
			>
				{isLoading &&
					skeletons.map((skeleton) => (
						<GameCardSkeleton key={skeleton} />
					))}
				{games.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			</SimpleGrid>
		</>
	);
}

export default GameGrid;
