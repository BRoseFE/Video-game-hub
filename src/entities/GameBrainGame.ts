export interface GameBrainRating {
	mean: number | null;
	count: number;
	mean_players?: number | null;
	count_players?: number;
	mean_critics?: number | null;
	count_critics?: number;
}

export interface GameBrainValue {
	value: string;
	name: string;
}

export default interface GameBrainGame {
	id: number;
	name: string;
	image: string | null;
	link?: string;
	year?: number | null;
	release_date?: string | null;

	description?: string | null;
	short_description?: string | null;

	developer?: string | null;
	genre?: string | null;

	rating: GameBrainRating;

	platforms?: GameBrainValue[];
	genres?: GameBrainValue[];
	tags?: GameBrainValue[];
	themes?: GameBrainValue[];
	play_modes?: GameBrainValue[];

	screenshots?: string[];
	videos?: string[];

	micro_trailer?: string | null;
	gameplay?: string | null;

	playtime?: {
		mean?: number;
		median?: number;
		min?: number;
		max?: number;
		mentions?: number;
	};

	adult_only?: boolean;

	image_aspect_ratio?: number;
}
