import ExpandableText from "@/components/ExpandableText";
import { GameAttributes } from "@/components/GameAttributes";
import GameScreenshots from "@/components/GameScreenshots";
import GameTrailer from "@/components/GameTrailer";
import useGame from "@/hooks/useGame";
import { Heading, Grid, Spinner, GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function GameDetailPage() {
	const { slug } = useParams();
	const { data: game, isLoading, error } = useGame(slug!);

	if (isLoading) return <Spinner />;

	if (error || !game) throw error;

	return (
		<Grid templateColumns={{ base: "1", md: "repeat(2, 1fr)" }} gap={5}>
			<GridItem>
				<Heading>{game.name}</Heading>
				<ExpandableText>{game.description_raw}</ExpandableText>
				<GameAttributes game={game} />
			</GridItem>
			<GridItem>
				<GameTrailer gameId={game.id} />
				<GameScreenshots gameId={game.id} />
			</GridItem>
		</Grid>
	);
}

export default GameDetailPage;
