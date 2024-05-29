import React, { useEffect, useState } from "react";
import BottonWarning from "../Components/ButtonWarning";
import Button from "../Components/Button";
import axios from "axios";
import InputBox from "../Components/Inputbox";
import SubHeading from "../Components/SubHeading";
import Heading from "../Components/Heading";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [firstName , setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email , setEmail] = useState("");
  const navigate =  useNavigate();

    //----------------------------------------------------
        //----------------------------------------------------
        useEffect(()=>{
          fetch("http://localhost:3000/me",{
            Method:"GET",
            headers:{
              Authorization:"Bearer "+localStorage.getItem("token")
            }
          }).then(Response => {
            if(Response.status == 200){
              navigate("/dashboard")
            }
          })
      },[])
      //---------------------------------------------------
    //----------------------------------------------------

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading labels={"Signup"}/>
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox onChange={(e)=>setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
          <InputBox onChange={(e)=>setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
          <InputBox onChange={(e)=>setEmail(e.target.value)} placeholder="harkirat@gmail.com" label={"Email"} />
          <InputBox onChange={(e)=>setPassword(e.target.value)} placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button onClick={ async ()=>{
              const Response  = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username:email,
                password:password,
                firstname:firstName,
                lastname:lastName,
              })
              localStorage.setItem("token",Response.data.token);
              navigate("/dashboard");
            }} label={"Sign up"} />
          </div>
          <BottonWarning
            label={"Don't have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );



}



