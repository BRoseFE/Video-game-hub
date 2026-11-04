import type GameBrainGame from "@/entities/GameBrainGame";
import type Game from "@/entities/Game";
import type Genre from "@/entities/Genre";
import type Platform from "@/entities/Platform";

const normalizeGenres = (game: GameBrainGame): Genre[] => {
	if (game.genres?.length) {
		return game.genres.map((genre, index) => ({
			id: index,
			name: genre.name,
			image_background: "",
		}));
	}

	if (game.genre) {
		return [
			{
				id: 0,
				name: game.genre,
				image_background: "",
			},
		];
	}

	return [];
};

const normalizePlatforms = (game: GameBrainGame): Platform[] => {
	return (game.platforms ?? []).map((platform, index) => ({
		id: index,
		name: platform.name,
		slug: platform.value,
	}));
};

export const normalizeGame = (game: GameBrainGame): Game => {
	const rating = game.rating?.mean;
	const criticRating = game.rating?.mean_critics;

	const screenshots = (game.screenshots ?? []).map((image, index) => ({
		id: index,
		image,
		width: 0,
		height: 0,
	}));

	const trailers = (game.videos ?? []).map((video, index) => ({
		id: index,
		name: `Video ${index + 1}`,
		preview: "",
		data: {
			480: video,
			max: video,
		},
	}));

	return {
		id: game.id,
		slug: String(game.id),
		name: game.name,

		description_raw: game.description ?? game.short_description ?? "",

		developer: game.developer ?? null,

		genres: normalizeGenres(game),

		publishers: [],

		trailer: trailers,
		screenshot: screenshots,

		background_image: game.image ?? "",

		parent_platforms: normalizePlatforms(game).map((platform) => ({
			platform,
		})),

		metacritic:
			criticRating != null ? Math.round(criticRating * 100) : null,

		rating_top: rating != null ? Math.round(rating * 5) : 0,

		gamebrainScore:
			game.rating?.mean != null
				? Math.round(game.rating.mean * 100)
				: null,
	};
};
