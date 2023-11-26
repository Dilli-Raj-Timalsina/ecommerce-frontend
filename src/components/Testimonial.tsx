'use client';
import Image from "next/image";

export default function Testimonial({ image, date, name, description }: { image: any, date: Date, name: string, description: string }) {
	let displayDate = date.toDateString()
	return (
		<div className="card card-side rounded-md bg-gray-300 shadow-xl">
			<div className="pl-6 pt-8 w-40 lg:w-44">
				<p className="text-sm line-clamp-4 h-16">{description}</p>
				<p className="text-xs pt-4 font-semibold ">{name}</p>
				<p className="text-xs font-thin">{displayDate}</p>
			</div>
			<figure><Image height={400} width={800} src={image} alt="Album" className="object-cover h-44 w-28 lg:w-28" /></figure>
		</div >
	)
}