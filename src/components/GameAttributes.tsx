import DefinitionItem from "@/components/DefinitionItem";
import type Game from "@/entities/Game";
import { SimpleGrid, Text } from "@chakra-ui/react";
import CriticScore from "./CriticScore";

interface Props {
	game: Game;
}

export const GameAttributes = ({ game }: Props) => {
	return (
		<SimpleGrid columns={2} as="dl">
			<DefinitionItem term="Platforms">
				{game.parent_platforms?.map(({ platform }) => (
					<Text key={platform.id}>{platform.name}</Text>
				))}
			</DefinitionItem>
			<DefinitionItem term="Metascore">
				<CriticScore criticScore={game.metacritic}></CriticScore>
			</DefinitionItem>
			<DefinitionItem term="Genres">
				{game.genres.map((genre) => (
					<Text key={genre.id}>{genre.name}</Text>
				))}
			</DefinitionItem>
			<DefinitionItem term="Developer">
				<Text>{game.developer}</Text>
			</DefinitionItem>
		</SimpleGrid>
	);
};
