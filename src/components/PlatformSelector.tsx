import { Button, Menu, Portal, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import usePlatforms, { type Platform } from "@/hooks/usePlatforms";

interface Props {
	onSelectPlatform: (platform: Platform) => void;
	selectedPlatform: Platform | null;
}

function PlatformSelector({ onSelectPlatform, selectedPlatform }: Props) {
	const [open, setOpen] = useState(false);
	const { data, error } = usePlatforms();

	if (error) return null;

	return (
		<Stack>
			<Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
				<Menu.Trigger asChild>
					<Button variant="subtle" size="lg">
						{selectedPlatform?.name || "Platforms"}
						<FaAngleDown />
					</Button>
				</Menu.Trigger>
				<Portal>
					<Menu.Positioner>
						<Menu.Content>
							{data.map((platform) => (
								<Menu.Item
									key={platform.id}
									value={platform.name}
									onClick={() => onSelectPlatform(platform)}
								>
									{platform.name}
								</Menu.Item>
							))}
						</Menu.Content>
					</Menu.Positioner>
				</Portal>
			</Menu.Root>
		</Stack>
	);
}

export default PlatformSelector;
