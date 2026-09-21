import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const response = await fetch(
		`https://api.rawg.io/api/platforms/lists/parents?key=${process.env.RAWG_API_KEY}`,
	);

	const data = await response.json();

	return res.status(response.status).json(data);
}
