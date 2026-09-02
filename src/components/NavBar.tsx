import { Flex, Box, Image } from "@chakra-ui/react";
import logo from "@/assets/logo.webp";

function NavBar() {
	return (
		<Flex>
			<Box boxSize="60px">
				<Image src={logo} />
			</Box>
			<Box height="10">SearchBar</Box>
			<Box height="10">ThemeSwitch</Box>
		</Flex>
	);
}

export default NavBar;
