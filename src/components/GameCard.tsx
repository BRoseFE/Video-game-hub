import Emoji from "@/components/Emoji";
import type Game from "@/entities/Game";
import { Card, CardBody, HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PlatformIconList from "./PlatformIconList";
import getImageUrl from "./services/image-url";
import GameBrainScore from "./GameBrainScore";

interface GameCardProps {
	game: Game;
}

function GameCard({ game }: GameCardProps) {
	return (
		<Card.Root>
			<Image
				src={getImageUrl(game.background_image)}
				aspectRatio="16 / 9"
				objectFit="cover"
				width="100%"
			/>
			<CardBody>
				<HStack justifyContent="space-between" marginBottom={3}>
					<PlatformIconList
						platforms={game.parent_platforms.map((p) => p.platform)}
					/>
					<GameBrainScore score={game.gamebrainScore} />
				</HStack>
				<Card.Title fontSize="2xl">
					<Link to={"/games/" + game.slug}>{game.name}</Link>
					<Emoji rating={game.rating_top} />
				</Card.Title>
			</CardBody>
		</Card.Root>
	);
}

export default GameCard;
