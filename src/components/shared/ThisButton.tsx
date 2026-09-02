import { Button } from "@chakra-ui/react";

interface DemoButtonProps {
	color:
		| "gray"
		| "red"
		| "orange"
		| "yellow"
		| "green"
		| "teal"
		| "blue"
		| "cyan"
		| "purple"
		| "pink";
	variant: "solid" | "outline" | "surface" | "subtle";
	text: string;
	onClick?: () => void;
}

const ThisButton = ({
	color,
	variant = "solid",
	text,
	onClick,
}: DemoButtonProps) => {
	return (
		<Button colorPalette={color} variant={variant} onClick={onClick}>
			{text}
		</Button>
	);
};
export default ThisButton;
