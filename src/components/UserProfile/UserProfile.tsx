'use client'

import Link from "next/link";
import Image from "next/image";
// import { useSession } from "next-auth/react";
import SignoutButton from "@/components/SignoutButton";
import { ProfileIcon } from '@/assets/svg';
import { useAuthContext } from "@/context/AuthContext";

export default function UserProfile() {
	// const { data } = useSession()
	const { user } = useAuthContext()

	return (
		<>
			{user ?
				<div className="dropdown dropdown-end">
					<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							<Image src={user?.image || "/images/carousel3.jpg"} alt="Profile" width={40} height={40} />
						</div>
					</label>
					<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
						<li>
							<a className="justify-between">
								Profile
								<span className="badge">New</span>
							</a>
						</li>
						<li><a>Settings</a></li>
						<li><SignoutButton /></li>
					</ul>
				</div>
				:
				<ul className="hidden md:menu menu-horizontal">
					<li><Link href={"/login"} className="hover:bg-transparent focus:bg-transparent">
						<ProfileIcon />
						Log In
					</Link></li>
				</ul>
			}
		</>
	)
}