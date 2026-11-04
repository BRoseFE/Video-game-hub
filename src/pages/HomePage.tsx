import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";

import GameGrid from "@/components/GameGrid";
import GameHeading from "@/components/GameHeading";
import GameBrainFilter from "@/components/GameBrainFilter";
import SortSelector from "@/components/SortSelector";

import useGames from "@/hooks/useGames";
import useGameFilterOptions from "@/hooks/useGameFilterOptions";

function HomePage() {
	const gamesQuery = useGames();

	const { data: metadata } = useGameFilterOptions();

	const filterOptions = metadata?.filterOptions ?? [];
	const sortingOptions = metadata?.sortingOptions ?? [];

	return (
		<Grid
			templateAreas={{
				base: `"main"`,
				lg: `"aside main"`,
			}}
			templateColumns={{
				base: "1fr",
				lg: "260px 1fr",
			}}
		>
			<GridItem
				area="aside"
				display={{ base: "none", lg: "block" }}
				paddingLeft={5}
			>
				{filterOptions.map((filter) => (
					<GameBrainFilter key={filter.key} filter={filter} />
				))}
			</GridItem>

			<GridItem area="main">
				<Box paddingBottom={5} paddingX={3}>
					<GameHeading />

					<HStack gap={5}>
						<SortSelector sortingOptions={sortingOptions} />
					</HStack>
				</Box>

				<GameGrid gamesQuery={gamesQuery} />
			</GridItem>
		</Grid>
	);
}

export default HomePage;
