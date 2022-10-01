import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import App from "./App";
import { ReactQueryDevtools } from "react-query/devtools";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient({});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />

			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>
);
