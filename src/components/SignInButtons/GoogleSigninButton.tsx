'use client'
import React from 'react';
import { signIn } from 'next-auth/react';
import { GoogleIcon } from '@/assets/svg'

const GoogleSigninButton = () => {
	const loginWithGoogle = () => signIn('google', { callbackUrl: '/' })

	return (
		<button onClick={() => { loginWithGoogle() }} className="flex-1 btn border-solid border-black">
			<GoogleIcon />
			Google
		</button>
	)
}

export default GoogleSigninButton