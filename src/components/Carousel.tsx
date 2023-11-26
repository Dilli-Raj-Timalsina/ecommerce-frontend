import Image from "next/image"

export default function Carousel({ content }: { content: any }) {
	return (
		<div className="carousel rounded-3xl w-full">
			{Object(content)?.map((e: any, id: any) => {
				return (
					<div key={id} id={`slide${id}`} className="hidden md:carousel-item max-h-128 relative w-full">
						<figure className="w-full">
							<Image alt="carousel" src={e} width={1000} height={800} className="object-cover object-center" />
						</figure>
						<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
							<a href={`#slide${id === 0 ? content.length - 1 : id - 1}`} className="btn btn-circle">❮</a>
							<a href={`#slide${id === content.length - 1 ? 0 : id + 1}`} className="btn btn-circle">❯</a>
						</div>
					</div>
				)
			})}
			<div className="carousel md:hidden">
				{Object(content)?.map((e: any, id: any) => {
					return (
						<div key={id} className="carousel-item">
							<Image alt="carousel" src={e} width={400} height={800} className="object-cover" />
						</div>
					)
				})}
			</div>
		</div>)
}