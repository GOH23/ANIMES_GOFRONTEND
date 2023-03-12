import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FecthAuth, selectIsAuth } from '../../Redux/Slices/Auth'
export function LoginForm() {
    const [Email, SetEmail] = useState('');
    const [Password, SetPassword] = useState('');
    const [HelpTextEmail, SetHelpTextEmail] = useState('');
    const [EmailError, SetEmailError] = useState(false);
    const [HelpTextPass, SetHelpTextPass] = useState('');
    const [PassError, SetPassError] = useState(false);
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const VerifyEmail = (el) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(el)) {
            SetHelpTextEmail("")
            SetEmailError(false)
            SetEmail(el);
        } else {
            SetEmailError(true)
            SetHelpTextEmail("Неправильно введенный формат почты!")

        }
    }
    const VerifyPassword = (el) => {
        let re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
        if (re.test(el)) {
            SetHelpTextPass("")
            SetPassError(false)
            SetPassword(el);
        } else {
            SetPassError(true)
            SetHelpTextPass("пароль должен содержать 8 символов, один заглавный, один строчный, одну цифру и один символ особого регистра")

        }
    }
    const CheckLogin = async (Email, Password) => {
        if (Email === null || Password === null) {
            return
        }
        else {
            try {
                const data = await dispatch(FecthAuth({ email: Email, password: Password }))
                if (!data.payload) {
                    return alert('Ошибка в данных,попробуйте снова!')
                }
                if ('token' in data.payload) {
                    window.localStorage.setItem('token', data.payload.token)
                } else {
                    alert('Ошибка в данных,попробуйте снова!')
                }
            } catch {
                alert('Ошибка в данных,попробуйте снова!')
            }

        }
    }
    if (isAuth) {
        return <Navigate to='/' />
    }
    return (<Box

        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: '10px',
            '& > :not(style)': {
                m: 1,
                width: 508,
                height: '100%',
            },
        }}>
        <Paper sx={{ padding: 2 }}>
            <h5 className="text-center">Animes<Badge bg="warning" text="dark">GO</Badge></h5>
            <Typography variant="h5" className="text-center" >
                Вход
            </Typography>
            <form>
                <TextField type='email' className="mb-3" label='E-mail' error={EmailError} helperText={HelpTextEmail} fullWidth onChange={(el) => VerifyEmail(el.target.value)} />
                <TextField type='password' name="password" autoComplete="off" className="mb-2" label='Пароль' error={PassError} helperText={HelpTextPass} fullWidth onChange={(el) => VerifyPassword(el.target.value)} />
                <Button variant="contained" className="w-100" disabled={EmailError || PassError} onClick={() => CheckLogin(Email, Password)}>Войти</Button>
            </form>

        </Paper>
    </Box>)
}