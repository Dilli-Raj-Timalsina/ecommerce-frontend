import type { Config } from "tailwindcss";

const config: Config = {
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,DELETE,PATCH,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            spacing: {
                "100": "28rem",
                "128": "32rem",
                "132": "36rem",
                "156": "46rem",
                "4/5-screen": "80vh",
                "2/3-screen": "66vh",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                lightTheme: {
                    primary: "#ECE8FF",
                    secondary: "#8161d6",
                    accent: "#f5f5f5",
                    neutral: "#ab47bc",
                    "base-100": "#ffffff",
                    info: "#fcb96b",
                    success: "#23b893",
                    error: "#ea535a",
                    warning: "#f79926",
                },
            },
        ],
    },
};
export default config;
