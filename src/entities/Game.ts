import type Platform from "@/entities/Platform";
import type Genre from "@/entities/Genre";
import type Publisher from "@/entities/Publisher";
import type Trailer from "@/entities/Trailer";
import type Screenshot from "@/entities/Screenshot";

export default interface Game {
	id: number;
	slug: string;
	description_raw: string;
	name: string;
	genres: Genre[];
	publishers: Publisher[];
	developer: string | null;
	trailer: Trailer[];
	screenshot: Screenshot[];
	background_image: string;
	parent_platforms: { platform: Platform }[];
	metacritic: number | null;
	rating_top: number;
	gamebrainScore: number | null;
}
