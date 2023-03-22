import { CircularProgress, Paper } from "@mui/material";
import { ThreeCards } from "./Components/ThreeCard";
import { News } from "./Components/NewsofSite";
import { CardsCarousel } from "./Components/CardCarousel";
import { useEffect, useState } from "react";
import axios from "./Components/axios.js";
import { Container } from "react-bootstrap";
export function MainPage() {
    const [Animes,SetAnimesList]= useState([])
    useEffect(() => {
        axios.get('/animes').then(responce => {
            SetAnimesList(responce.data)

        })
    },[])
    if(Animes.length==0){
        return (<Container className="container_main" fluid>
        <Paper sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Paper>

    </Container>)
    }
    return (<Paper sx={{minHeight: '100vh',p:1}}>
        <CardsCarousel animes={Animes}/>
        <News />
        <h3 className="text-center">Лучшие аниме по оценкам</h3>
        <ThreeCards animes={Animes}/>
        <h3 className="text-center">Топ по просмотрам пользователей</h3>
    </Paper>)

}