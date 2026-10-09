import type { GameQuery } from "@/App";
import useGames from "@/hooks/useGames";
import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
	gameQuery: GameQuery;
}

function GameGrid({ gameQuery }: Props) {
	const { error, data, isLoading } = useGames(gameQuery);
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	if (error) return <Text color="red">{error.message}</Text>;

	return (
		<SimpleGrid
			columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
			gap={6}
			padding={3}
		>
			{isLoading &&
				skeletons.map((skeleton) => (
					<GameCardContainer key={skeleton}>
						<GameCardSkeleton />
					</GameCardContainer>
				))}
			{data?.results.map((game) => (
				<GameCardContainer key={game.id}>
					<GameCard game={game} />
				</GameCardContainer>
			))}
		</SimpleGrid>
	);
}

export default GameGrid;
