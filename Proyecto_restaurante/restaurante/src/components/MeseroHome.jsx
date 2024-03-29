import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import { useState } from "react";

function MeseroHome({user}){
    if(user!=="mesero" || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
  

    function goHome(){
        home("/");
    }

    async function handleSelect(event){
       
    }

    return (
        <div className="container">
           
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    )
}

export default MeseroHome;