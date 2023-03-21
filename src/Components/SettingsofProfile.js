import { Alert, Button, FormControlLabel, FormGroup, Switch } from "@mui/material"
import MDEditor from "@uiw/react-md-editor"
import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectIsActivated } from "../Redux/Slices/IsActivated"
import axios from "./axios.js"
export function SettingofProfile(props) {
    const isActivated = useSelector(selectIsActivated)
    const [imageUrl, SetImageUrl] = useState('')
    const [ProfileDesc, setProfileDesc] = useState("");
    const [PrivacySett,SetPrivacySett] = useState(false)
    useEffect(()=>{
        SetPrivacySett(props.settData.isPrivacy)
        setProfileDesc(props.settData.profileDesc)
        // eslint-disable-next-line
    },[])
    if (!isActivated) {
        return (<Alert severity='warning'>Данные функции доступны если активировать аккаунт(В почте должно быть сообщение с ссылкой активации)</Alert>)
    }
    const handleChangeFile = async (event) => {
        try {
            const FormDate = new FormData();
            FormDate.append('image', event.target.files[0]);
            const { data } = await axios.post('/tmp/upload', FormDate);
            SetImageUrl(data.url)
        } catch {

        }
    }
    const SaveSetting = () => {
        axios.post('/setting', {
            avatarUrl: imageUrl,
            isPrivacy: PrivacySett,
            descriptionProfile: ProfileDesc
        }).then(response => {
            window.location.reload()
        })
    }
    return (<div>
        <h5 className="text-start">Поменять аватарку</h5>
        <Form.Control type="file" className="mb-3" title="Ваша аватарка!" accept="image/*" onChange={handleChangeFile} />
        <h5 className="text-start">Поменять описание профиля</h5>
        <MDEditor placeholder='Ваше описание' hideToolbar={true} className='mb-2' preview="edit" data-color-mode='light' value={ProfileDesc} onChange={setProfileDesc} />
        <h5 className="text-start">Настройки приватности</h5>
        <FormGroup>
            <FormControlLabel control={<Switch checked={PrivacySett} onClick={()=>SetPrivacySett(!PrivacySett)}/>} label="Закрыть категории для других" />
            <FormControlLabel disabled control={<Switch value={PrivacySett}  onClick={()=>SetPrivacySett(!PrivacySett)}/>} label="Показ ваших друзей другим[Update 3.0]" />
            <FormControlLabel disabled control={<Switch value={PrivacySett}  onClick={()=>SetPrivacySett(!PrivacySett)}/>} label="Показ ваших последних коментариев другим[Update 3.0]" />
        </FormGroup>
        <Button variant="contained" onClick={SaveSetting}>Сохранить изменения</Button>
    </div>)
}