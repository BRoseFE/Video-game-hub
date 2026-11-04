import useGameQueryStore from "@/store";
import { Button, HStack, Menu, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import type { GameBrainSortingOption } from "@/entities/GameBrainFilters";

interface Props {
	sortingOptions: GameBrainSortingOption[];
}

function SortSelector({ sortingOptions }: Props) {
	const [open, setOpen] = useState(false);

	const sorting = useGameQueryStore((s) => s.gameQuery.sorting);
	const setSorting = useGameQueryStore((s) => s.setSorting);

	const currentSort = sortingOptions.find(
		(option) =>
			option.key === sorting?.key && option.sort === sorting?.direction,
	);

	return (
		<HStack>
			<Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
				<Menu.Trigger asChild>
					<Button variant="subtle" size="lg">
						Order By: {currentSort?.name ?? "Relevance"}
						<FaAngleDown />
					</Button>
				</Menu.Trigger>

				<Portal>
					<Menu.Positioner>
						<Menu.Content>
							<Menu.Item
								value="relevance"
								onClick={() =>
									setSorting({
										key: null,
										direction: null,
									})
								}
							>
								Relevance
							</Menu.Item>

							{sortingOptions.map((option) => (
								<Menu.Item
									key={option.key}
									value={option.key}
									onClick={() =>
										setSorting({
											key: option.key,
											direction: option.sort,
										})
									}
								>
									{option.name}
								</Menu.Item>
							))}
						</Menu.Content>
					</Menu.Positioner>
				</Portal>
			</Menu.Root>
		</HStack>
	);
}

export default SortSelector;
