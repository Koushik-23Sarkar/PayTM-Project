import React from "react";

export default function InputBox({label , placeholder , onChange}){
    return (
        <div>
            <h1 className="text-sm font-medium text-left py-2">{label}</h1>
            <input onChange={onChange}  placeholder={placeholder} className="w-full border border-slate-400 px-2 py-1 rounded" />
        </div>
    )
}