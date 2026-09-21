import type { VercelRequest, VercelResponse } from "@vercel/node";
export default async function handler(req: VercelRequest, res: VercelResponse) {
	const path = Array.isArray(req.query.path)
		? req.query.path.join("/")
		: req.query.path;
	if (!path) {
		return res.status(400).json({ error: "Missing RAWG API path" });
	}
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(req.query)) {
		if (key === "path") continue;
		if (Array.isArray(value)) {
			value.forEach((item) => params.append(key, item));
		} else if (value !== undefined) {
			params.set(key, value);
		}
	}
	params.set("key", process.env.RAWG_API_KEY!);
	try {
		const response = await fetch(
			`https://api.rawg.io/api/${path}?${params.toString()}`,
		);
		const data = await response.json();
		return res.status(response.status).json(data);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: "Failed to communicate with RAWG API" });
	}
}
