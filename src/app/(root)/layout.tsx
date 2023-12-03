import Footer from "@/sections/Footer/Footer";
import Navbar from "@/sections/Navbar/Navbar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-screen  ">
            <div className="h-10 lg:h-16">
                <Navbar />
            </div>
            {children}
            <Footer />
        </div>
    );
}
