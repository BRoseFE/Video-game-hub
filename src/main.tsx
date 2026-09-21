import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider.tsx";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		{/* Note for me: <Provider></Provider> is used for chakra UI context wrapping (see docs) */}
		<Provider>
			<App />
		</Provider>
	</StrictMode>,
);
