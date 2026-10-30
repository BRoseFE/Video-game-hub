import { createBrowserRouter } from "react-router-dom";
import GameDetailPage from "@/pages/GameDetailPage";
import Layout from "@/pages/Layout";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "games/:id", element: <GameDetailPage /> },
		],
	},
]);

export default router;
