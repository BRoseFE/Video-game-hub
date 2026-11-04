import { Badge } from "@chakra-ui/react";

interface Props {
	criticScore: number | null;
}

function CriticScore({ criticScore }: Props) {
	if (criticScore === null) return null;

	let scoreColour: "green" | "yellow" | "red";

	if (criticScore ?? 0 >= 75) {
		scoreColour = "green";
	} else if (criticScore ?? 0 >= 60) {
		scoreColour = "yellow";
	} else {
		scoreColour = "red";
	}

	return (
		<Badge
			borderRadius="4px"
			fontSize="14px"
			paddingX={3}
			colorPalette={scoreColour}
			size={"sm"}
		>
			{criticScore}
		</Badge>
	);
}

export default CriticScore;
