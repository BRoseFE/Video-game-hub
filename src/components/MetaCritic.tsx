import { Badge } from "@chakra-ui/react";

interface Props {
	criticScore: number;
}

function MetaCritic({ criticScore }: Props) {
	let scoreColour: "green" | "yellow" | "red";

	if (criticScore >= 75) {
		scoreColour = "green";
	} else if (criticScore >= 60) {
		scoreColour = "yellow";
	} else {
		scoreColour = "red";
	}

	return (
		<Badge
			borderRadius="4px"
			fontSize="14px"
			paddingX={2}
			colorPalette={scoreColour}
			size={"sm"}
		>
			{criticScore}
		</Badge>
	);
}

export default MetaCritic;
