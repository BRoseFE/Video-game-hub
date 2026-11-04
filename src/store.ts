import { create } from "zustand";
import type { GameBrainActiveFilter } from "@/entities/GameBrainFilters";
import type { GameBrainSorting } from "@/entities/GameBrainFilters";

interface GameQuery {
	searchText?: string;
	activeFilters?: GameBrainActiveFilter[];
	sorting?: GameBrainSorting;
}

interface GameQueryStore {
	gameQuery: GameQuery;
	setSearchText: (searchText: string) => void;
	setActiveFilters: (activeFilters: GameBrainActiveFilter[]) => void;
	setSorting: (sorting: GameBrainSorting) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
	gameQuery: {},
	setSearchText: (searchText) => set(() => ({ gameQuery: { searchText } })),
	setActiveFilters: (activeFilters) =>
		set((store) => ({ gameQuery: { ...store.gameQuery, activeFilters } })),
	setSorting: (sorting) =>
		set((store) => ({
			gameQuery: { ...store.gameQuery, sorting },
		})),
}));

export default useGameQueryStore;
