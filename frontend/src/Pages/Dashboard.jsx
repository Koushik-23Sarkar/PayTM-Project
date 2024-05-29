import { useEffect } from "react";
import React, { useState } from "react";
import { Appbar } from "../Components/Appbar";
import  Balance from "../Components/Balance";
import { Users } from "../Components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
  const [moneyValue , setMoneyValue]  = useState(0);
  const [userIcon , setUserIcon] = useState("");
  const navigate = useNavigate();

    //----------------------------------------------------
    useEffect(()=>{
        fetch("http://localhost:3000/me",{
          Method:"GET",
          headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
          }
        }).then(Response => {
          if(Response.status == 403){
            navigate("/Signin")
          }
        })
    },[])
    //---------------------------------------------------

  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/account/balance",{
      headers:{
          authorization: "Bearer "+localStorage.getItem("token")
      }
     }).then(Responce =>{
      console.log(Responce.data)
      setUserIcon(Responce.data.username[0]);
      setMoneyValue(Math.floor(Responce.data.balance))
     } )
  },[]);
  return (
    <div>
      <Appbar label={userIcon}/>
      <Balance label={moneyValue}/>
      <Users/>
    </div>
  );
};
