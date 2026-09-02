import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
	return (
		<Grid
			templateAreas={{
				base: `"nav" "main"`,
				lg: `"nav    nav" "aside  main"`,
			}}
		>
			<GridItem area="nav">
				<NavBar />
			</GridItem>
			<GridItem
				area="aside"
				bg="red"
				display={{ base: "none", lg: "block" }}
			>
				Aside
			</GridItem>
			<GridItem area="main" bg="blue">
				main
			</GridItem>
		</Grid>
	);
}

export default App;
