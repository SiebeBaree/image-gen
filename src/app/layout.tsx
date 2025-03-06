import { Sidebar } from "@/components/ui/sidebar";
import "@/styles/globals.css";

import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Create T3 App",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="flex h-screen">
                <Sidebar />
                {children}
            </body>
        </html>
    );
}
