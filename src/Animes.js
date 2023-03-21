import { Box, Button, CircularProgress, Container, Grid, InputBase, Paper, Typography } from '@mui/material'
import { CardAm } from './Components/CardAm.js'
import axios from './Components/axios'
import { useEffect, useState } from 'react'
import { TextField, Autocomplete, Slider } from "@mui/material";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation } from 'react-router-dom';


export function AnimesList(props) {
    const [MainAnimes, SetAnimes] = useState([])
    const [FilterAnimes, SetFilterAnimes] = useState([])
    const [Search, SetSearchText] = useState('')
    const [Chanrs, SetChanrs] = useState([])
    const [FilterOpenAndClose, SetFilterOpenAndClose] = useState(false)
    const location = useLocation();
    const data = location.state?.data;
    useEffect(() => {
        axios.get('/animes').then(responce => {
            SetAnimes(responce.data)
            SetFilterAnimes(responce.data)

        })
        console.log(data)
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
    const [value, setValue] = useState([1970, 1970]);

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);

    };
    if(MainAnimes.length == 0){
        return(<Container className="container_main" fluid>
        <Paper sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Paper>

    </Container>)
    }
    else{
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
                    <Typography sx={{ fontSize: 20, cursor: 'pointer', userSelect: 'none', marginTop: 1 }} onClick={() => SetFilterOpenAndClose(!FilterOpenAndClose)}>Фильтры{!FilterOpenAndClose ? <AiFillCaretUp /> : <AiFillCaretDown />}</Typography>
                    {FilterOpenAndClose ? <>
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
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <FormControl sx={{ marginTop: 1, width: '100%' }} disabled>
                                    <InputLabel id="demo-simple-select-autowidth-label">По стране</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        autoWidth
                                        label="Age"
                                    >
                                        <MenuItem value={10}>Twenty</MenuItem>
                                        <MenuItem value={21}>Twenty one</MenuItem>
                                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ marginTop: 1, width: '100%' }} disabled>
                                    <InputLabel id="demo-simple-select-autowidth-label">По студии</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        autoWidth
                                        label="Age"
                                    >
                                        <MenuItem value={10} >Twenty</MenuItem>
                                        <MenuItem value={21}>Twenty one</MenuItem>
                                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Typography>По году добавления</Typography>
                        <Slider
    
                            value={value}
                            min={1970}
                            max={2022}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                        />
                        <Button sx={{ width: '100%', marginTop: 1 }} variant='contained' onClick={() => ResetFilters()}>СБРОСИТЬ ВСЕ</Button>
                    </> : null}
    
    
    
                </Box>
                <Grid container direction='row' spacing={2} justifyContent="center" >
                    <CardAm items={FilterAnimes} />
                </Grid>
            </Container>
        )
    }
    
}