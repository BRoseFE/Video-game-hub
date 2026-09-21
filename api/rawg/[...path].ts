import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	// Vercel's catch-all parameter can be available as either
	// `path` or as part of the request URL depending on the runtime.
	let path = req.query.path;

	if (Array.isArray(path)) {
		path = path.join("/");
	}

	if (!path && req.url) {
		const pathname = req.url.split("?")[0];

		const match = pathname.match(/^\/api\/rawg\/(.+)$/);

		if (match) {
			path = match[1];
		}
	}

	if (!path) {
		return res.status(400).json({
			error: "Missing RAWG API path",
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

	const apiKey = process.env.RAWG_API_KEY;

	if (!apiKey) {
		return res.status(500).json({
			error: "RAWG_API_KEY environment variable is not configured",
		});
	}

	params.set("key", apiKey);

	try {
		const response = await fetch(
			`https://api.rawg.io/api/${path}?${params.toString()}`,
		);

		const data = await response.json();

		return res.status(response.status).json(data);
	} catch (error) {
		console.error("RAWG API error:", error);

		return res.status(500).json({
			error: "Failed to communicate with RAWG API",
		});
	}
}
