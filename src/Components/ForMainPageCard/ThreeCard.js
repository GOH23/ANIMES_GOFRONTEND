import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../axios";
import {CardAm} from '../CardComponent/CardAm'
export function ThreeCards() {
    const [MainAnimes, SetAnimes] = useState([])
    const [FilterAnimes, SetFilterAnimes] =useState([])
    useEffect(() => {
        axios.get('/animes').then(responce => {
            SetAnimes(responce.data)
            SetFilterAnimes(responce.data)
        })
    },[])
    const FilteringArrayOfAnimes =(a,b)=>{
        var sum = 0;
        var sum2 =0
        a.starsratings.map(el=>{
            sum=sum+parseInt(el.star)
        })
        b.starsratings.map(el=>{
            sum2=sum2+parseInt(el.star)
        })
        return sum2/b.starsratings.length - sum/a.starsratings.length
    }
    const filter = MainAnimes.sort(FilteringArrayOfAnimes)
    return (<Grid container spacing={1} justifyContent="center">
        <CardAm items={filter.slice(0,3)}/>
    </Grid>)
}