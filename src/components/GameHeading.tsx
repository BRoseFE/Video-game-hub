import type { GameQuery } from "@/App";
import useGenre from "@/hooks/useGenre";
import usePlatform from "@/hooks/usePlatform";

import { Heading } from "@chakra-ui/react";

interface Props {
	gameQuery: GameQuery;
}

function GameHeading({ gameQuery }: Props) {
	const genre = useGenre(gameQuery.genreId);
	const platform = usePlatform(gameQuery.platformId);

	const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

	return (
		<Heading as="h1" fontSize="5xl" marginY={5}>
			{heading}
		</Heading>
	);
}

export default GameHeading;
