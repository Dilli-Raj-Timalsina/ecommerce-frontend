'use client';
import Link from "next/link";
import Image from "next/image";
import { useCartContext } from "@/context/CartContext";

interface ProductInterface {
	image: string,
	id: string,
	title: string,
	description: string,
	price: Number,
	thumbNail: any
}

export default function ProductCard({ product, category }: { product: ProductInterface, category: string }) {

	const { addItemToCart } = useCartContext()

	const addToCartHandler = (id: any) => {
		addItemToCart(id)
	}

	let image = product?.thumbNail, id = product?.id, name = product?.title, price = product?.price

	return (
		<div className="card bg-base-100 text-neutral w-36 lg:w-56 border-secondary" style={{ borderWidth: '1px' }}>
			<Link href={`/${category}/${id}`} className="rounded-t-2xl overflow-hidden relative">
				{/* eslint-disable @next/next/no-img-element */}
				<Image src={image || '/images/coffee.jpg'} alt="product" height={200} width={400} className="object-cover h-32 lg:h-40" />
			</Link>
			<div className="card-body p-4 lg:p-8">
				<p className="line-clamp-1">{name}</p>
				<p className="line-clamp-1 font-semibold">${price.toString()}</p>
				<div className="card-actions justify-center lg:justify-end">
					<button onClick={() => { addToCartHandler(product?.id) }} className="btn hover:bg-neutral text-base-100 bg-secondary">Add To Cart</button>
				</div>
			</div>
		</div>
	)
}