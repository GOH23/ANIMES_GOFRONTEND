import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "./axios.js";
import { useState } from "react";
import { Form, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FecthRegister } from "../Redux/Slices/Register.js";
import { useNavigate } from "react-router-dom";
export function RegForm() {


    const [Name, SetName] = useState('')
    const [Email, SetEmail] = useState('');
    const [Password, SetPassword] = useState('');
    const [HelpTextEmail, SetHelpTextEmail] = useState('');
    const [EmailError, SetEmailError] = useState(false);
    const [HelpTextPass, SetHelpTextPass] = useState('');
    const [PassError, SetPassError] = useState(false);
    const [imageUrl, SetImageUrl] = useState('')
    const dispatch = useDispatch();
    const nav = useNavigate()
    const handleChangeFile = async (event) => {
        try {
            const FormDate = new FormData();
            FormDate.append('image', event.target.files[0]);
            const { data } = await axios.post('/upload', FormDate);
            SetImageUrl(data.url)
        } catch {

        }
    }
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
    const Registration = async (Email, Password, Name) => {
        if (Email === null || Password === null) {
            return
        }

        else {
            const data = await dispatch(FecthRegister({ email: Email, fullName: Name, password: Password, avatarUrl: imageUrl }))
            nav("/log")
        }
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
                Создание аккаунта
            </Typography>
            <Grid display='flex' justifyContent='center'>
                <Avatar className="text-center mb-2" sx={{ width: 100, height: 100 }} src={`http://localhost:4444${imageUrl}`} />
            </Grid>
            <form>
                <Form.Control type="file" className="mb-3" title="Ваша аватарка!" accept="image/*" onChange={handleChangeFile} />
                <TextField className="mb-3" label='Ваш никнейм' fullWidth required onChange={(el) => { SetName(el.target.value) }} />
                <TextField type='email' className="mb-3" label='E-mail' error={EmailError} helperText={HelpTextEmail} fullWidth onChange={(el) => VerifyEmail(el.target.value)} />
                <TextField type='password' name="password" autoComplete="off" className="mb-3" label='Пароль' error={PassError} helperText={HelpTextPass} fullWidth onChange={(el) => VerifyPassword(el.target.value)} />
                <Button variant="contained" className="w-100" disabled={EmailError || PassError} onClick={() => Registration(Email, Password, Name)}>Зарегистрироваться</Button>
            </form>

        </Paper>
    </Box>)
}