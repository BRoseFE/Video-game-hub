import type { Platform } from "@/entities/Platform";
import type { Genre } from "@/entities/Genre";
import type { Publisher } from "./Publisher";

export interface Game {
	id: number;
	slug: string;
	description_raw: string;
	name: string;
	genres: Genre[];
	publishers: Publisher[];
	background_image: string;
	parent_platforms: { platform: Platform }[];
	metacritic: number;
	rating_top: number;
}
