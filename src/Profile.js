import { Avatar, Divider, Paper, Chip, CircularProgress, Alert, Box, Tooltip } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";


import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SettingofProfile } from "./Components/SettingsofProfile";
import { StatusS } from "./Components/StatusProfileAnime";
import { selectIsAuth } from "./Redux/Slices/Auth";

export function Profile() {
    const isAuth = useSelector(selectIsAuth)
    const data = useSelector((state) => state.auth)
    const [SetShowAvatarFullImage, SetShowAvatar] = useState(false)
    if (data.status === 'loading') {
        return (<>
            <CircularProgress />
        </>)
    }
    if (!isAuth) {
        return <Navigate to='/' />
    }
    else {

        return (<Container className="mx-auto mt-4">
            <Paper sx={{ padding: 3 }} elevation={24} className='d-flex justify-content-center'>
                <Row md={1}  >
                    <Col >
                        <Tooltip title='Показать полную аватарку' arrow>
                            <Box sx={{ cursor: 'zoom-in' }} onClick={() => SetShowAvatar(true)}>
                                <Avatar sx={{ height: 'auto', width: 150}} variant='rounded' src={`${data.data.UserData.avatarUrl}`} />
                                <h5 className="text-center">
                                    {data.data.UserData.fullName}
                                </h5>
                            </Box>
                        </Tooltip>

                        <Modal
                            size="lg"
                            centered
                            show={SetShowAvatarFullImage}
                        >
                            <Modal.Header>
                                <Modal.Title className="text-center">
                                    Посмотреть аватарку {data.data.UserData.fullName}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <img className="rounded-2 img-fluid" src={`${data.data.UserData.avatarUrl}`} />

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
                        <MDEditor.Markdown className="fs-5 mb-2" source={data.data.UserData.profileDesc} />
                    </Col>
                    <Col className="text-center">
                        <Divider>
                            <Chip label='Категории аниме' className="fs-5 mb-2" />
                        </Divider>
                        <Row md={5} xs={1}>
                            <Col>
                                <Divider>
                                    <Chip label='СМОТРЮ' className=" mb-2" />
                                </Divider>
                                <StatusS animes={data.data.UserData.optionsofanime.filter(item => item.status === 'СМОТРЮ')} />

                            </Col>
                            <Col>
                                <Divider>
                                    <Chip label='ПРОСМОТРЕНО' className=" mb-2" />
                                </Divider>
                                <StatusS animes={data.data.UserData.optionsofanime.filter(item => item.status === 'ПРОСМОТРЕНО')} />

                            </Col>
                            <Col>
                                <Divider>
                                    <Chip label='ПЕРЕСМАТРИВАЮ' className=" mb-2" />
                                </Divider>
                                <StatusS animes={data.data.UserData.optionsofanime.filter(item => item.status === 'ПЕРЕСМАТРИВАЮ')} />

                            </Col>
                            <Col>
                                <Divider>
                                    <Chip label='БРОШЕНО' className=" mb-2" />
                                </Divider>
                                <StatusS animes={data.data.UserData.optionsofanime.filter(item => item.status === 'БРОШЕНО')} />

                            </Col>
                            <Col>
                                <Divider>
                                    <Chip label='ОТЛОЖЕНО' className=" mb-2" />
                                </Divider>
                                <StatusS animes={data.data.UserData.optionsofanime.filter(item => item.status === 'ОТЛОЖЕНО')} />

                            </Col>
                        </Row>
                    </Col>
                    <Col className="text-center">
                        <Divider>
                            <Chip label='Последние комментарии' className="fs-5 mb-2" />
                        </Divider>
                        <Alert severity='error'>Данной функции пока что нету</Alert>
                    </Col>
                    <Col className="text-center  mt-2">
                        <Divider>
                            <Chip label='Друзья' className="fs-5 mb-2" />

                        </Divider>
                        <Alert severity='error'>Данной функции пока что нету</Alert>
                    </Col>
                    <Col className="text-center mt-2">
                        <Divider>
                            <Chip label='Настройки профиля' className="fs-5 mb-2" />
                        </Divider>
                        <SettingofProfile settData={data.data.UserData} />
                    </Col>
                </Row>
            </Paper>
        </Container>)
    }

}