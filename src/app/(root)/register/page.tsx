"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuthContext } from '@/context/AuthContext'

// TODO: Frontend verification

export default function RegisterPage() {
	const { setError, registerUser } = useAuthContext()
	const [checked, setChecked] = useState(false);
	const [loading, setLoading] = useState(false);
	const initialState = {
		name: "",
		email: "",
		password: "",
		// promotions: 'unchecked',
	};
	const [formData, setFormData] = useState(initialState);
	const formDataHandler = (e: any) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const checkboxChange = (e: any) => {
		console.log(e.target.checked)
		// setFormData({ ...formData, promotions: e.target.checked ? 'checked' : 'unchecked' })
	}

	function validateEmail(email: string) {
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	function validateName(name: string) {
		var re = /^[a-zA-Z ]+$/;
		return re.test(name);
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
		if (!validateName(formData.name)) {
			setError("Name can only have alphabets and spaces")
			setLoading(false)
			return
		}
		if (!validateEmail(formData.email)) {
			setError("Enter a valid email")
			setLoading(false)
			return
		}

		registerUser(formData)
		setLoading(false)
		return
	};

	return (
		<div>
			<div className="mt-2 bg-primary border-t border-secondary"></div>
			<div className="hero flex">
				<div className="hero-content z-10 w-full md:w-2/5 px-16 flex-col">
					<h1 className="text-secondary w-full mt-5 text-2xl">
						Create Your Ushopie Account
					</h1>
					<p className="text-xs w-full text-left">Already have an account? Login <Link className="text-secondary" href={'/login'}> here...</Link></p>
					<form onSubmit={submitHandler} className="card-body p-0">
						<div className="form-control pb-2">
							<label className="label">
								<span className="label-text text-sm">Full Name</span>
							</label>
							<input id="js__name" type="text" name="name" placeholder="name" onChange={formDataHandler} className="input input-bordered h-10" required />
						</div>
						<div className="form-control pb-2">
							<label className="label">
								<span className="label-text text-sm">Email</span>
							</label>
							<input id="js__email" type="email" name="email" placeholder="email" onChange={formDataHandler} className="input input-bordered h-10" required />
						</div>
						<div className="form-control pb-2">
							<label className="label">
								<span className="label-text text-sm">Password</span>
							</label>
							<input id="password" type="password" name="password" placeholder="password" onChange={formDataHandler} className="input input-bordered h-10" required />
						</div>
						<div className="form-control">
							<label className="label cursor-pointer">
								<input name="promotions" onClick={() => { setChecked(checked === true ? false : true) }} onChange={checkboxChange} type="checkbox" checked={checked} className="checkbox mr-4" />
								<span className="label-text">I would like to receive exclusive offers and promotions.</span>
							</label>
						</div>
						<div className="form-control mt-6">
							<button disabled={loading} type="submit" className="btn bg-secondary hover:bg-neutral btn-primary mb-4 text-base-100">Sign Up</button>
						</div>
					</form>
				</div>
				<div className="absolute -z-10 h-4/5 md:h-full md:relative md:w-3/5">
					<Image src="/images/login.png" height={1500} width={1000} className="h-full w-full object-cover object-center" alt="Login Image" />
				</div>
			</div>
		</div>
	)
}