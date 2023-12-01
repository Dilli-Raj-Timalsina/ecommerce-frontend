import Footer from "@/sections/Footer/Footer";
import Navbar from "@/sections/Navbar/Navbar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const categories = [
        { name: "Home", url: "/" },
        { name: "Products", url: "/shop-all" },
        { name: "About Us", url: "/about" },
        { name: "Contact", url: "/contact" },
    ];
    return (
        <div className="w-screen  ">
            <div className="h-10 lg:h-16">
                <Navbar categories={categories} />
            </div>
            {children}
            <Footer />
        </div>
    );
}
