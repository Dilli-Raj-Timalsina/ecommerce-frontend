'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowBottom } from "@/assets/svg";
import ProductCard from "@/components/ProductCard/ProductCard";
import CategoryList from '@/components/CategoryList/CategoryList';
import sortProduct from '@/components/sortProduct/sortProduct'

const sortBy = ['Sort By',
	'Newest',
	'Price (High to Low)',
	'Price (Low to High)',
	'Name (A-Z)',
	'Name (Z-A)'
]

export default function ProductsByCategory({ products, category }: { products: any[], category: string }) {
	const [displayProducts, setDisplayProducts] = useState<any[] | []>([])
	const [rateRange, setRateRange] = useState(0)
	const [sortType, setSortType] = useState(0)

	useEffect(() => {
		setDisplayProducts(products)
	}, [products])


	const sliderHandler = (e: any) => {
		setRateRange(e.target.value);
	}

	const displayRange = () => {
		let itemsToShow = products.filter((product) => { return product?.price <= rateRange })
		setDisplayProducts(itemsToShow)
	}

	const sortItems = (type: number) => {
		setSortType(type)
		sortProduct({ products: displayProducts, type })
	}

	return (
		<div className="">
			<CategoryList />
			<h1 className="text-secondary text-4xl text-center mt-10">
				{category === "shop-all" ? "Shop All" : products[0]?.category}
			</h1>
			<div className="dropdown dropdown-bottom dropdown-end w-full flex justify-end pr-20">
				<label tabIndex={0} className="btn m-1 w-56 font-medium justify-between border border-neutral hover:bg-base-100 pl-4 bg-base-100">
					{sortBy[sortType]} <ArrowBottom />
				</label>
				<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mr-20">
					{sortBy?.map((e, i) => {
						return (
							<li key={i} onClick={() => sortItems(i)}><a>{e}</a></li>
						)
					})}
				</ul>
			</div>
			<div className="w-full flex">
				{/* Filter */}
				<div className="w-1/5 px-10">
					<p className="pb-4 text-2xl font-extralight border-b">
						Filter by
					</p>
					<div className="">
						<details className="collapse collapse-plus base-200 mt-4">
							<summary className="collapse-title text-md font-thin pl-0">Category</summary>
							<div className="collapse-content pl-0">
								<ul className="text-sm font-thin">
									<li className="pb-2"><Link href={`/shop-all`}>Shop All</Link></li>
									<li className="pb-2"><Link href={`/clothes`}>Clothes</Link></li>
									<li className="pb-2"><Link href={`/groceries`}>Groceries</Link></li>
									<li className="pb-2"><Link href={`/puja-items`}>Puja Items</Link></li>
									<li className="pb-2"><Link href={`/utensils`}>Utensils</Link></li>
								</ul>
							</div>
						</details>
						<details className="collapse collapse-plus base-200 mt-4">
							<summary className="collapse-title text-md font-thin pl-0">Price</summary>
							<div className="collapse-content pl-0">
								<input type="range" onChange={sliderHandler} onMouseUp={displayRange} onTouchEnd={displayRange} min={0}
									max={Math.max(...products.map((product) => { return product?.price || 0 }))}
									value={rateRange} className="range range-neutral"
								/>
								<div className="flex justify-between">
									<span>0</span>{rateRange}<span>{Math.max(...products.map((product) => { return product?.price || 0 }))}</span>
								</div>
							</div>
						</details>
					</div>
				</div>

				<div className="w-4/5 px-2 grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
					{displayProducts && displayProducts?.map((product, i: number) => {
						return (
							<div key={i}>
								<ProductCard product={product} category={category} />
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}