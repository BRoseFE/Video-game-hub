import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

function GameCardContainer({ children }: Props) {
	return (
		<Box
			transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
			_hover={{
				transform: "scale(1.03)",
			}}
			borderRadius={10}
			overflow="hidden"
		>
			{children}
		</Box>
	);
}

export default GameCardContainer;
