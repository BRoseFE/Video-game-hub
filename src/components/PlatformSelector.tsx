import { Button, Menu, Portal, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import usePlatforms from "@/hooks/usePlatforms";

function PlatformSelector() {
	const [open, setOpen] = useState(false);
	const { data, error } = usePlatforms();

	if (error) return null;

	return (
		<Stack gap="4" align="flex-start" paddingLeft={10}>
			<Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
				<Menu.Trigger asChild>
					<Button variant="outline" size="lg">
						Platforms
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
