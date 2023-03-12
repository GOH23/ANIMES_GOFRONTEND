import { Box, Button, createTheme, Divider, responsiveFontSizes, ThemeProvider, Typography } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from '../axios';
import Carousel from 'react-bootstrap/Carousel';
import { GrFormNextLink } from 'react-icons/gr'
import { Link } from 'react-router-dom';
export function News() {
    const itemVariants = {
        initial: {
            opacity: 0,
            y: -100

        },
        anim: custom => ({ opacity: 1, y: 0, transition: { delay: custom * 0.25 } })
    };
    const blockVariants = {
        initial: {
            opacity: 0,


        },
        anim: custom => ({ opacity: 1, transition: { delay: custom * 0.25 } })
    };
    const [NewData,SetNewsData]=useState([])
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    useEffect(()=>{
        axios.get('/news').then(el=>{
            SetNewsData(el.data)
        })
    },[])
    return (<>
        <Carousel indicators={false}>
            {NewData.map(el=>{
                return(<Carousel.Item key={el._id}>
                    <img
                        className="d-block w-100"
                        src="https://catherineasquithgallery.com/uploads/posts/2021-03/1615816493_16-p-fon-anime-21.jpg"
                        alt="First slide"
                    />
    
                    <Carousel.Caption >
                        <motion.div variants={blockVariants} initial="initial" custom={1} whileInView="anim" viewport={{once: true}} >
                            <Box className='NewItemCarousel' sx={{
                                height: 'auto',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                borderRadius: 4,
                                padding: 2,
                                border: 2
                            }}>
    
                                <ThemeProvider theme={theme}>
                                    <motion.div variants={itemVariants} initial="initial" custom={2} whileInView="anim"  viewport={{once: true}} >
                                        <Typography variant='h5'>{el.title}</Typography>
                                    </motion.div>
                                    <motion.div variants={itemVariants} initial="initial" custom={3} whileInView="anim"  viewport={{once: true}}  >
                                        <Link to='/news'><Button variant='contained'>ПЕРЕЙТИ <GrFormNextLink/></Button></Link>
                                    </motion.div>
                                </ThemeProvider>
    
    
    
                            </Box>
                        </motion.div>
                    </Carousel.Caption>
                </Carousel.Item>)
            })}

        </Carousel>

    </>)

}