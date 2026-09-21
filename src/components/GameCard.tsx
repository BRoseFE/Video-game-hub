import type { Game } from "@/hooks/useGames";
import { Card, CardBody, Image, HStack } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import MetaCritic from "./MetaCritic";
import getCroppedImageUrl from "./services/image-url";
import Emoji from "./Emoji";

interface GameCardProps {
	game: Game;
}

function GameCard({ game }: GameCardProps) {
	return (
		<Card.Root>
			<Image src={getCroppedImageUrl(game.background_image)} />
			<CardBody>
				<HStack justifyContent="space-between" marginBottom={3}>
					<PlatformIconList
						platforms={game.parent_platforms.map((p) => p.platform)}
					/>
					<MetaCritic criticScore={game.metacritic} />
				</HStack>
				<Card.Title fontSize="2xl">
					{game.name}
					<Emoji rating={game.rating_top} />
				</Card.Title>
			</CardBody>
		</Card.Root>
	);
}

export default GameCard;
