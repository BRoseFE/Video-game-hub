import useGame from "@/hooks/useGame";

interface Props {
	gameId: number;
}

function GameTrailer({ gameId }: Props) {
	const { data: game, error, isLoading } = useGame(String(gameId));

	if (isLoading) return null;

	if (error) throw error;

	const first = game?.trailer[0];

	return first ? (
		<video src={first.data[480]} poster={first.preview} controls />
	) : null;
}

export default GameTrailer;
