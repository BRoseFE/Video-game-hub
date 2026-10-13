import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import { useState } from "react";
import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";

export interface GameQuery {
	genreId?: number;
	platformId?: number;
	sortOrder: string;
	searchText: string;
}

function App() {
	const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

	return (
		<Grid
			templateAreas={{
				base: `"nav" "main"`,
				lg: `"nav    nav" "aside  main"`,
			}}
			templateColumns={{
				base: "1fr",
				lg: "260px 1fr",
			}}
		>
			<GridItem area="nav">
				<NavBar
					onSearch={(searchText) =>
						setGameQuery({ ...gameQuery, searchText })
					}
				/>
			</GridItem>
			<GridItem
				area="aside"
				display={{ base: "none", lg: "block" }}
				paddingLeft={5}
			>
				<GenreList
					selectedGenreId={gameQuery.genreId}
					onSelectGenre={(genre) => {
						setGameQuery({ ...gameQuery, genreId: genre.id });
					}}
				/>
			</GridItem>
			<GridItem area="main">
				<Box paddingBottom={5} paddingX={3}>
					<GameHeading gameQuery={gameQuery} />
					<HStack gap={5}>
						<PlatformSelector
							selectedPlatformId={gameQuery.platformId}
							onSelectPlatform={(platform) => {
								setGameQuery({
									...gameQuery,
									platformId: platform.id,
								});
							}}
						/>
						<SortSelector
							sortOrder={gameQuery.sortOrder}
							onSelectSortOrder={(sortOrder) =>
								setGameQuery({ ...gameQuery, sortOrder })
							}
						/>
					</HStack>
				</Box>
				<GameGrid gameQuery={gameQuery} />
			</GridItem>
		</Grid>
	);
}

export default App;
