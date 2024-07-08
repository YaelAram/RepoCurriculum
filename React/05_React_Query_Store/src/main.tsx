import React from "react";
import ReactDOM from "react-dom/client";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";

import "./index.css";
import { ReactQuery } from "./plugins";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="bottom-right" reverseOrder={false} />
    <ReactQuery>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <RouterProvider router={router} />
        </main>
      </NextUIProvider>
    </ReactQuery>
  </React.StrictMode>
);
