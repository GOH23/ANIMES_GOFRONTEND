import { useDispatch, useSelector } from "react-redux"
import { selectIsAuth } from "../Redux/Slices/Auth"
import { Alert, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { FecthOptionGet } from "../Redux/Slices/OptionOfAnime";
import { useParams } from "react-router-dom";
import axios from "./axios";
import { selectIsActivated } from "../Redux/Slices/IsActivated";
export function StatusofAnime() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [StatusOfButton1, SetStatus1] = useState('outlined')
    const [StatusOfButton2, SetStatus2] = useState('outlined')
    const [StatusOfButton3, SetStatus3] = useState('outlined')
    const [StatusOfButton4, SetStatus4] = useState('outlined')
    const [StatusOfButton5, SetStatus5] = useState('outlined')
    const isAuth = useSelector(selectIsAuth)
    const isActivated = useSelector(selectIsActivated)
    useEffect(() => {


        dispatch(FecthOptionGet(id)).then(el => {
            // eslint-disable-next-line
            switch (el.payload.status) {
                case ('СМОТРЮ'):
                    SetStatus1('contained');
                    break;
                case ('ПРОСМОТРЕНО'):
                    SetStatus2('contained');
                    break;
                case ('ПЕРЕСМАТРИВАЮ'):
                    SetStatus3('contained');
                    break;
                case ('БРОШЕНО'):
                    SetStatus4('contained');
                    break;
                case ('ОТЛОЖЕНО'):
                    SetStatus5('contained');
                    break;
            }
        })

        // eslint-disable-next-line
    }, [])
    function ResetColor() {
        SetStatus1('outlined')
        SetStatus2('outlined')
        SetStatus3('outlined')
        SetStatus4('outlined')
        SetStatus5('outlined')
    }
    function ClickShow1() {
        ResetColor()
        SetStatus1('contained')
        axios.post('/option/' + id, { option: 'СМОТРЮ' })
        if (StatusOfButton1 === 'contained') {
            SetStatus1('outlined')
            axios.post('/option/' + id, { option: 'НЕ СМОТРЮ' })
        }
    }
    function ClickShow2() {
        ResetColor()
        SetStatus2('contained')
        axios.post('/option/' + id, { option: 'ПРОСМОТРЕНО' })
        if (StatusOfButton2 === 'contained') {
            SetStatus2('outlined')
            axios.post('/option/' + id, { option: 'НЕ СМОТРЮ' })
        }
    }
    function ClickShow3() {
        ResetColor()
        SetStatus3('contained')
        axios.post('/option/' + id, { option: 'ПЕРЕСМАТРИВАЮ' })
        if (StatusOfButton3 === 'contained') {
            SetStatus3('outlined')
            axios.post('/option/' + id, { option: 'НЕ СМОТРЮ' })
        }
    }
    function ClickShow4() {
        ResetColor()
        SetStatus4('contained')
        axios.post('/option/' + id, { option: 'БРОШЕНО' })
        if (StatusOfButton4 === 'contained') {
            SetStatus4('outlined')
            axios.post('/option/' + id, { option: 'НЕ СМОТРЮ' })
        }
    }
    function ClickShow5() {
        ResetColor()
        SetStatus5('contained')
        axios.post('/option/' + id, { option: 'ОТЛОЖЕНО' })
        if (StatusOfButton5 === 'contained') {
            SetStatus5('outlined')
            axios.post('/option/' + id, { option: 'НЕ СМОТРЮ' })
        }
    }
    if (!isAuth || !isActivated) {
        return (<>
            <h4>Статус аниме</h4>
            <Alert severity="warning">Чтобы поставить статус аниме нужно зарегистрироваться или войти</Alert>
        </>)
    }


    return (<>
        <h4>Статус аниме</h4>
        <Button className="m-1 w-100" variant={StatusOfButton1} color="success" onClick={() => ClickShow1()}>СМОТРЮ</Button>
        <Button className="m-1 w-100" variant={StatusOfButton2} color="primary" onClick={() => ClickShow2()}>ПРОСМОТРЕНО </Button>
        <Button className="m-1 w-100" variant={StatusOfButton3} color='info' onClick={() => ClickShow3()}>ПЕРЕСМАТРИВАЮ </Button>
        <Button className="m-1 w-100" variant={StatusOfButton4} color="error" onClick={() => ClickShow4()}>БРОШЕНО </Button>
        <Button className="m-1 w-100" variant={StatusOfButton5} color='warning' onClick={() => ClickShow5()}>ОТЛОЖЕНО </Button>
    </>)
}