import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { SessionContextProvider } from "./contexts/SessionContextProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <SessionContextProvider >
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </SessionContextProvider>
);
