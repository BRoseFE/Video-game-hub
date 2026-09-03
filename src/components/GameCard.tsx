import { type Game } from "@/hooks/useGames";
import { Card, CardBody, Image } from "@chakra-ui/react";

interface GameCardProps {
	game: Game;
}

function GameCard({ game }: GameCardProps) {
	return (
		<Card.Root borderRadius={10} overflow="hidden">
			<Image src={game.background_image} />
			<CardBody>
				<Card.Title fontSize="2xl">{game.name}</Card.Title>
			</CardBody>
		</Card.Root>
	);
}

export default GameCard;
