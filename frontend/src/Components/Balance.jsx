import React from "react";
import { useState , useLayoutEffect } from "react";
import axios from "axios";

export default function  Balance({label}){

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {label}
        </div>
    </div>
}