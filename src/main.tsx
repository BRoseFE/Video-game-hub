import { Provider } from "@/components/ui/provider.tsx";
import "@/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* Note for me: <Provider></Provider> is used for chakra UI context wrapping (see docs) */}
		<Provider>
			<QueryClientProvider client={queryClient}>
				<App />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</Provider>
	</StrictMode>,
);
