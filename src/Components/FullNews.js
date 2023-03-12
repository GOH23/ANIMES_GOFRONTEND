import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "./axios.js";
import { New } from "./New";
export function FullNews(){
    const [NewData,SetNewsData]=useState([])
    useEffect(()=>{
        axios.get('/news').then(el=>{
            SetNewsData(el.data)
        })
    },[])
    return(<Paper data-color-mode='light' sx={{padding: 3,margin:3}}>
        {NewData.map((el,ind)=>{
            return(<New newdata={el} key={ind}/>)
        })}
    </Paper>)
}