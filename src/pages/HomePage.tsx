import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import GameGrid from "@/components/GameGrid";
import GameHeading from "@/components/GameHeading";
import GenreList from "@/components/GenreList";
import PlatformSelector from "@/components/PlatformSelector";
import SortSelector from "@/components/SortSelector";

function HomePage() {
	return (
		<Grid
			templateAreas={{
				base: `"main"`,
				lg: `"aside  main"`,
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
				<GenreList />
			</GridItem>
			<GridItem area="main">
				<Box paddingBottom={5} paddingX={3}>
					<GameHeading />
					<HStack gap={5}>
						<PlatformSelector />
						<SortSelector />
					</HStack>
				</Box>
				<GameGrid />
			</GridItem>
		</Grid>
	);
}

export default HomePage;
