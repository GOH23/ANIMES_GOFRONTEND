import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "./axios.js"
import { grey } from "@mui/material/colors";

import { Link } from "react-router-dom";
export function StatusS(props) {
    const [AnimesFull, Set] = useState([])
    const data = []
    useEffect(() => {
        axios.get('/animes').then(responce => {
            Set(responce.data)
        })
    }, [])
    if(props.animes.length===0){
        return(null)
    }
    // eslint-disable-next-line
    props.animes.map((el)=>{
        data.push(AnimesFull.filter(item=>item._id===el.AnimeId)[0])
    })
    if(data[0]===undefined){
        return(<Skeleton>
            <ListItem>
                <ListItemAvatar>
                    <Avatar sx={{ width: 50, height: 70 }} variant="square"/>
                </ListItemAvatar>
                <ListItemText/>
            </ListItem>
        </Skeleton>)
    }
    return (<List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,

        '& ul': { padding: 0 },
    }}>
        {data.map((el, ind) => {
            return (<Link className="text-reset text-decoration-none" to={`/anime/${el._id}`}><ListItem key={ind} disablePadding sx={{border: 2,borderRadius: 2,borderColor: grey[300],marginBottom: 1}}>
                <ListItemAvatar>
                    <Avatar sx={{ width: 50, height: 70 }} variant="square" src={el.imageFontUrl}/>
                </ListItemAvatar>
                <ListItemText  primary={el.title} />
            </ListItem></Link>)
        })}
    </List>)
}
