import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	let path = req.query.path;

	// Handle Vercel's catch-all route parameter
	if (Array.isArray(path)) {
		path = path.join("/");
	}

	// Fallback: extract the path directly from the request URL
	if (!path && req.url) {
		const pathname = req.url.split("?")[0];
		const prefix = "/api/rawg/";

		if (pathname.startsWith(prefix)) {
			path = pathname.slice(prefix.length);
		}
	}

	if (!path || typeof path !== "string") {
		return res.status(400).json({
			error: "Missing RAWG API path",
		});
	}

	const apiKey = process.env.RAWG_API_KEY;

	if (!apiKey) {
		return res.status(500).json({
			error: "RAWG_API_KEY environment variable is not configured",
		});
	}

	const params = new URLSearchParams();

	for (const [key, value] of Object.entries(req.query)) {
		if (key === "path") continue;

		if (Array.isArray(value)) {
			value.forEach((item) => {
				params.append(key, item);
			});
		} else if (value !== undefined) {
			params.set(key, value);
		}
	}

	params.set("key", apiKey);

	const rawgUrl = `https://api.rawg.io/api/${path}?${params.toString()}`;

	try {
		const response = await fetch(rawgUrl);
		const data = await response.json();

		return res.status(response.status).json(data);
	} catch (error) {
		console.error("RAWG API error:", error);

		return res.status(500).json({
			error: "Failed to communicate with RAWG API",
		});
	}
}
