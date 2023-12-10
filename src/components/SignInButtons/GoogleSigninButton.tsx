"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/assets/svg";

const GoogleSigninButton = () => {
    const loginWithGoogle = () => signIn("google", { callbackUrl: "/" });

    return (
        <button
            onClick={() => {
                // loginWithGoogle();
            }}
            className="flex items-center gap-2 md:px-10 px-8 btn border border-gray-300"
        >
            <GoogleIcon />
            <span>Google</span>
        </button>
    );
};

export default GoogleSigninButton;
