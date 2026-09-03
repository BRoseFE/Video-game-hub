import { Flex, Box, Image } from "@chakra-ui/react";
import logo from "@/assets/logo.webp";
import { ColorModeButton } from "@/components/ui/color-mode";

function NavBar() {
	return (
		<Flex justifyContent="space-between" p={2}>
			<Box boxSize="60px">
				<Image src={logo} />
			</Box>
			<Box height="10">SearchBar</Box>
			<Box height="10" justifySelf="flex-end">
				<ColorModeButton />
			</Box>
		</Flex>
	);
}

export default NavBar;
