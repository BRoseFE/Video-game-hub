import useGameQueryStore from "@/store";
import { Button, Menu, Portal, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

function SortSelector() {
	const [open, setOpen] = useState(false);
	const sortOrders = [
		{ value: "", label: "Relevance" },
		{ value: "-added", label: "Date added" },
		{ value: "name", label: "Name" },
		{ value: "-released", label: "Release date" },
		{ value: "-metacritic", label: "Popularity" },
		{ value: "-rating", label: "Average rating" },
	];

	const sortOrder = useGameQueryStore((s) => s.gameQuery.sortOrder);
	const selectedSortOrder = useGameQueryStore((s) => s.setSortOrder);

	const currentSortOrder = sortOrders.find(
		(order) => order.value === sortOrder,
	);

	return (
		<Stack>
			<Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
				<Menu.Trigger asChild>
					<Button variant="subtle" size="lg">
						Order By: {currentSortOrder?.label || "Relevance"}
						<FaAngleDown />
					</Button>
				</Menu.Trigger>
				<Portal>
					<Menu.Positioner>
						<Menu.Content>
							{sortOrders.map((order) => (
								<Menu.Item
									key={order.value}
									value={order.value}
									onClick={() =>
										selectedSortOrder(order.value)
									}
								>
									{order.label}
								</Menu.Item>
							))}
						</Menu.Content>
					</Menu.Positioner>
				</Portal>
			</Menu.Root>
		</Stack>
	);
}

export default SortSelector;
