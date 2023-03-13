import { Box, Button, Container, Grid, InputBase } from '@mui/material'
import { CardAm } from './Components/CardAm.js'
import axios from './Components/axios'
import { useEffect, useState } from 'react'

export function AnimesList() {
    const [MainAnimes, SetAnimes] = useState([])
    const [FilterAnimes, SetFilterAnimes] =useState([])
    useEffect(() => {
        axios.get('/animes').then(responce => {
            SetAnimes(responce.data)
            SetFilterAnimes(responce.data)
        })
    }, [])

    return (
        <Container sx={{minHeight: '100vh'}}>
            <Box  sx={{ backgroundColor: 'white',height: 'auto',padding: 2,marginBottom: 2,border: 1,borderColor: 'gray',borderRadius: 3 }}>
                <InputBase placeholder='Поиск' className='border border-primary rounded' onChange={(el)=>{
                    if(el.target.value.length===0){
                        SetFilterAnimes(MainAnimes)
                    }else{
                        const filter = MainAnimes.filter(it=>{
                            return it.title.toLowerCase().startsWith(el.target.value.toLowerCase())
                        })
                        SetFilterAnimes(filter)
                    }
                }} color='info' sx={{fontSize: 20,width: '100%', backgroundColor: 'aliceblue' }} />
                <Button  sx={{width: '100%',marginTop: 1}} variant='contained'>СБРОСИТЬ ВСЕ</Button>
            </Box>
            <Grid container spacing={1} justifyContent="center" alignContent="stretch">
                <CardAm items={FilterAnimes} />
            </Grid>
        </Container>
    )
}