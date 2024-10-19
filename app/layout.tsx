import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner"
import { GlobalStateProvider } from "./context/globalContext";
import Navbar from "@/components/Navbar";



export const metadata: Metadata = {
  title: "Task Manager",
  description: "Post, Track, and Manage Your Tasks Effortlessly. Stay on Top of Every Deadline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased  font-outFit `}
      >
        <Toaster richColors position="top-right" />
        <GlobalStateProvider>
          <main className="min-h-svh flex flex-col">

            <Navbar />
            {children}
          </main>
        </GlobalStateProvider>

      </body>
    </html>
  );
}
