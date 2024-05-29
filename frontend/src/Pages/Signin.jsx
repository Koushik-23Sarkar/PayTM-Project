import React, { useEffect , useState }  from "react";
import BottonWarning from "../Components/ButtonWarning";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputBox from "../Components/Inputbox";
import SubHeading from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = ()=>{
    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

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

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading labels={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e)=>setEmail(e.target.value)} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={(e)=>setPassword(e.target.value)} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async ()=>{
            const Responce = await axios.post("http://localhost:3000/api/v1/user/signin",{
              username:email,
              password:password,
            })
           
            if(Responce.data.token){
              localStorage.setItem("token",Responce.data.token)
              navigate("/dashboard")
            }else{
              alert("Wrong Input");
            }
          }
          } label={"Sign in"} />
        </div>
        <BottonWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}