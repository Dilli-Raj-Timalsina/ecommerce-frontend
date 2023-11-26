import { GlobalProvider } from "@/context/GlobalContext";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const roboto = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Foods and Goods",
    description: "Ecommerce Website which sells Nepalese goods in the UK",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${roboto.className} overflow-x-hidden  `}>
                <GlobalProvider>{children}</GlobalProvider>
            </body>
        </html>
    );
}
