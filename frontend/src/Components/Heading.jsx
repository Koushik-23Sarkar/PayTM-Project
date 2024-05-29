import React from "react";

export default function Heading({labels}){
    return (
        <>
            <h1 className="pt-6 font-bold text-4xl">
                {labels}
            </h1>
        </>
    )
}