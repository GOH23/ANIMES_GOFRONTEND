
import { AppBar, Avatar, Divider, Grid, Skeleton, Slide, useScrollTrigger } from "@mui/material";
import { Link } from "react-router-dom";
import { NavDropdown, Nav, Offcanvas, Navbar, Container, Badge } from "react-bootstrap";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../Redux/Slices/Auth";
function Header(props) {

  const isAuth = useSelector(selectIsAuth)
  const UserData = useSelector((state) => state.auth)
  const { window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  });
  const [ProfileInfo, SetProfileInfo] = useState(false)
  const dispatch = useDispatch();
  const OpenModal = () => {
    SetProfileInfo(true)
  }
  const CloseModal = () => {
    SetProfileInfo(false)
  }
  const QuitAccount = () => {
    if (window.confirm('Вы действительно хотите выйти из аккаунта?')) {
      dispatch(logout())
      localStorage.clear()
      SetProfileInfo(false)
      window.location.reload()
    }
  }

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      <AppBar position="sticky" sx={{ backgroundColor: '#f8f9fa' }}>
        <Navbar bg="light" expand='md'>
          <Container fluid>
            <Link to='/' className="navbar-brand"><h5>Animes<Badge bg="warning" text="dark">GO</Badge></h5></Link>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas

              style={{'zIndex': '9999'}}
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`} >
                  <h5>Animes<Badge bg="warning" text="dark">GO</Badge></h5>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to='/' className="nav-link text-center"><h5>Главная</h5></Link>
                  <Divider className="mb-2" />
                  <Link to='/animes' className="nav-link text-center" ><h5>Аниме-лист</h5></Link>
                  <Divider className="mb-2" />
                  {!isAuth ? <h5 className="mb-0"><NavDropdown
                    title="Форма авторизации"
                    className="mb-2 text-center "
                    id={`offcanvasNavbarDropdown-expand-md`}
                  >
                    <Link to='/reg' className="dropdown-item" role="button" tabIndex="0"><h5>Регистрация</h5></Link>
                    <Link to='/log' className="dropdown-item" role="button" tabIndex="0"><h5>Авторизация</h5></Link>
                  </NavDropdown></h5> :
                    <Grid display='flex' justifyContent='center'>
                      {UserData.status === 'loading' ?
                        <Skeleton variant="circular" width={40} height={40} />
                        : <>
                          <Avatar sx={{ width: 50, height: 50 }} src={`${UserData.data.UserData.avatarUrl}`} className="mb-2" onClick={OpenModal}></Avatar>
                          <Modal show={ProfileInfo} size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered onHide={CloseModal} >
                            <Modal.Header closeButton>
                              <Avatar sx={{ width: 80, height: 80 }} src={`${UserData.data.UserData.avatarUrl}`}></Avatar>
                              <Modal.Title >Ваш профиль: {UserData.data.UserData.fullName}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                              <h5 className="">Ваш уровень: [В разработке]</h5>
                              <h5>Ваша роль: {UserData.data.UserData.role}</h5>
                              <h5>Когда создан аккаунт: {new Date(UserData.data.UserData.createdAt).toLocaleString()}</h5>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="danger" onClick={QuitAccount}>
                                Выйти из аккаунта
                              </Button>
                              <Link to='/profile'>
                                <Button variant="primary" onClick={() => { CloseModal() }}>

                                  Открыть профиль

                                </Button>
                              </Link>
                            </Modal.Footer>
                          </Modal>
                        </>
                      }

                    </Grid>
                  }


                </Nav>

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </AppBar>
    </Slide>
  );
}

export default Header;
