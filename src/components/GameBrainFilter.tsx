import { Accordion, Checkbox, VStack, Text } from "@chakra-ui/react";

import type {
	GameBrainActiveFilter,
	GameBrainFilterOption,
} from "@/entities/GameBrainFilters";

import useGameQueryStore from "@/store";

interface Props {
	filter: GameBrainFilterOption;
}

const EMPTY_FILTERS: GameBrainActiveFilter[] = [];

function GameBrainFilter({ filter }: Props) {
	const storedFilters = useGameQueryStore((s) => s.gameQuery.activeFilters);

	const activeFilters = storedFilters ?? EMPTY_FILTERS;

	const setActiveFilters = useGameQueryStore((s) => s.setActiveFilters);

	const handleFilterChange = (value: string, checked: boolean) => {
		const existingFilter = activeFilters.find((f) => f.key === filter.key);

		let updatedFilters = [...activeFilters];

		if (checked) {
			if (existingFilter) {
				updatedFilters = updatedFilters.map((f) =>
					f.key === filter.key
						? {
								...f,
								values: [...f.values, { match: value, value }],
							}
						: f,
				);
			} else {
				updatedFilters.push({
					key: filter.key,
					connection: filter.filter_connection,
					values: [{ match: value, value }],
				});
			}
		} else {
			updatedFilters = updatedFilters
				.map((f) =>
					f.key === filter.key
						? {
								...f,
								values: f.values.filter(
									(v) => v.value !== value,
								),
							}
						: f,
				)
				.filter((f) => f.values.length > 0);
		}

		setActiveFilters(updatedFilters);
	};

	return (
		<Accordion.Root collapsible>
			<Accordion.Item value={filter.key}>
				<Accordion.ItemTrigger>
					<Text fontWeight="bold" flex="1">
						{filter.name}
					</Text>
					<Accordion.ItemIndicator />
				</Accordion.ItemTrigger>

				<Accordion.ItemContent>
					<Accordion.ItemBody>
						<VStack align="stretch" gap={2}>
							{filter.values.map((value) => {
								const isChecked =
									activeFilters
										.find((f) => f.key === filter.key)
										?.values.some(
											(v) => v.value === value.key,
										) ?? false;

								return (
									<Checkbox.Root
										key={value.key}
										checked={isChecked}
										onCheckedChange={(details) =>
											handleFilterChange(
												value.key,
												details.checked === true,
											)
										}
									>
										<Checkbox.HiddenInput />
										<Checkbox.Control />
										<Checkbox.Label>
											{value.name} ({value.count})
										</Checkbox.Label>
									</Checkbox.Root>
								);
							})}
						</VStack>
					</Accordion.ItemBody>
				</Accordion.ItemContent>
			</Accordion.Item>
		</Accordion.Root>
	);
}

export default GameBrainFilter;
