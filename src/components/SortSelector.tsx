import { Stack, Menu, Button, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

function SortSelector() {
	const [open, setOpen] = useState(false);

	return (
		<Stack>
			<Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
				<Menu.Trigger asChild>
					<Button variant="subtle" size="lg">
						Order By: Relevance
						<FaAngleDown />
					</Button>
				</Menu.Trigger>
				<Portal>
					<Menu.Positioner>
						<Menu.Content>
							<Menu.Item value="Relevance">Relevance</Menu.Item>
							<Menu.Item value="Date added">Date added</Menu.Item>
							<Menu.Item value="Name">Name</Menu.Item>
							<Menu.Item value="Release date">
								Release date
							</Menu.Item>
							<Menu.Item value="Popularity">Popularity</Menu.Item>
							<Menu.Item value="Average rating">
								Average rating
							</Menu.Item>
						</Menu.Content>
					</Menu.Positioner>
				</Portal>
			</Menu.Root>
		</Stack>
	);
}

export default SortSelector;
