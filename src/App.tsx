import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import { useState } from "react";
import GenreList from "./components/GenreList";
import type { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";

function App() {
	const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

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
					selectedGenre={selectedGenre}
					onSelectGenre={(genre) => {
						setSelectedGenre(genre);
					}}
				/>
			</GridItem>
			<GridItem area="main">
				<PlatformSelector />
				<GameGrid selectedGenre={selectedGenre} />
			</GridItem>
		</Grid>
	);
}

export default App;
