import Link from "next/link";
import LanguageDropdown from '@/components/LanguageDropdown/LanguageDropdown';
import { HamburgerMenu, SearchIcon, ProfileIcon } from '@/assets/svg';
import CartButton from "@/components/CartButton/CartButton";
import NotifyButton from "@/components/NotifyButton/NotifyButton";
import UserProfile from "@/components/UserProfile/UserProfile";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Navbar({ categories }: { categories: any }) {
	// const session = await getServerSession(authOptions);
	// const user = session?.user;

	return (
		<div className="top-0 navbar z-20 w-screen fixed bg-base-100 text-neutral">
			<div className="navbar-start px-0 lg:px-8">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<HamburgerMenu />
					</label>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52">
						<li><Link href={"/"}>Home</Link></li>
						<li><Link href={"/shop-all"}>Products</Link></li>
						<li><Link href={"/about"}>About Us</Link></li>
						<li><Link href={"/contact"}>Contact</Link></li>
					</ul>
				</div>
				{/* <Image alt="logo" src='/images/logo.jpeg' height={200} width={200} className="h-16 w-16" /> */}
				<Link href={'/'} className="btn hover:bg-transparent btn-ghost normal-case text-sm p-0 lg:p-3 lg:text-xl">Ushopie</Link>
			</div>


			<div className="navbar-end w-4/5">
				<div className="form-control relative w-96 mr-10 hidden lg:flex">
					<input type="text" placeholder="Search" className="input focus:outline-none text-sm hover:bg-primary focus:border-neutral hover:border-neutral border-secondary focus:bg-primary bg-white rounded-3xl input-bordered pl-6 pr-20 md:w-auto" />
					<button className="btn bg-secondary hover:bg-neutral text-base-100 btn-ghost absolute right-0 rounded-l-none px-6 rounded-r-3xl">
						<SearchIcon />
					</button>
				</div>

				<LanguageDropdown />
				<CartButton />
				<NotifyButton />
				<UserProfile />
			</div>
		</div>
	);
}