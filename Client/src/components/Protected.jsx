import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";


const Protected = ({chilren})=>{
    const {userEmail} = UserAuth();
    if(!userEmail) {
        return<Navigate to="/"/>
    }
    return chilren
};


export default Protected;