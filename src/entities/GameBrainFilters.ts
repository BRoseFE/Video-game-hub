export interface GameBrainFilterValue {
	name: string;
	key: string;
	count: number;
}

export interface GameBrainFilterOption {
	name: string;
	key: string;
	values: GameBrainFilterValue[];
	filter_type: string;
	filter_connection: "AND" | "OR" | "XOR";
}

export interface GameBrainActiveFilterValue {
	match: string;
	value: string;
}

export interface GameBrainActiveFilter {
	key: string;
	connection: "AND" | "OR" | "XOR";
	values: GameBrainActiveFilterValue[];
}

export interface GameBrainSortingOption {
	name: string;
	key: string;
	sort: "ASC" | "DESC";
}

export interface GameBrainSorting {
	key: string | null;
	direction: "ASC" | "DESC" | null;
}
