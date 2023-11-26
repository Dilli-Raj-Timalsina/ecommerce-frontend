'use client'
import { CartIcon } from "@/assets/svg";
import { useCartContext } from "@/context/CartContext";
import Link from "next/link";

export default function CartButton() {
	const { cart } = useCartContext();

	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn hover:bg-transparent btn-ghost btn-circle">
				<div className="indicator">
					<CartIcon />
					<span className="badge badge-sm indicator-item">{cart?.length || 0}</span>
				</div>
			</label>
			<div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
				<div className="card-body">
					<span className="font-bold text-lg">{cart?.length || 0} Items</span>
					<div className="card-actions">
						<Link href={'/Cart'} className="btn btn-primary btn-block">View cart</Link>
					</div>
				</div>
			</div>
		</div>
	)
}