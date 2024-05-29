import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export const Appbar = ({label}) => {
    const Navigate = useNavigate();
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                <Button onClick={()=>{
                    localStorage.removeItem("token")
                    Navigate("/signin");
                }} label={"Logout"}/>
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {label}
                </div>
            </div>
        </div>
    </div>
}