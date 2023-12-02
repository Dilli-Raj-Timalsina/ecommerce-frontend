"use client";

import { useRouter } from "next/navigation";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import axios from "axios";
import { useModalContext } from "./ModalContext";

interface IAuthContext {
    user: any;
    setUser: Dispatch<SetStateAction<any>>;
    setError: (errMsg: string) => void;
    removeUser: () => void;
    registerUser: (formData: {
        name: string;
        email: string;
        password: string;
    }) => Promise<void>;
    loginUser: (formData: { email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { showModal } = useModalContext();
    const [user, setUser] = useState<any>(null);

    const router = useRouter();

    const setUserToState = () => {
        const userDataString = localStorage.getItem("user");
        const userData =
            userDataString !== null ? JSON.parse(userDataString) : null;

        setUser(userData);
    };

    const removeUser = async () => {
        localStorage.removeItem("user");
        setUserToState();
    };

    const setError = (errMsg: string) => {
        showModal(errMsg, "Error");
    };

    const registerUser = async (formData: {
        name: string;
        email: string;
        password: string;
    }) => {
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/user/signup`,
                formData
            );

            if (data?.status === "success") {
                showModal("Register Successful!!!", "Success");

                localStorage.setItem("user", JSON.stringify(data?.userProfile));
                setUserToState();

                router.push("/");
            } else {
                console.log(data);
            }
        } catch {
            setError("User Already Exist with Email !");
        }
    };

    const loginUser = async (formData: { email: string; password: string }) => {
        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/user/login`,
                formData
            );

            if (data?.status === "success") {
                showModal("Login Successful!!!", "Success");

                localStorage.setItem("user", JSON.stringify(data?.userProfile));
                setUserToState();

                router.push("/");
            } else {
                console.log(data);
            }
        } catch {
            setError("Incorrect Email or Password !");
        }
    };

    useEffect(() => {
        setUserToState();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setError,
                setUser,
                removeUser,
                registerUser,
                loginUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be within AuthContext");
    }

    return context;
};

export default AuthContext;
