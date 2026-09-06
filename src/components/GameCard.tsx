import type { Game } from "@/hooks/useGames";
import { Card, CardBody, Image, Float, HStack } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import MetaCritic from "./MetaCritic";

interface GameCardProps {
	game: Game;
}

function GameCard({ game }: GameCardProps) {
	return (
		<Card.Root borderRadius={10} overflow="hidden">
			<Image src={game.background_image} />
			<CardBody>
				<Card.Title fontSize="2xl">{game.name}</Card.Title>
				<HStack justifyContent="space-between">
					<PlatformIconList
						platforms={game.parent_platforms.map((p) => p.platform)}
					/>
					<MetaCritic criticScore={game.metacritic} />
				</HStack>
			</CardBody>
		</Card.Root>
	);
}

export default GameCard;
