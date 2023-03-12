import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Alert, Pagination, Paper } from '@mui/material';
import axios from './axios';
import { useEffect, useState } from 'react';
import { selectIsAuth } from '../Redux/Slices/Auth';
import { selectIsActivated } from '../Redux/Slices/IsActivated'
import MDEditor from '@uiw/react-md-editor';
import { useParams } from 'react-router-dom';
import { ComentsById } from './ComentsById';
export function Commentsadd() {
    const isAuth = useSelector(selectIsAuth)
    const isActivated = useSelector(selectIsActivated)
    const [ComentDatas, SetComents] = useState([])
    const [FilteredComentDatas, SetFilteredComents] = useState([])
    const [Page, SetPage] = useState(1)
    const { id } = useParams()
    const [value, setValue] = useState("Написать комментарий");
    useEffect(() => {
        axios.get(`/comment/${id}`).then(response => {
            SetComents(response.data);
            SetFilteredComents(response.data.slice(0, 5))
        })
    }, [])
    const ChangeCommmentPage = (event, value) => {

        SetPage(value);
        let valuespl = 5*value
        SetFilteredComents(ComentDatas.slice(valuespl-5, valuespl))

    }
    const SendComment = () => {
        axios.post(`/comment/${id}`, {
            commenttext: value
        }).then(response => {
            axios.get(`/comment/${id}`).then(response => {
                SetComents(response.data);
                SetFilteredComents(response.data)
            })
            setValue('');
        })
    }
    if (!isAuth && !isActivated) {
        return (<Alert severity="warning"> Чтобы оставлять коментарии нужно войти или зарегистрироваться</Alert>)
    }
    if (!isActivated) {
        return (<Alert severity="warning"> Чтобы оставлять коментарии нужно активировать аккаунт</Alert>)
    }

    else {

        return (<>
            <Paper sx={{ padding: 3 }} elevation={24}>
                <MDEditor placeholder='Написать комментарий' hideToolbar={true} className='mb-2' preview="edit" data-color-mode='light' value={value} onChange={setValue} />
                <div className='d-flex justify-content-center'>
                    <Button className='text-center' onClick={() => SendComment()}>Отправить комментарий</Button>
                </div>
            </Paper>
                
            <ComentsById data={FilteredComentDatas} />
            <Paper sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination page={Page} onChange={ChangeCommmentPage} count={Math.ceil(ComentDatas.length / 5)} />

            </Paper>
        </>)
    }

}