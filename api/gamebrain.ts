import type { VercelRequest, VercelResponse } from "@vercel/node";

const GAMEBRAIN_BASE_URL = "https://api.gamebrain.co/v1";

// Approved GameBrain query parameters
const ALLOWED_QUERY_PARAMS = new Set([
	"query",
	"offset",
	"limit",
	"filters",
	"sort",
	"sort_order",
	"generate-filter-options",
	"steam_id",
	"igdb_id",
	"name",
	"year",
]);

// Only allow endpoints used by VideoGameHub
const isAllowedPath = (segments: string[]) => {
	const path = segments.join("/");

	if (
		path === "games" ||
		path === "games/suggestions" ||
		path === "games/match" ||
		path === "games/review-box"
	) {
		return true;
	}

	const gameId = "[0-9]+";

	const gamePath = new RegExp(`^games/${gameId}$`);

	const gameSubPath = new RegExp(`^games/${gameId}/(similar|news)$`);

	return gamePath.test(path) || gameSubPath.test(path);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Only allow GET requests
	if (req.method !== "GET") {
		res.setHeader("Allow", "GET");

		return res.status(405).json({
			error: "Method not allowed",
		});
	}

	// Retrieve the private API key
	const apiKey = process.env.GAMEBRAIN_API_KEY;

	if (!apiKey) {
		return res.status(500).json({
			error: "GameBrain API key is not configured",
		});
	}

	// Extract the rewritten path from the query
	const path = req.query.path;

	const segments: string[] = Array.isArray(path)
		? path
		: typeof path === "string"
			? path.split("/").filter(Boolean)
			: [];

	// Validate path segments
	if (
		segments.length === 0 ||
		segments.some(
			(segment) =>
				segment.length === 0 || segment === "." || segment === "..",
		)
	) {
		return res.status(400).json({
			error: "Invalid API path",
		});
	}

	// Restrict access to approved GameBrain endpoints
	if (!isAllowedPath(segments)) {
		return res.status(404).json({
			error: "API endpoint not found",
		});
	}

	try {
		const gameBrainPath = segments.map(encodeURIComponent).join("/");

		const url = new URL(gameBrainPath, `${GAMEBRAIN_BASE_URL}/`);

		// Support existing RAWG search parameters
		const page = Number(req.query.page);
		const pageSize = Number(req.query.page_size ?? req.query.limit ?? 20);

		const search = req.query.search ?? req.query.query;

		if (search !== undefined) {
			const searchValue = Array.isArray(search) ? search[0] : search;

			if (typeof searchValue === "string") {
				url.searchParams.set("query", searchValue);
			}
		}

		// Convert RAWG pagination into GameBrain pagination
		if (
			req.query.page !== undefined &&
			req.query.offset === undefined &&
			Number.isInteger(page) &&
			page >= 1
		) {
			url.searchParams.set("offset", String((page - 1) * pageSize));
		}

		// Convert RAWG search into GameBrain search
		if (search !== undefined) {
			const searchValue = Array.isArray(search) ? search[0] : search;

			url.searchParams.set("query", searchValue);
		}

		// Forward approved query parameters
		for (const [key, value] of Object.entries(req.query)) {
			if (
				key === "path" ||
				key === "search" ||
				key === "page" ||
				key === "page_size" ||
				!ALLOWED_QUERY_PARAMS.has(key) ||
				value === undefined
			) {
				continue;
			}

			const values = Array.isArray(value) ? value : [value];

			for (const item of values) {
				url.searchParams.append(key, item);
			}
		}

		// Validate GameBrain pagination limits
		const limit = Number(url.searchParams.get("limit") ?? 20);
		const offset = Number(url.searchParams.get("offset") ?? 0);

		if (
			!Number.isInteger(limit) ||
			limit < 1 ||
			limit > 50 ||
			!Number.isInteger(offset) ||
			offset < 0 ||
			offset > 1000
		) {
			return res.status(400).json({
				error: "Invalid pagination. Limit must be between 1 and 50, and offset between 0 and 1000.",
			});
		}

		// Authenticate with GameBrain
		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				"x-api-key": apiKey,
				Accept: "application/json",
			},
			signal: AbortSignal.timeout(15000),
		});

		// Forward API quota information
		const quotaHeaders = [
			"x-api-quota-request",
			"x-api-quota-used",
			"x-api-quota-left",
		];

		for (const header of quotaHeaders) {
			const value = response.headers.get(header);

			if (value !== null) {
				res.setHeader(header, value);
			}
		}

		// Parse GameBrain response
		const data = await response.json();

		// Return GameBrain response and status
		if (!response.ok) {
			return res.status(response.status).json({
				error:
					data?.error ||
					data?.message ||
					"GameBrain API request failed",
				status: response.status,
			});
		}

		return res.status(response.status).json(data);
	} catch (error) {
		console.error("GameBrain API request failed:", error);

		return res.status(502).json({
			error: "Unable to communicate with GameBrain API",
		});
	}
}
