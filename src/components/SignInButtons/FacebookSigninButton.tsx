'use client'
import React from 'react';
import { signIn } from 'next-auth/react';
import { FacebookIcon } from '@/assets/svg';

const FacebookSigninButton = () => {
	const loginWithGoogle = () => signIn('facebook', { callbackUrl: '/' })

	return (
		<button onClick={() => { loginWithGoogle() }} className="flex-1 btn border-solid border-black">
			<FacebookIcon />
			Facebook
		</button>
	)
}

export default FacebookSigninButton