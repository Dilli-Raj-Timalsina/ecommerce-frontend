"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import FacebookSigninButton from "@/components/SignInButtons/FacebookSigninButton";
import GoogleSigninButton from "@/components/SignInButtons/GoogleSigninButton";

// TODO: Frontend verification
export default function LoginPage() {
	const { setError, loginUser } = useAuthContext()
	const initialState = {
		email: "",
		password: "",
	};
	const [formData, setFormData] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const formDataHandler = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

	function validateEmail(email: string) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function validatePassword(name: string) {
		var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		return re.test(name);
	}
	const submitHandler = (e: any) => {
		e.preventDefault()
		setLoading(true)
		if (!validatePassword(formData.password)) {
			setError("Password should have at least 8 characters, 1 number & 1 special character")
			setLoading(false)
			return
		}
		if (!validateEmail(formData.email)) {
			setError("Enter a valid email")
			setLoading(false)
			return
		}

		loginUser(formData)
		setLoading(false)
	};

	return (
		<div>
			<div className="mt-2 bg-primary border-t border-secondary"></div>
			<div className="hero flex">
				<div className="hero-content w-full md:w-2/5 px-16 flex-col">
					<h1 className="text-secondary w-full text-3xl">
						Welcome To Ushopie!<br /> Please Login
					</h1>
					<p className="text-xs w-full text-left">New Member? Register <Link className="text-secondary" href={'/register'}> here...</Link></p>
					<form onSubmit={submitHandler} className="w-full">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input id="js__email" type="email" name="email" placeholder="email" onChange={formDataHandler} className="input input-bordered" required />
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input id="password" type="password" name="password" placeholder="password" onChange={formDataHandler} className="input input-bordered" required />
							<label className="label">
								<Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
							</label>
						</div>
						<div className="form-control mt-6">
							<button disabled={loading} type="submit" className="btn btn-primary hover:bg-neutral bg-secondary text-base-100">Login</button>
						</div>
					</form>
					<p>or login with</p>
					<div className="flex w-full pb-8 gap-4">
						<GoogleSigninButton />
						<FacebookSigninButton />
					</div>
				</div>
				<div className="absolute h-4/5 md:h-full md:relative md:w-3/5">
					<Image src="/images/login.png" height={1500} width={1000} className="h-full w-full object-cover object-center" alt="Login Image" />
				</div>
			</div>
		</div>
	)
}