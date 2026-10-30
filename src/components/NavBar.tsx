import logo from "@/assets/logo.webp";
import SearchInput from "@/components/SearchInput";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<Flex p={2}>
			<Link to="/">
				<Image src={logo} boxSize="60px" />
			</Link>
			<SearchInput />
			<Box paddingTop={2}>
				<ColorModeButton borderRadius={15} size="lg" />
			</Box>
		</Flex>
	);
}

export default NavBar;
