'use client';
import { useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { CartIcon } from "@/assets/svg";
import ProductCard from "@/components/ProductCard/ProductCard";
import ToggleDetail from "@/components/ToggleDetail.tsx/ToggleDetail";
import { useCartContext } from '@/context/CartContext'

const productInfo = [{
	name: 'Return & Refund Policy',
	details: 'I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.'
}, {
	name: 'Shipping Info',
	details: "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence."
}
]

const imageProps = { width: 400, height: 250, zoomWidth: 500 };

export default function ProductDetails({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
	const imgRef = useRef(null)

	const { addItemToCart } = useCartContext()

	const addToCartHandler = (id: any) => {
		addItemToCart(id)
	}

	const setPreviewImage = (url: string) => {
		// imgRef.current.src = url
		console.log(url)
	}

	return (
		<div>
			<div className="mx-20">
				<div className="text-sm breadcrumbs my-8">
					<ul>
						<li><Link href={`/`}>Home</Link></li>
						<li><Link href={`/${product?.category}`}>{product?.category}</Link></li>
						<li>{product?.title}</li>
					</ul>
				</div>
				<div className="grid grid-flow-col grid-cols-2">
					<div>
						<div className="image-section flex">
							{/* <div className="subImages flex flex-col justify-between pr-4">
								{subImages?.map((e, i) => {
									return (
										<div key={i} className="" onClick={() => { setPreviewImage(product?.thumbNail) }}>
											<Image src={product?.thumbNail} alt="Product SubImages" width={120} height={120} className="object-cover h-16 w-24" />
										</div>
									)
								})}
							</div> */}
							<div>
								{/* eslint-disable @next/next/no-img-element */}
								<Image ref={imgRef} alt='Product Image' src={product?.thumbNail} width={imageProps.width} height={imageProps.height} />
							</div>
						</div>
						<p className="pb-10 w-128 lg:pb-6 pt-8 text-sm lg:text-base">
							{product?.description}
						</p>
					</div>
					<div className="details-section px-10">
						<p className="text-2xl lg:text-3xl font-semibold max-w-md line-clamp-1">{product?.title}</p>
						<p className="pt-8 pb-14 lg:py-6 text-sm lg:text-xl font-medium">${product?.price}</p>
						<p className="pb-10 w-96 lg:pb-6 text-sm lg:text-base">{product?.subTitle}</p>
						<div>
							<span className="px-2 text-base-100 bg-secondary border border-secondary">-</span>
							<span className="px-4 border border-secondary">2</span>
							<span className="px-1 text-base-100 bg-secondary border border-secondary">+</span>
						</div>
						<div className="flex w-full justify-between my-10">
							<button onClick={() => { addToCartHandler(product?.id) }} className="flex btn w-56 border-solid justify-between border-secondary bg-primary text-secondary hover:opacity-80 hover:bg-primary hover:border-secondary">
								<span className="text-xs">
									Add To Cart
								</span>
								<CartIcon />
							</button>
							<button onClick={() => { addToCartHandler(product?.id) }} className="flex btn w-56 text-xs justify-center border-none bg-secondary text-base-100 hover:bg-neutral">
								Confirm Order
							</button>
						</div>
						<div className="">
							{productInfo?.map((e, i) => {
								return (
									<div key={i}>
										<ToggleDetail name={e.name} details={e.details} />
									</div>
								)
							})}
						</div>
					</div>
				</div>
				<div>
					<h3 className="text-secondary text-4xl mt-24">
						<span className="pl-2 pr-3 bg-secondary rounded-lg mr-2"></span> Related Items
					</h3>
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-2 py-10 w-full">
						{relatedProducts && Object(relatedProducts)?.map((product: any, i: any) => {
							return (
								<div key={i} className="m-auto w-80">
									<ProductCard product={product} category={product?.category} />
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}