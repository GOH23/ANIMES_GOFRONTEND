import { Link, useParams } from 'react-router-dom'
import axios from './Components/axios'
import { Container, Row, Col, Carousel, Badge } from "react-bootstrap";

import { useEffect, useState } from 'react';
import { Chip, Paper, Skeleton, Tab, Tabs, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FecthCardFullPost } from './Redux/Slices/CardFullPost.js';
import { StarRating } from './Components/StarRating.js';
import { Commentsadd } from './Components/Comentsadd.js';
import { StatusofAnime } from './Components/StatusofAnime.js';
import { AiFillCheckCircle } from 'react-icons/ai';

export function FullCardPost() {

    const dispatch = useDispatch();
    const styles = 'fs-4 mb-0 text-center'
    const [Series, SetSeries] = useState([]);
    const FullDesc = useSelector((state) => state.anime);
    const [value, setValue] = useState(0);
    const [DefaulSeries, SetDefaultSerie] = useState('');
    const { id } = useParams();
    useEffect(() => {

        axios.get('/series/' + id).then(responce => {
            try {
                responce.data.map((elem) => {
                    return SetSeries(elem.Series)
                })
                SetDefaultSerie(responce.data[0].Series[0])

            }
            catch {
                return;
            }
        })
        dispatch(FecthCardFullPost(id));// eslint-disable-next-line
    }, []) // eslint-disable-next-line

    function SetDefSerie(el) {
        SetDefaultSerie(el)
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>

            <p className="fs-1 text-center">{FullDesc.status === 'loading' ?
                <Skeleton />
                :
                FullDesc.data.title
            }</p>
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
                                        height='300'
                                        width='200'
                                        className='rounded-2 mb-5 '
                                    />
                                    <p className='fs-4 mb-0'>Рейтинг</p>
                                    <StarRating starrate={FullDesc.data.starsratings} className="mb-3" />
                                    <StatusofAnime />
                                    <Row>
                                        <Col>
                                            <p className={styles}>Теги</p>
                                            {FullDesc.data.tags.map((el,ind) => {
                                                return (<Link to='/animes' state = {{ data: el }} key={ind}>
                                                    <Chip label={el} color="success" icon={<AiFillCheckCircle/>} sx={{marginRight: 1,marginBottom: 1,cursor: 'pointer'}} />
                                                </Link>)
                                            })}

                                        </Col>
                                        <Col>
                                            <p className={styles}>Дата публикации аниме</p>
                                            <Typography sx={{fontSize: 20,marginTop: 1}}>{new Date(FullDesc.data.createdAt).toLocaleDateString()}</Typography>
                                        </Col>
                                    </Row>


                                </>

                            }


                        </Col>
                        <Col>
                            <p className={styles}>Описание</p>
                            {FullDesc.status === 'loading' ?
                                <Skeleton height='450px' />
                                :
                                <p>{FullDesc.data.desc}</p>
                            }
                            <p className='fs-4 mb-0 text-center'>Скрины</p>
                            {FullDesc.status === 'loading' ?
                                <Skeleton height='450px' />
                                :

                                <Carousel controls={false} interval={1000} variant='dark'>
                                    {FullDesc.data.screensUrls.map((el, ind) => {
                                        return (<Carousel.Item key={ind}>
                                            <img

                                                className="d-block w-100 rounded-2"
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
                            <p className={styles}>Серии:</p>
                            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="visible arrows tabs example">
                                {Series.map((el, ind) => {
                                    return (<Tab label={ind + 1 + " серия"} onClick={() => SetDefSerie(el)} key={ind}></Tab>)
                                })}
                            </Tabs>
                        </Row>
                        <Row>
                            <iframe title='Anime Player' src={DefaulSeries} width="640" height="710" frameBorder="0" allowFullScreen={true}></iframe>
                        </Row>
                    </> : <p className={styles}>Серии не загружены</p>}



                </Paper>

                <Commentsadd />
            </Container>
        </>)
}