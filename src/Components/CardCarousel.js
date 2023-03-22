import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { StarForOneCard } from './StarForOneCard';
import { Box } from "@mui/system";

import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
export function CardsCarousel(props) {
    const [MainAnimes, SetAnimes] = useState([])

    useEffect(() => {

        SetAnimes(props.animes)


    }, [])
    var slider = useRef();

    const next = () => {
        slider.slickNext();
    };
    const previous = () => {
        slider.slickPrev();
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,

        arrows: false,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,

            }
        },
        {
            breakpoint: 750,
            settings: {
                slidesToShow: 1,
                fade: true ,
                slidesToScroll: 1,
            }
        }]
    };
    function compareNumbers(a, b) {
        return new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime();
      }
    const filter = MainAnimes.sort(compareNumbers)
    
    return (
        <Paper elevation={0} sx={{ marginBottom: '50px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 2 }}>
                <Typography sx={{ fontSize: '20pt', float: 'left', marginRight: 1 }}>Последние обновления аниме</Typography>
                <div>
                    <Button sx={{ marginRight: 1 }} onClick={previous} variant='contained'><AiOutlineLeft /></Button>
                    <Button onClick={next} variant='contained'><AiOutlineRight /></Button>
                </div>

            </Box>
            <Slider ref={c => (slider = c)} {...settings} className="mb-2">
                {filter.map((el, ind) => {
                    return (<div key={ind}>
                        <Card sx={{ maxWidth: 300, minWidth: 300}} className='mri'>
                            <Link to={`/anime/${el._id}`} className='text-decoration-none'>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={el.imageFontUrl}
                                        alt='Rfhnbyrf' />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" sx={{ display: '-webkit-box', WebkitLineClamp: 2, overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', height: '65px' }} component="div" className='mb-0 text-dark text-center '>
                                            {el.title} <br />
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div" className='mb-0 text-dark text-end'>
                                            <StarForOneCard starrate={el.starsratings} />
                                        </Typography>
                                    </CardContent>

                                </CardActionArea>
                            </Link>
                        </Card>
                    </div>
                    )
                })}
            </Slider>


        </Paper>
    )
}