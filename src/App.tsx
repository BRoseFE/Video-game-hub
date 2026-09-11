import { Grid, GridItem, HStack } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import { useState } from "react";
import GenreList from "./components/GenreList";
import type { Genre } from "./hooks/useGenres";
import type { Platform } from "./hooks/usePlatforms";
import PlatformSelector from "./components/PlatformSelector";
import type { Ordering } from "./hooks/useOrdering";
import SortSelector from "./components/SortSelector";

export interface GameQuery {
	genre: Genre | null;
	platform: Platform | null;
	ordering: Ordering | null;
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
				lg: "200px 1fr",
			}}
		>
			<GridItem area="nav">
				<NavBar />
			</GridItem>
			<GridItem
				area="aside"
				display={{ base: "none", lg: "block" }}
				paddingLeft={5}
			>
				<GenreList
					selectedGenre={gameQuery.genre}
					onSelectGenre={(genre) => {
						setGameQuery({ ...gameQuery, genre });
					}}
				/>
			</GridItem>
			<GridItem area="main">
				<HStack gap={5} paddingLeft={10} marginLeft={10}>
					<PlatformSelector
						selectedPlatform={gameQuery.platform}
						onSelectPlatform={(platform) => {
							setGameQuery({ ...gameQuery, platform });
						}}
					/>
					<SortSelector />
				</HStack>
				<GameGrid gameQuery={gameQuery} />
			</GridItem>
		</Grid>
	);
}

export default App;
