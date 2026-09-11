import useData from "./useData";

export interface Ordering {
	name: string;
	released: string;
	rating: number;
}

const useOrdering = () => useData<Ordering>("");

export default useOrdering;
