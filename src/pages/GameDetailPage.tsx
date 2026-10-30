import useGame from "@/hooks/useGame";
import { Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function GameDetailPage() {
	const { slug } = useParams();
	const { data: game, isLoading, error } = useGame(slug!);

	if (isLoading) return <Spinner />;

	if (error || !game) throw error;

	return (
		<>
			<Heading>{game.name}</Heading>
			<Text>{game.description_raw}</Text>
		</>
	);
}

export default GameDetailPage;

// use the description_raw property instead of description.
// description_raw gives plain text
