import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion'
import { CardActionArea, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { StarForOneCard } from './StarForOneCard';
export function CardAm(props) {
    const itemVariants = {
        initial: {
            opacity: 0,
            x: -100

        },
        anim: custom => ({ opacity: 1, x: 0, transition: {delay: 0.25}})
    };
    return (<>
        {props.items.map((el ,ind)=> (<Grid  key={el._id} item > 
            <motion.div variants={itemVariants} initial="initial" className='alignitems'   custom={ind} whileInView="anim" viewport={{once: true}} >
                <Card sx={{ maxWidth: 300,minWidth: 300 }} >
                    <Link to={`/anime/${el._id}`} className='text-decoration-none'>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="400"
                                image={el.imageFontUrl}
                                alt='Rfhnbyrf' />
                            <CardContent>
                                <Typography gutterBottom variant="h5" sx={{display: '-webkit-box',WebkitLineClamp: 2,overflow: 'hidden', textOverflow: 'ellipsis',WebkitBoxOrient: 'vertical',height: '65px'}} component="div" className='mb-0 text-dark text-center '>
                                    {el.title} <br />
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div" className='mb-0 text-dark text-end'>
                                    <StarForOneCard starrate={el.starsratings} />
                                </Typography>
                            </CardContent>

                        </CardActionArea>
                    </Link>

                </Card>
            </motion.div>
        </Grid>))}
    </>)

}