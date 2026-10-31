import type { VercelRequest, VercelResponse } from "@vercel/node";

const RAWG_BASE_URL = "https://api.rawg.io/api";

// Only allow endpoints used by VideoGameHub
const ALLOWED_QUERY_PARAMS = new Set([
	"page",
	"page_size",
	"search",
	"search_precise",
	"search_exact",
	"genres",
	"parent_platforms",
	"ordering",
	"dates",
	"platforms",
	"stores",
	"developers",
	"publishers",
	"tags",
	"metacritic",
]);

const isAllowedPath = (segments: string[]) => {
	const path = segments.join("/");

	if (path === "games" || path === "genres") {
		return true;
	}

	if (path === "platforms/lists/parents") {
		return true;
	}

	const gamePath = /^games\/[a-zA-Z0-9_-][a-zA-Z0-9._-]{0,199}$/;

	const gameSubPath =
		/^games\/[a-zA-Z0-9_-][a-zA-Z0-9._-]{0,199}\/(screenshots|movies)$/;

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
	const apiKey = process.env.RAWG_API_KEY;

	if (!apiKey) {
		return res.status(500).json({
			error: "RAWG API key is not configured",
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

	// Restrict access to approved RAWG endpoints
	if (!isAllowedPath(segments)) {
		return res.status(404).json({
			error: "API endpoint not found",
		});
	}

	try {
		const rawgPath = segments.map(encodeURIComponent).join("/");

		const url = new URL(rawgPath, `${RAWG_BASE_URL}/`);

		// Forward approved query parameters
		for (const [key, value] of Object.entries(req.query)) {
			if (
				key === "path" ||
				key === "key" ||
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

		// Add the private key server-side
		url.searchParams.set("key", apiKey);

		// Request RAWG
		const response = await fetch(url.toString(), {
			method: "GET",
			signal: AbortSignal.timeout(15000),
		});

		const data = await response.json();

		return res.status(response.status).json(data);
	} catch (error) {
		console.error("RAWG API request failed:", error);

		return res.status(502).json({
			error: "Unable to communicate with RAWG API",
		});
	}
}
