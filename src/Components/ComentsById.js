import { Avatar, Paper, Button, Grid, Typography, Divider, Alert } from "@mui/material";
import { grey } from "@mui/material/colors";
import MDEditor from "@uiw/react-md-editor";
import axios from "./axios.js";

import { BiMenu } from 'react-icons/bi'
import { useSelector } from "react-redux";

import { selectIsModer } from "../Redux/Slices/IsModerator";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
export function ComentsById(props) {


    const isModer = useSelector(selectIsModer)
    const { id } = useParams()
    const BlockComment = (id) => {
        axios.post('/comment/block/' + id).then(res => {
            window.location.reload()
        })
    }
    const DeleteComment = (id) => {
        axios.post('/comment/delete/' + id).then(res => {
            window.location.reload()
        })
    }


    return (<>
        {
            props.data.map((el) => {
                return (<Paper key={el._id} data-color-mode='light' sx={{ padding: 3, margin: 2 }} elevation={24}>
                    <Grid display='flex' alignItems='center'>
                        <Grid item sx={{ marginRight: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <OverlayTrigger
                                trigger={['click']}
                                placement="right"
                                containerPadding={20}
                                overlay={
                                    <Popover id="popover-positioned-right" className="blockpopover" >
                                        <Popover.Header className="text-center">
                                            <div className="d-flex align-items-center">
                                                <Avatar sx={{ height: 60, width: 60, marginRight: 1 }} src={`${el.user.avatarUrl}`} />
                                                <Typography variant="h6">{el.user.fullName}</Typography>
                                            </div>
                                        </Popover.Header>
                                        <Popover.Body>
                                            {!el.user.isPrivacy ? <>
                                                <Typography sx={{ fontSize: '14pt' }}>
                                                    Уровень рейтинга пользователя: [В разработке]
                                                </Typography>
                                                <Divider />
                                                <Typography sx={{ fontSize: '14pt' }}>
                                                    Роль пользователя: {el.user.role}
                                                </Typography>
                                                <Divider />
                                                <Typography sx={{ fontSize: '14pt' }}>
                                                    Когда создан аккаунт: {new Date(el.user.createdAt).toLocaleString()}
                                                </Typography>

                                                <Typography sx={{ fontSize: '14pt' }}>
                                                    Статус просмотра этого аниме: {el.user.optionsofanime.filter(el => {
                                                        return el.AnimeId == id
                                                    })[0].status}
                                                </Typography>
                                            </> : <>
                                                <Alert severity="info" sx={{marginBottom: 1}}>Пользователь скрыл свой профиль</Alert>
                                            </>}

                                            <Typography >
                                                <Link className="text-decoration-none" to={`/profile/${el.user.forCheckProfile}`}><Button sx={{ width: '100%',marginBottom: 1}} variant='contained' color="secondary">Открыть</Button></Link>
                                            </Typography>
                                        </Popover.Body>
                                    </Popover>
                                }>
                                <button className="border-0 d-flex mr-1 align-items-center backcolor">
                                    <Avatar sx={{ height: 60, width: 60, m: 1 }} src={`${el.user.avatarUrl}`} />
                                    <p className="fs-4 mb-0">{el.user.fullName}</p>
                                </button>
                            </OverlayTrigger>
                        </Grid>
                    </Grid>
                    <Paper sx={{ padding: 3 }} elevation={2}>
                        <MDEditor.Markdown className="fs-5" source={el.text} />
                    </Paper>
                    {isModer ? <>
                        <div className="text-end">
                            <OverlayTrigger trigger="click" placement="bottom" overlay={
                                <Popover id="popover-positioned-bottom">
                                    <Popover.Header as="h3" className="text-center">Меню коментария</Popover.Header>
                                    <Popover.Body>
                                        <Button className="w-100" variant="contained" sx={{ marginBottom: 1 }} onClick={() => DeleteComment(el._id)}>Удалить</Button>
                                        <Button className="w-100" variant="contained" onClick={() => BlockComment(el._id)}>Заблокировать</Button>
                                    </Popover.Body>
                                </Popover>
                            }>
                                <Button><BiMenu color={grey[1000]} className='fs-1' /></Button>
                            </OverlayTrigger>
                        </div>
                        <div>

                        </div>
                    </>
                        : null}

                </Paper>)
            })
        }
    </>)

}