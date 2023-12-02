"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import BounceSpinners from "@/components/Spinners/BounceSpinner";

export default function Home() {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [sucess, setSucess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleResetPassword = async () => {
        setLoading(true);
        const res = await fetch(
            process.env.NEXT_PUBLIC_BACKEND! +
                process.env.NEXT_PUBLIC_FORGETPASSWORD,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            }
        );

        if (res.ok) {
            setMessage(`Password reset link sent to ${email}`);
            setSucess(true);
            setLoading(false);
            router.push("/forget-password/verify-otp");
        } else {
            setMessage("user doesnot exist , please provide correct email");
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-md w-full px-4 py-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Forget Password
                </h2>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <button
                    className="w-full btn bg-secondary  text-white py-2 px-4 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-indigo-600"
                    onClick={handleResetPassword}
                    disabled={loading}
                >
                    {loading ? (
                        <BounceSpinners size={"w-4 h-4"} />
                    ) : (
                        "Reset Password"
                    )}
                </button>
                {message && sucess && (
                    <p className="mt-4 text-sm text-green-500">{message}</p>
                )}
                {message && !sucess && (
                    <p className="mt-4 text-sm text-red-500">{message}</p>
                )}
            </div>
        </div>
    );
}
