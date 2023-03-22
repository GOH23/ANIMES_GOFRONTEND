import { CircularProgress, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "./axios.js";
import { CardAm } from './CardAm'
export function ThreeCards(props) {
    const [MainAnimes, SetAnimes] = useState([])

    useEffect(() => {
        SetAnimes(props.animes)
    }, [])
    const FilteringArrayOfAnimes = (a, b) => {
        var sum = 0;
        var sum2 = 0
        a.starsratings.map(el => {
            sum = sum + parseInt(el.star)
        })
        b.starsratings.map(el => {
            sum2 = sum2 + parseInt(el.star)
        })
        return sum2 / b.starsratings.length - sum / a.starsratings.length
    }

    const filter = MainAnimes.sort(FilteringArrayOfAnimes)

    return (<Grid container spacing={1} justifyContent="center">
        <CardAm items={filter.slice(0, 3)} />
    </Grid>)


}