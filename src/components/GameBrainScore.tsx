import { Badge } from "@chakra-ui/react";

interface Props {
	score: number | null;
}

function GameBrainScore({ score }: Props) {
	if (score === null) return null;

	let scoreColour: "green" | "yellow" | "red";

	if (score >= 75) {
		scoreColour = "green";
	} else if (score >= 60) {
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
			size="sm"
		>
			{score} GBS
		</Badge>
	);
}

export default GameBrainScore;
