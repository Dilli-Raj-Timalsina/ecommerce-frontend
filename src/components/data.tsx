import React, { useState } from "react";

interface AccordionData {
    question: string;
    answer: string;
}

const CourseFAQ: React.FC = () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
    };

    const accordionData: AccordionData[] = [
        {
            question: "we are offering only online courses.  ?",
            answer: "Welcome to Daraz.com.np also hereby known as  We are an online marketplace and these are the terms and conditions governing your access and use of Daraz along with its related sub-domains, sites, mobile app, services and tools  By using the Site, you hereby accept these terms and conditions ncluding the linked information herein and represent that you agree t",
        },
        {
            question: "we are offering only online courses.  ?",
            answer: "Welcome to Daraz.com.np also hereby known as  We are an online marketplace and these are the terms and conditions governing your access and use of Daraz along with its related sub-domains,",
        },
        {
            question: "we are offering only online courses.  ?",
            answer: "Welcome to Daraz.com.np also hereby known as  We are an online marketplace and these are the terms and conditions governing your access and use of Daraz along with its related sub-domains,",
        },
    ];

    return (
        <div className="max-w-md mx-auto">
            <div className="space-y-4">
                {accordionData.map((item, index) => (
                    <div
                        key={index}
                        className={` border-b rounded overflow-hidden `}
                    >
                        <button
                            className="flex items-center justify-between px-4 py-3 focus:outline-none"
                            onClick={() => toggleAccordion(index)}
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {item.question}
                                </h3>
                            </div>
                            <div>
                                <svg
                                    className={`w-5 h-5 text-gray-600 transition-transform ${
                                        activeAccordion === index
                                            ? "transform rotate-180"
                                            : ""
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>
                        {activeAccordion === index && (
                            <div className="px-4 py-3 bg-white">
                                <p className="text-gray-600">{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseFAQ;
