import { Alert, Button } from "@mui/material"
import { useState } from "react"
import { Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectIsActivated } from "../Redux/Slices/IsActivated"
import axios from "./axios.js"
export function SettingofProfile(props){
    const isActivated = useSelector(selectIsActivated)
    const [imageUrl, SetImageUrl] = useState('')
    if(!isActivated){
        return(<Alert severity='warning'>Данные функции доступны если активировать аккаунт(В почте должно быть сообщение с ссылкой активации)</Alert>)
    }
    const handleChangeFile = async (event) => {
        try {
            const FormDate = new FormData();
            FormDate.append('image', event.target.files[0]);
            const { data } = await axios.post('/upload', FormDate);
            SetImageUrl(data.url)

        } catch {

        }
    }
    const SaveSetting = ()=>{
        axios.post('/setting',{
            avatarUrl: imageUrl
        }).then(response=>{
            window.location.reload()
        })
    }
    return(<div>
        <h5 className="text-start">Поменять аватарку</h5>
        <Form.Control type="file" className="mb-3" title="Ваша аватарка!" accept="image/*" onChange={handleChangeFile} />
        <Button variant="contained" onClick={SaveSetting}>Сохранить изменения</Button>
    </div>)
}