'use client'
import React from 'react';
import { signOut } from 'next-auth/react';
import { useAuthContext } from "@/context/AuthContext";

const SignoutButton = () => {
	const { removeUser } = useAuthContext()
	const signUserOut = () => {
		removeUser();
		signOut({ callbackUrl: '/' });
	}

	return (
		<button onClick={() => { signUserOut() }} className="w-full ">
			Sign Out
		</button>
	)
}

export default SignoutButton