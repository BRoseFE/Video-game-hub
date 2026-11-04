import useGameQueryStore from "@/store";
import { Heading } from "@chakra-ui/react";

const EMPTY_FILTERS: never[] = [];

function GameHeading() {
	const searchText = useGameQueryStore((s) => s.gameQuery.searchText);

	const storedFilters = useGameQueryStore((s) => s.gameQuery.activeFilters);

	const activeFilters = storedFilters ?? EMPTY_FILTERS;

	const heading = searchText
		? `${searchText} Games`
		: activeFilters.length > 0
			? "Filtered Games"
			: "Games";

	return (
		<Heading as="h1" fontSize="5xl" marginY={5}>
			{heading}
		</Heading>
	);
}

export default GameHeading;
