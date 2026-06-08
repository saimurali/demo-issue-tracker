import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "A minimal kanban board",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
