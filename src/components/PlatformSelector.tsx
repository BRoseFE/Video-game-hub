import usePlatform from "@/hooks/usePlatform";
import usePlatforms from "@/hooks/usePlatforms";
import useGameQueryStore from "@/store";
import { Button, Menu, Portal, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

function PlatformSelector() {
	const [open, setOpen] = useState(false);
	const { data, error } = usePlatforms();

	const setSelectedPlatform = useGameQueryStore((s) => s.setPlatformId);

	const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
	const selectedPlatform = usePlatform(selectedPlatformId);

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
							{data?.results.map((platform) => (
								<Menu.Item
									key={platform.id}
									value={platform.name}
									onClick={() =>
										setSelectedPlatform(platform.id)
									}
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
