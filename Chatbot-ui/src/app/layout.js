"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "react-hot-toast";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConvexProvider client={convex}>
          <Toaster position="top-right" />
          {children}
        </ConvexProvider>
      </body>
    </html>
  );
}
