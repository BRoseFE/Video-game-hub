import { createBrowserRouter } from "react-router-dom";
// import GameDetailPage from "@/pages/GameDetailPage";
// import Layout from "@/pages/Layout";
import ErrorPage from "@/pages/ErrorPage";
// import HomePage from "@/pages/HomePage";

const router = createBrowserRouter([
	// Currently Commented out due to RAWG.io api being down for a few days now.
	// Will update once RAWG.io is back up and running
	// {
	// 	path: "/",
	// 	element: <Layout />,
	// 	errorElement: <ErrorPage />,
	// 	children: [
	// 		{ index: true, element: <HomePage /> },
	// 		{ path: "games/:slug", element: <GameDetailPage /> },
	// 	],
	// },
	{
		path: "/",
		element: <ErrorPage />,
	},
]);

export default router;
