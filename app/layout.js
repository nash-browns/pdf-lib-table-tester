import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { NavBar } from "./components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "pdf-lib-table",
  description: "Table add on for pdf-lib",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="fantasy">
            <body className={`${inter.className} bg-base-100`} suppressHydrationWarning={true}>
                <div className="h-16 bg-base-200 border-b-accent border-2">
                    <NavBar/>
                </div>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
