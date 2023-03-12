import { AiFillStar } from 'react-icons/ai'
import { Alert, Grid, Skeleton } from '@mui/material';
import axios from './axios.js';
import { blue, grey } from '@mui/material/colors';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FecthStarsGet } from '../Redux/Slices/Star';
import { selectIsAuth } from '../Redux/Slices/Auth';
import { selectIsActivated } from '../Redux/Slices/IsActivated';

export function StarRating(props) {
    const StarRateAndId = props.starrate
    var Ratin = 0.0
    const isAuth = useSelector(selectIsAuth)
    const isActivated = useSelector(selectIsActivated)
    const [Rate, SetRating] = useState(0.0)
    const [Star1, SetColor1] = useState(grey[500]);
    const [Star2, SetColor2] = useState(grey[500]);
    const [Star3, SetColor3] = useState(grey[500]);
    const [Star4, SetColor4] = useState(grey[500]);
    const [Star5, SetColor5] = useState(grey[500]);
    const dispatch = useDispatch();
    const StarRatingUser = useSelector((state) => state.stars)
    const { id } = useParams();
    function handleClick(star) {
        // eslint-disable-next-line
        switch (star) {
            case 1:
                axios.post(`/staradd/${id}`, {
                    starRate: star
                })
                SetColor1(blue[500]);
                SetColor2(grey[500]);
                SetColor3(grey[500]);
                SetColor4(grey[500]);
                SetColor5(grey[500]);

                break;
            case 2:
                axios.post(`/staradd/${id}`, {
                    starRate: star
                })
                SetColor1(blue[500]);
                SetColor2(blue[500]);
                SetColor3(grey[500]);
                SetColor4(grey[500]);
                SetColor5(grey[500]);

                break;
            case 3:
                axios.post(`/staradd/${id}`, {
                    starRate: star
                })
                SetColor1(blue[500]);
                SetColor2(blue[500]);
                SetColor3(blue[500]);
                SetColor4(grey[500]);
                SetColor5(grey[500]);

                break;
            case 4:
                axios.post(`/staradd/${id}`, {
                    starRate: star
                })
                SetColor1(blue[500]);
                SetColor2(blue[500]);
                SetColor3(blue[500]);
                SetColor4(blue[500]);
                SetColor5(grey[500]);

                break;
            case 5:
                axios.post(`/staradd/${id}`, {
                    starRate: star
                })
                SetColor1(blue[500]);
                SetColor2(blue[500]);
                SetColor3(blue[500]);
                SetColor4(blue[500]);
                SetColor5(blue[500]);

                break;
        }
    }
    useEffect(() => {
        try {

            StarRateAndId.map((el) => {
                return Ratin = Ratin + parseInt(el.star)
                
            })
            dispatch(FecthStarsGet(id)).then((el) => {
                if (el.payload.star === '1') {
                    SetColor1(blue[500]);
                    SetColor2(grey[500]);
                    SetColor3(grey[500]);
                    SetColor4(grey[500]);
                    SetColor5(grey[500]);
                }
                else if (el.payload.star === '2') {
                    SetColor1(blue[500]);
                    SetColor2(blue[500]);
                    SetColor3(grey[500]);
                    SetColor4(grey[500]);
                    SetColor5(grey[500]);
                }
                else if (el.payload.star === '3') {
                    SetColor1(blue[500]);
                    SetColor2(blue[500]);
                    SetColor3(blue[500]);
                    SetColor4(grey[500]);
                    SetColor5(grey[500]);
                }
                else if (el.payload.star === '4') {
                    SetColor1(blue[500]);
                    SetColor2(blue[500]);
                    SetColor3(blue[500]);
                    SetColor4(blue[500]);
                    SetColor5(grey[500]);
                } else if (el.payload.star === '5') {
                    SetColor1(blue[500]);
                    SetColor2(blue[500]);
                    SetColor3(blue[500]);
                    SetColor4(blue[500]);
                    SetColor5(blue[500]);
                }
            })
            SetRating(Ratin)
        }
        catch {
            SetRating(0)
        }

    }, [])
    return (<>
        <h5>{Number(Rate / StarRateAndId.length).toFixed(2)}</h5>
        {!isAuth || !isActivated ? <Alert severity="warning">Чтобы поставить рейтинг нужно активировать аккаунт или войти в него</Alert> :
            <>
                <Grid container display='flex' flexDirection='row' justifyContent='center'>
                    {StarRatingUser.status === 'loading' ? <Skeleton width='100px' /> :
                        <>

                            <motion.div whileTap={{ scale: 1.5, rotate: 360 }} >
                                <Grid item>
                                    <AiFillStar className='fs-3' color={Star1} onClick={() => handleClick(1)} />
                                </Grid>
                            </motion.div>
                            <motion.div whileTap={{ scale: 1.5, rotate: 360 }} onClick={() => handleClick(2)}>
                                <Grid item>
                                    <AiFillStar className='fs-3' color={Star2} />
                                </Grid>
                            </motion.div >
                            <motion.div whileTap={{ scale: 1.5, rotate: 360 }} onClick={() => handleClick(3)}>
                                <Grid item>
                                    <AiFillStar className='fs-3' color={Star3} />
                                </Grid>
                            </motion.div>
                            <motion.div whileTap={{ scale: 1.5, rotate: 360 }} onClick={() => handleClick(4)}>
                                <Grid item>
                                    <AiFillStar className='fs-3' color={Star4} />
                                </Grid>
                            </motion.div>
                            <motion.div whileTap={{ scale: 1.5, rotate: 360 }} onClick={() => handleClick(5)}>
                                <Grid item>
                                    <AiFillStar className='fs-3' color={Star5} />
                                </Grid>
                            </motion.div>
                        </>
                    }


                </Grid>
            </>
        }

    </>)
}