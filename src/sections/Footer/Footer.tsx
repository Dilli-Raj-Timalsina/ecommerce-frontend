import Link from "next/link";
import { YoutubeLogo, FacebookLogo, InstagramLogo, TiktokLogo } from '@/assets/svg';

export default function Footer() {

	return (
		<div className="w-full bg-black text-slate-200">
			<footer className="footer z-10 grid-cols-1 text-center md:text-left md:grid-cols-4 p-10 place-content-around">
				<div className="place-items-center mx-auto">
					<h1 className="w-full text-3xl">
						<Link href={'/'}>Ushopie</Link>
					</h1>
					<p>
						Hendrerit turpis id sed elementum erat. Cursus ultrices orci fermentum massa ut congue purus. Nulla nibh id laoreet magnis pellentesque odio. In.
					</p>
				</div>
				<nav className="mx-auto text-center md:text-left">
					<header className="footer-title w-full text-white opacity-100">Company Info</header>
					<a className="link link-hover w-full">About us</a>
					<a className="link link-hover w-full">Contact</a>
					<a className="link link-hover w-full">Blogs</a>
				</nav>
				<nav className="mx-auto text-center md:text-left">
					<header className="footer-title w-full text-white opacity-100">Main Menu</header>
					<Link href={'/'} className="link link-hover w-full">Home</Link>
					<Link href={'/'} className="link link-hover w-full">Search</Link>
					<Link href={'/Cart'} className="link link-hover w-full">Cart</Link>
				</nav>
				<nav className="m-auto text-center md:text-left">
					<header className="footer-title text-white w-full opacity-100">Connect with Us</header>
					<div className="grid grid-flow-col gap-2">
						<Link href="https://www.youtube.com" target="_blank"><YoutubeLogo /></Link>
						<Link href="https://www.facebook.com" target="_blank"><FacebookLogo /></Link>
						<Link href="https://www.instagram.com" target="_blank"><InstagramLogo /></Link>
						<Link href="https://www.tiktok.com" target="_blank"><TiktokLogo /></Link>
					</div>
				</nav>
			</footer>
			<footer className="rounded">
				<div className="flex flex-col-reverse md:flex-row text-center justify-between mx-10 py-5 border-t-2">
					<aside>
						<p>Copyright © 2023 - All right reserved</p>
					</aside>
					<nav className="grid grid-flow-col gap-4 mb-4">
						<a className="link link-hover">Terms & Condition</a>
						<a className="link link-hover">Privacy policy</a>
						<a className="link link-hover">Cookie policy</a>
					</nav>
				</div>
			</footer>
		</div>
	)
}