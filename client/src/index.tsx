import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { SkeletonTheme } from "react-loading-skeleton";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MyStatusContext } from "./contexts/statusContext";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyStatusContext>
        <Toaster position="bottom-right" />
        <BrowserRouter>
          <App />
        </BrowserRouter>

        <ReactQueryDevtools initialIsOpen={false} />
      </MyStatusContext>
    </QueryClientProvider>
  </React.StrictMode>
);
