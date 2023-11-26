'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import CategoryList from '../../../components/CategoryList/CategoryList';

const heroBanner = ['/images/coffee.jpg', '/images/banner2.jpg', '/images/add.jpg'];

export default function Hero() {
	const [curr, setCurr] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (curr === 2) {
				setCurr(0)
			} else {
				setCurr(curr + 1)
			}
		}, 5000)
		return () => { clearTimeout(timer) }
	})

	const bgImageStyle = {
		backgroundImage: `url(${heroBanner[curr]})`,
		backgoundPosition: 'center',
		backgroundSize: 'cover',
		height: '100%'
	}

	const goToNext = (currState: any) => {
		setCurr(currState)
	}

	return (
		<div className="hero w-full">
			<div className="flex flex-col md:flex-col w-full">
				<CategoryList />
				<div className="h-2/3-screen lg:h-4/5-screen" style={bgImageStyle}>
					<div className="flex flex-col justify-center bg-white h-2/3-screen lg:h-4/5-screen w-screen lg:w-3/5 px-8 lg:pl-36" style={{ background: `linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)` }}>
						<p className="pb-8 lg:pb-6 text-sm lg:text-base"><span className="bg-orange-600 px-4 py-1 text-base-100">Best Prices</span></p>
						<p className="text-4xl lg:text-5xl font-medium max-w-md" style={{ lineHeight: '1.25' }}>Incredible Prices on All Your Favorite Items</p>
						<p className="pt-8 pb-10 lg:py-6 text-sm lg:text-base">Get more for less on selected brands</p>
						<div>
							<Link href={`/ShopAll`} className="btn px-8 lg:px-14 text-sm font-extralight rounded-3xl normal-case bg-secondary text-base-100 border-0 hover:bg-black">Shop Now</Link>
						</div>
					</div>
					<div className="absolute flex -mt-16 justify-center w-full py-2 gap-2">
						{heroBanner.map((imageSlides, currState) => {
							return <span className="bg-base-100 p-2 rounded-3xl" key={currState} onClick={() => { goToNext(currState) }}></span>
						})}
					</div>
				</div>
			</div>
		</div>
	)
}