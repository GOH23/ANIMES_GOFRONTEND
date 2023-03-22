import { Avatar, Divider, Paper, Chip, CircularProgress, Box, Tooltip, Alert } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { selectIsAuth } from "./Redux/Slices/Auth";
import { FecthIsOtherUser } from "./Redux/Slices/GetOtherUser";
import { StatusS } from "./Components/StatusProfileAnime";
export function ProfileCheck() {
    const isAuth = useSelector(selectIsAuth)
    const data = useSelector((state) => state.auth);
    const otherdata = useSelector((state) => state.otheruser);

    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(FecthIsOtherUser(id))

    }, [])
    const [SetShowAvatarFullImage, SetShowAvatar] = useState(false)
    if (data.status === 'loading' || otherdata.status === 'loading') {
        return (<Container className="container_main" fluid>
            <Paper sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Paper>

        </Container>)
    }
    if (!isAuth) {
        return <Navigate to='/' />
    }
    else {

        return (<Container className="mx-auto container_main mt-4" >
            <Paper sx={{ padding: 3 }} elevation={24} className='d-flex justify-content-center'>
                <Row md={1}  >
                    <Col >
                        <Tooltip title='Показать полную аватарку' arrow>
                            <Box sx={{ cursor: 'pointer' }} onClick={() => SetShowAvatar(true)}>
                                <Avatar sx={{ height: 100, width: 100 }} src={`${otherdata.data.avatarUrl}`} />
                                <h5 className="text-center">
                                    {otherdata.data.fullName}
                                </h5>
                            </Box>
                        </Tooltip>

                        <Modal
                            style={{ 'zIndex': '9999' }}
                            size="lg"
                            centered
                            show={SetShowAvatarFullImage}
                        >
                            <Modal.Header>
                                <Modal.Title className="text-center">
                                    Посмотреть аватарку {otherdata.data.fullName}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <img className="rounded-2 img-fluid" src={`${otherdata.data.avatarUrl}`} alt='Аватарка не загрузилась' />

                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="w-100" onClick={() => SetShowAvatar(false)}>Закрыть</Button>
                            </Modal.Footer>
                        </Modal>

                    </Col>

                </Row>
            </Paper>

            <Paper sx={{ padding: 3 }} elevation={24} className='mb-2 mx-auto'>
                <Row md={1} xs={1}>

                    <Col className="text-center" data-color-mode='light'>
                        <Divider>
                            <Chip label='Описание профиля' className="fs-5  mb-2" />
                        </Divider>
                        <MDEditor.Markdown className="fs-5 mb-2" source={otherdata.data.profileDesc} />
                    </Col>
                    {otherdata.data.isPrivacy
                        ? <>
                            <Alert severity="info">Данные профиля закрыты для просмотра другим пользователям</Alert>
                        </>
                        : <>
                            <Col className="text-center">
                                <Divider>
                                    <Chip label='Категории аниме' className="fs-5 mb-2" />
                                </Divider>
                                <Row md={5} xs={1}>
                                    <Col>
                                        <Divider>
                                            <Chip label='СМОТРЮ' className=" mb-2" />
                                        </Divider>
                                        <StatusS animes={otherdata.data.optionsofanime.filter(item => item.status === 'СМОТРЮ')} />
                                    </Col>
                                    <Col>
                                        <Divider>
                                            <Chip label='ПРОСМОТРЕНО' className=" mb-2" />
                                        </Divider>
                                        <StatusS animes={otherdata.data.optionsofanime.filter(item => item.status === 'ПРОСМОТРЕНО')} />
                                    </Col>
                                    <Col>
                                        <Divider>
                                            <Chip label='ПЕРЕСМАТРИВАЮ' className=" mb-2" />
                                        </Divider>
                                        <StatusS animes={otherdata.data.optionsofanime.filter(item => item.status === 'ПЕРЕСМАТРИВАЮ')} />
                                    </Col>
                                    <Col>
                                        <Divider>
                                            <Chip label='БРОШЕНО' className=" mb-2" />
                                        </Divider>
                                        <StatusS animes={otherdata.data.optionsofanime.filter(item => item.status === 'БРОШЕНО')} />
                                    </Col>
                                    <Col>
                                        <Divider>
                                            <Chip label='ОТЛОЖЕНО' className=" mb-2" />
                                        </Divider>
                                        <StatusS animes={otherdata.data.optionsofanime.filter(item => item.status === 'ОТЛОЖЕНО')} />
                                    </Col>
                                </Row>
                            </Col>
                        </>}
                </Row>
            </Paper>
        </Container>)
    }

}