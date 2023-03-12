import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { CardActionArea, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { StarForOneCard } from './StarForOneCard';

export function CardAm(props) {

    
    return (<>
        {props.items.map(el => (<Grid key={el._id} item><Card  sx={{ maxWidth: 290 }}>
            <Link to={`/anime/${el._id}`} className='text-decoration-none'>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="400"
                        image={el.imageFontUrl}
                        alt='Rfhnbyrf' />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className='mb-0 text-dark text-center'>
                            {el.title} <br/>
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div" className='mb-0 text-dark text-end'>
                            <StarForOneCard starrate={el.starsratings}/>
                        </Typography>
                    </CardContent>
                    
                </CardActionArea>
            </Link>

        </Card></Grid>))}
    </>)

}