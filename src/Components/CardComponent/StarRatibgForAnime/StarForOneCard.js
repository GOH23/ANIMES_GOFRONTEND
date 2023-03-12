import { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import { blue } from "@mui/material/colors";
export function StarForOneCard(props){
    const Color= blue[500]
    var Ratin = 0.0
    const [Rate, SetRating] = useState(0.0)
    useEffect(()=>{
        props.starrate.map((el) => {
            return Ratin = Ratin+ parseInt(el.star)
        })
        SetRating(Ratin)
    },[])
    return(<>
        {Number(Rate/props.starrate.length).toFixed(2)} <AiFillStar color={Color}/>
    </>)
}