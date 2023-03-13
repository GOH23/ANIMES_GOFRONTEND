import { Box, Button, Container, Grid, InputBase } from '@mui/material'
import { CardAm } from './Components/CardAm.js'
import axios from './Components/axios'
import { useEffect, useState } from 'react'
import { TextField, Autocomplete } from "@mui/material";
export function AnimesList() {
    const [MainAnimes, SetAnimes] = useState([])
    const [FilterAnimes, SetFilterAnimes] = useState([])
    const [Search, SetSearchText] = useState('')
    const [Chanrs, SetChanrs] = useState([])
    useEffect(() => {
        axios.get('/animes').then(responce => {
            SetAnimes(responce.data)
            SetFilterAnimes(responce.data)
        })
    }, [])

    const names = [
        "Комедия",
        "Сёнэн",
        "Сёдзё",
        "Романтика",
        "Гарем",
        "Экшн",
        "Идолы",
        "Меха",
        "Психологический",
        "Ужасы",
        "Триллер",
        "Суперсила",
        "Демоны",
        "Вампиры",
        "Сверхъестественное",
        "Мистика",
        "Магия",
        "Фэнтези",
        "Повседневность",

    ];
    const SetFilterOfAnime = (el) => {
        if (el.length == 0) {

            if (Search.length === 0) {
                SetSearchText('')
                SetChanrs([])
                return SetFilterAnimes(MainAnimes)

            }
            else {
                const filter = MainAnimes.filter(it => {
                    return it.title.toLowerCase().startsWith(Search.toLowerCase())
                })
                return SetFilterAnimes(filter)
            }
        } 
        if (Search.length === 0) {
            SetChanrs(el)
            const filter = MainAnimes.filter(it => {
                for (var i in el) {
                    return it.tags.includes(el[i])
                }
            })
            SetFilterAnimes(filter)
        }
        else {
            SetChanrs(el)
            const filter = MainAnimes.filter(it => {
                for (var i in el) {
                    return it.tags.includes(el[i])
                }
            })
            const filterForSearch = filter.filter(it => {
                return it.title.toLowerCase().startsWith(Search.toLowerCase())
            })
            SetFilterAnimes(filterForSearch)
        }

    }
    const ResetFilters = () => {
        
        SetSearchText('')
        SetChanrs([])
        SetFilterAnimes(MainAnimes)
    }
    return (
        <Container sx={{ minHeight: '100vh' }}>
            <Box sx={{ backgroundColor: 'white', height: 'auto', padding: 2, marginBottom: 2, border: 1, borderColor: 'gray', borderRadius: 3 }}>
                <InputBase placeholder='Поиск' className='border border-primary rounded' onChange={(el) => {
                    if (el.target.value.length === 0) {
                        SetFilterAnimes(FilterAnimes)
                        if (Chanrs.length === 0) {
                            SetSearchText('')
                            SetChanrs([])
                            return SetFilterAnimes(MainAnimes)
                        }
                        else {
                            const filterChanr = MainAnimes.filter(it => {
                                for (var i in Chanrs) {
                                    return it.tags.includes(Chanrs[i])
                                }
                            })
                            SetFilterAnimes(filterChanr)
                        }

                    } if (Chanrs.length === 0) {
                        const filter = MainAnimes.filter(it => {
                            return it.title.toLowerCase().startsWith(el.target.value.toLowerCase())
                        })
                        SetFilterAnimes(filter)
                    } 
                    else {
                        SetSearchText(el.target.value)
                        const filter = MainAnimes.filter(it => {
                            return it.title.toLowerCase().startsWith(el.target.value.toLowerCase())
                        })
                        const filterChanr = filter.filter(it => {
                            for (var i in Chanrs) {
                                return it.tags.includes(Chanrs[i])
                            }
                        })
                        SetFilterAnimes(filterChanr)
                    }
                }} color='info' sx={{ fontSize: 20, width: '100%', backgroundColor: 'aliceblue' }} />
                <Autocomplete
                    sx={{ marginTop: 2, width: '100%' }}
                    multiple
                    options={names}
                    getOptionLabel={(option) => option}
                    disableCloseOnSelect
                    onChange={(event, value) => SetFilterOfAnime(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Жанр"
                            placeholder="Напишите новый жанр(ы) или выберите его(их)"

                        />
                    )}
                />

                <Button sx={{ width: '100%', marginTop: 1 }} variant='contained' onClick={() => ResetFilters()}>СБРОСИТЬ ВСЕ</Button>
            </Box>
            <Grid container direction='row' spacing={2} justifyContent="center" >
                <CardAm items={FilterAnimes} />
            </Grid>
        </Container>
    )
}