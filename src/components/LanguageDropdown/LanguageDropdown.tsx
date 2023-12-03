"use client";
import React, { useState } from "react";
import { EnglandFlag, NepalFlag, ArrowBottom } from "@/assets/svg";

const languages = [
    { name: "Eng", logo: <EnglandFlag /> },
    { name: "Nep", logo: <NepalFlag /> },
];

const LanguageDropdown = () => {
    const [language, setLanguage] = useState(languages[0]);

    const selectLanguage = (lang: {
        name: string;
        logo: React.JSX.Element;
    }) => {
        setLanguage(lang);
    };

    return (
        <div className="dropdown pr-2 hidden md:flex">
            <label
                tabIndex={0}
                className="flex text-gray-700 hover:bg-transparent"
            >
                <div className="indicator">
                    <span className="pe-1">{language.logo}</span>
                    {language.name}
                    <ArrowBottom />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-32"
            >
                {languages.map((e, i) => {
                    return (
                        <li
                            onClick={() => {
                                selectLanguage(e);
                            }}
                            key={i}
                        >
                            <a>
                                {e.logo} {e.name}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default LanguageDropdown;
