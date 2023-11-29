import React from "react";
type Size = {
    size: string;
};
const BounceSpinners = ({ size }: Size) => {
    return (
        <div className="flex  justify-center">
            <div className="relative py-1 inline-flex">
                <div
                    className={`${size} bg-white rounded-full animate-ping`}
                ></div>
                <div
                    className={`${size} bg-white rounded-full animate-ping mx-2 `}
                ></div>
                <div
                    className={`${size}  bg-white rounded-full animate-ping`}
                ></div>
            </div>
        </div>
    );
};

export default BounceSpinners;
