"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import BounceSpinners from "@/components/Spinners/BounceSpinner";

function VerifyOTP() {
    const [otp, setOtp] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [sucess, setSucess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const verifyOTP = async () => {
        setLoading(true);
        const res = await fetch(
            process.env.NEXT_PUBLIC_BACKEND! +
                process.env.NEXT_PUBLIC_VERIFYTOKEN,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp,
                    password,
                }),
            }
        );
        if (res.ok) {
            setMessage(`Password Changed Succesfully`);
            setSucess(true);
            setLoading(false);
            router.push("/login");
        } else {
            setMessage("OTP doeen't match !");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-md w-full px-4 py-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Verify OTP
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
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        New Password
                    </label>
                    <input
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="otp"
                    >
                        OTP
                    </label>
                    <input
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={handleOtpChange}
                    />
                </div>
                <button
                    className="w-full btn bg-secondary text-white py-2 px-4 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-indigo-600"
                    onClick={verifyOTP}
                    disabled={loading}
                >
                    {loading ? (
                        <BounceSpinners size={"w-4 h-4"} />
                    ) : (
                        "Verify OTP"
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

export default VerifyOTP;
