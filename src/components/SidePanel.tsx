import { VStack } from "@chakra-ui/react";
import GenreList from "./GenreList";

function SidePanel() {
	return (
		<VStack>
			<GenreList />
		</VStack>
	);
}

export default SidePanel;
