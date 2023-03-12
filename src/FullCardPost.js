import { useParams } from 'react-router-dom'
import axios from './Components/axios.js'
import { Container, Row, Col, Carousel, Badge } from "react-bootstrap";

import { useEffect, useState } from 'react';
import { Paper, Skeleton, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FecthCardFullPost } from './Redux/Slices/CardFullPost.js';
import { StarRating } from './Components/CardComponent/StarRatibgForAnime/StarRating.js';
import { Commentsadd } from './Components/ForComments/Comentsadd.js';
import { StatusofAnime } from './Components/CardComponent/StatusOfAnime/StatusofAnime.js';

export function FullCardPost() {

    const dispatch = useDispatch();

    const [Series, SetSeries] = useState([]);
    const FullDesc = useSelector((state) => state.anime);
    const [value, setValue] = useState(0);
    const [DefaulSeries, SetDefaultSerie] = useState('');
    const { id } = useParams();
    useEffect(() => {

        axios.get('/series/' + id).then(responce => {

            responce.data.map((elem) => {
                return SetSeries(elem.Series)
            })
            SetDefaultSerie(responce.data[0].Series[0])

        })
        dispatch(FecthCardFullPost(id));// eslint-disable-next-line
    }, []) // eslint-disable-next-line

    function SetDefSerie(el) {
        SetDefaultSerie(el)
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log()
    return (
        <>

            <h1 className="text-center">{FullDesc.status === 'loading' ?
                <Skeleton />
                :
                FullDesc.data.title
            }</h1>
            <Container>
                <Paper sx={{ padding: 3 }} elevation={24} className='mb-2'>
                    <Row md={2} className="mx-auto justify-content-md-center">
                        <Col className='text-center'>
                            {FullDesc.status === 'loading' ?
                                <Skeleton variant="rectangular" width="100%" height='300px' />


                                :
                                <>
                                    <img
                                        src={FullDesc.data.imageFontUrl}
                                        alt="NameofAnime"
                                        className='rounded-2 mb-5'
                                    />
                                    <h4>Рейтинг</h4>
                                    <StarRating starrate={FullDesc.data.starsratings} className="mb-3" />
                                    <StatusofAnime />
                                </>

                            }


                        </Col>
                        <Col>
                            <h4 className="text-center">Описание</h4>
                            {FullDesc.status === 'loading' ?
                                <Skeleton height='450px' />
                                :
                                <p>{FullDesc.data.desc}</p>
                            }
                            <h4 className="text-center">Скрины</h4>
                            {FullDesc.status === 'loading' ?
                                <Skeleton height='450px' />
                                :

                                <Carousel controls={false} interval={1000} variant='dark'>
                                    {FullDesc.data.screensUrls.map((el, ind) => {
                                        return (<Carousel.Item key={ind}>
                                            <img

                                                className="d-block w-100"
                                                src={el}
                                                alt="Item"
                                            />
                                        </Carousel.Item>)
                                    })}
                                </Carousel>
                            }
                        </Col>

                    </Row>
                    {DefaulSeries !== '' ? <>
                        <Row>
                            <h4 className="text-center">Серии:</h4>
                            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="visible arrows tabs example">
                                {Series.map((el, ind) => {
                                    return (<Tab label={ind + 1 + " серия"} onClick={() => SetDefSerie(el)} key={ind}></Tab>)
                                })}
                            </Tabs>
                        </Row>
                        <Row>

                            <iframe title='Anime Player' src={DefaulSeries} width="640" height="710" frameBorder="0" allowFullScreen={true}></iframe>
                        </Row>
                    </>: <h4 className="text-center">Серии не загружены</h4>}

                </Paper>

                <Commentsadd />
            </Container>
        </>)
}