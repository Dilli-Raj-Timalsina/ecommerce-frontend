"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { FacebookIcon } from "@/assets/svg";

const FacebookSigninButton = () => {
    const loginWithGoogle = () => signIn("facebook", { callbackUrl: "/" });

    return (
        <button
            onClick={() => {
                loginWithGoogle();
            }}
            className="flex items-center gap-2 md:px-6 px-4 btn border border-gray-300"
        >
            <FacebookIcon />
            <span>Facebook</span>
        </button>
    );
};

export default FacebookSigninButton;
