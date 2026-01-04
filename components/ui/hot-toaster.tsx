"use client";

import { Toaster as HotToaster } from "react-hot-toast";

const toastStyle = {
  background: "var(--popover)",
  color: "var(--popover-foreground)",
  border: "1px solid var(--border)",
};

const Toaster = () => (
  <HotToaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: toastStyle,
    }}
  />
);

export { Toaster };
