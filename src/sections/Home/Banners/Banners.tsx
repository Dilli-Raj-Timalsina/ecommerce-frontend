
import styles from "./styles.module.css";
import Link from 'next/link'

export default function Banners() {
	return (
		<div className="lg:h-screen w-screen text-primary">
			<div className="grid grid-cols-2 lg:h-128 max-h-max">
				<div className="m-2 h-40 mr-1 pt-24 px-4 lg:m-10 lg:mr-5 lg:h-96 lg:pt-72 lg:pl-20 bg-red-800 bg-cover bg-center" style={{ backgroundImage: `url('/images/secondaryBanner.jpg')` }}>
					<Link href={'/shop-all'} className="btn px-6 lg:px-14 text-sm font-extralight rounded-3xl normal-case hover:bg-neutral hover:text-base-100">Shop</Link>
				</div>
				<div className="m-2 h-40 ml-1 pt-24 px-4 lg:m-10 lg:mr-5 lg:h-96 lg:pt-72 lg:pl-20 bg-purple-800 bg-cover bg-center" style={{ backgroundImage: `url('/images/secondaryBanner2.jpg')` }}>
					<Link href={'/shop-all'} className="btn px-6 lg:px-14 text-sm font-extralight rounded-3xl normal-case hover:bg-neutral hover:text-base-100">Shop</Link>
				</div>
			</div>
			<div className={`${styles.bannerContainer}`}>
				<div className={`${styles.bannerMarquee} h-20 lg:h-32 flex items-center`} >
					<p className="text-xl lg:text-5xl tracking-wide lg:tracking-widest w-full text-base-100">
						Flash Sale 100% Off <span className={`${styles.bannerText} text-transparent pl-4 lg:pl-32`}> Get Yours Now</span>
					</p>
					<p className="text-xl lg:text-5xl tracking-wide lg:tracking-widest w-full text-base-100">
						Flash Sale 100% Off <span className={`${styles.bannerText} text-transparent pl-4 lg:pl-32`}> Get Yours Now </span>
					</p>
				</div>
			</div>
		</div>
	)
}