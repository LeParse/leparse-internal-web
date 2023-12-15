"use client";

import GlobalProvider from "./contexts/global.context";

import { FontProvider } from "@leparse/ui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./reset.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <FontProvider>{children}</FontProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            limit={3}
          />
        </GlobalProvider>
      </body>
    </html>
  );
}
