'use client'
import Link from "next/link"
import ProductCard from "../ProductCard/ProductCard"

export default function Category({ category, items }: { category: any, items: any[] }) {
	return (
		<div className="w-full text-white">
			<div className="flex px-10 w-full justify-between">
				<h1 className="text-black text-4xl">
					{category}
				</h1>
				<Link className="text-secondary underline text-sm cursor-pointer" href={`/${category}`}>View All</Link>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-5 gap-2 p-10 w-full">
				{items?.slice(0, 5).map((product: any, i: any) => {
					return (
						<div key={i} className="m-auto w-80">
							<ProductCard product={product} category={category} />
						</div>
					)
				})}
			</div>
		</div>
	)
}