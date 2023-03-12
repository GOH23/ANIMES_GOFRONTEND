import { Avatar, Paper, Popper, Fade, Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import MDEditor from "@uiw/react-md-editor";
import axios from "./axios.js";
import { useState } from "react";
import { BiMenu } from 'react-icons/bi'
import { useSelector } from "react-redux";

import { selectIsModer } from "../Redux/Slices/IsModerator";
export function ComentsById(props) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const isModer = useSelector(selectIsModer)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };
    const BlockComment = (id)=>{
        axios.post('/comment/block/'+id).then(res=>{
            window.location.reload()
        })
    }
    const DeleteComment = (id)=>{
        axios.post('/comment/delete/'+id).then(res=>{
            window.location.reload()
        })
    }
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'transition-popper' : undefined;

    return (<>
        {
            props.data.map((el) => {
                return (<Paper key={el._id} data-color-mode='light' sx={{ padding: 3, margin: 2 }} elevation={24}>
                    <div>
                        <Avatar src={`https://animesgo.onrender.com${el.user.avatarUrl}`} />
                        <p>{el.user.fullName}</p>

                    </div>

                    <Paper sx={{ padding: 3 }} elevation={2}>
                        <MDEditor.Markdown source={el.text} />
                    </Paper>
                    {isModer ? <>
                        <div className="text-end">
                            <BiMenu aria-describedby={id} color={grey[1000]} className='fs-1' onClick={handleClick} />
                        </div>
                        <Popper id={id} open={open} anchorEl={anchorEl} transition>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Box sx={{ border: 1, padding: 1, bgcolor: 'background.paper', display: "flex", flexDirection: 'column' }}>
                                        <Button variant="contained" sx={{marginBottom: 1}} onClick={()=>DeleteComment(el._id)}>Удалить</Button>
                                        <Button variant="contained" onClick={()=>BlockComment(el._id)}>Заблокировать</Button>
                                    </Box>
                                </Fade>
                            )}
                        </Popper>
                    </>
                        : null}

                </Paper>)
            })
        }
    </>)

}