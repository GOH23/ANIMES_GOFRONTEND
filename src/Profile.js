import { Avatar, Divider, Paper, Chip, CircularProgress, Alert } from "@mui/material";


import { Container, Row, Col } from "react-bootstrap";
import {  useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SettingofProfile } from "./Components/SettingsofProfile";
import { StatusS } from "./Components/StatusProfileAnime";
import { selectIsAuth } from "./Redux/Slices/Auth";

export function Profile() {
    const isAuth = useSelector(selectIsAuth)
    const data = useSelector((state) => state.auth)
    if(!isAuth){
        return <Navigate to='/'/>
    }
    if (data.status === 'loading') {
        return (<>
            <CircularProgress />
        </>)
    }
    
    else {

        return (<Container className="mx-auto">
            <Paper sx={{ padding: 3 }} elevation={24} className='d-flex justify-content-center'>
                <Row md={1}  >
                    <Col >
                        <Avatar sx={{ height: 80, width: 80 }} src={`https://animesgo.onrender.com${data.data.UserData.avatarUrl}`} />
                        <h5 className="text-center">
                            {data.data.UserData.fullName}
                        </h5>
                    </Col>

                </Row>
            </Paper>
            <Paper sx={{ padding: 3 }} elevation={24} className='mb-2 mx-auto'>
                <Row md={1} xs={1}>
                    <Col className="text-center">
                        <Divider>
                            <Chip label='Описание профиля' className="fs-5 mb-2" />
                        </Divider>
                        <Alert severity='error'>Данной функции пока что нету</Alert>
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
                                <StatusS animes={data.data.UserData.optionsofanime.filter(item =>item.status ==='СМОТРЮ' )}/>
                            </Col>
                            <Col>
                                <Divider>
                                    <Chip label='ПРОСМОТРЕНО' className=" mb-2" />
                                </Divider>
                                <StatusS animes={data.data.UserData.optionsofanime.filter(item =>item.status ==='ПРОСМОТРЕНО' )}/>
                            </Col>
                            <Col>
                                <Divider>
                                    <Chip label='ПЕРЕСМАТРИВАЮ' className=" mb-2" />
                                </Divider>
                                <StatusS animes={data.data.UserData.optionsofanime.filter(item =>item.status ==='ПЕРЕСМАТРИВАЮ' )}/>
                            </Col>
                            <Col>
                                <Divider>
                                    <Chip label='БРОШЕНО' className=" mb-2" />
                                </Divider>
                                <StatusS animes={data.data.UserData.optionsofanime.filter(item =>item.status ==='БРОШЕНО' )}/>
                            </Col>
                            <Col>
                                <Divider>
                                    <Chip label='ОТЛОЖЕНО' className=" mb-2" />
                                </Divider>
                                <StatusS animes={data.data.UserData.optionsofanime.filter(item =>item.status ==='ОТЛОЖЕНО' )}/>
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
                        <SettingofProfile/>
                    </Col>
                </Row>
            </Paper>
        </Container>)
    }

}