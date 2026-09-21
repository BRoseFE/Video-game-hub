import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "@/assets/logo.webp";
import { ColorModeButton } from "@/components/ui/color-mode";
import SearchInput from "@/components/SearchInput";

function NavBar() {
	return (
		<Flex p={2}>
			<Image src={logo} boxSize="60px" />
			<SearchInput />
			<Box paddingTop={2}>
				<ColorModeButton borderRadius={15} size="lg" />
			</Box>
		</Flex>
	);
}

export default NavBar;
