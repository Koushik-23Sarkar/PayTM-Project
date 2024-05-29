import axios from "axios";
import React, { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SendMoney = () => {
    const money = useRef();
    const navigate = useNavigate();
    const [user] = useSearchParams();
    const id = user.get("id");
    console.log(user.get("name"));

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{user.get("name")[0]}</span>
                    </div>

                    <h3 className="text-2xl font-semibold">{user.get("name")}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label htmlFor="Amount"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Amount (in Rs)
                    </label>
                    <input ref={money} type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"/>
                    </div>
                    <button onClick={ async ()=>{
                        console.log(money.current.value);
                        await axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to: id,
                            amount:money.current.value,
                        },{
                            headers:{
                                Authorization: "Bearer "+localStorage.getItem("token")
                            }
                        }).then(Responce =>{
                            if(Responce.data.message === "Transfer successful"){
                                navigate("/dashboard");
                            }
                    })
                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}
