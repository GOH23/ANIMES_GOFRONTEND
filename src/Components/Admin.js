import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from './axios.js'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FecthSeries } from '../Redux/Slices/AllSeries.js';
import { selectIsAdmin } from '../Redux/Slices/IsAdmin.js';
import { Paper } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
export function Admin() {

    const dispatch = useDispatch();
    const isAdmin = useSelector(selectIsAdmin);
    const data = useSelector((state) => state.isadmin)
    const [seriesArray, SetS] = useState([]);
    const [Animes, SetAnimes] = useState([]);
    const [SelectedOptionInSeries, SetOpSer] = useState(0)
    //Серии добавить
    const [SeresAddId, SetSeresAddId] = useState('')
    const [LinkForSerie, SetLinkForSerie] = useState([])
    function AddSerie() {
        axios.post(`/addseries/${SeresAddId}`, {
            serie: LinkForSerie
        }).then(responce => {
            if (responce.status === 200) {
                alert("Успешно добавлена  серия!")
                window.location.reload()
            }
            else {
                alert("Возникла ошибка!")
                window.location.reload()
            }
        })
    }
    function CreateSeries() {
        axios.post(`/series/${SeresAddId}`, {
            Series: LinkForSerie
        }).then(responce => {
            if (responce.status === 200) {
                alert("Успешно добавлена  серия!")
                window.location.reload()
            }
            else {
                alert("Возникла ошибка!")
                window.location.reload()
            }
        })
    }
    //Аниме добавить
    const [AnimeName, SetAnimeName] = useState('')
    const [AnimeDesc, SetAnimeDesc] = useState('')
    const [LinkAnimeImage, SetLinkAnimeImage] = useState('')
    const [LinksAnimeDescImages, SetLinksAnimeDescImages] = useState([])
    const [AnimeTags, SetAnimeTags] = useState([])
    function CreateAnime() {
        axios.post(`/animes`, {
            title: AnimeName,
            desc: AnimeDesc,
            tags: AnimeTags,
            imageFontUrl: LinkAnimeImage,
            screensUrls: LinksAnimeDescImages
        }).then(responce => {
            if (responce.status === 200) {
                alert("Успешно добавлена  серия!")
                window.location.reload()
            }
            else {
                alert("Возникла ошибка!")
                window.location.reload()
            }
        })

    }
    //Новость добавить 
    const [NewsTitle, SetNewsTitle] = useState('')
    const [Newsvalue, setValue] = useState("**Hello world!!!**");
    function CreateNew() {
        axios.post(`/news/add`, {
            title: NewsTitle,
            newsText: Newsvalue

        }).then(responce => {
            if (responce.status === 200) {
                alert("Успешно добавлена  новость!")
                window.location.reload()
            }
            else {
                alert("Возникла ошибка!")
                window.location.reload()
            }
        })

    }
    useEffect(() => {

        dispatch(FecthSeries())
        axios.get('/animes').then(responce => {
            SetAnimes(responce.data)

        })

        axios.get('/series').then(responce => {
            SetS(responce.data)
        })
    }, [])
    if (data.status === 'loading') {
        return
    }
    if (!isAdmin) {
        return <Navigate to='/' />
    }
    return (<Container>
        <h1 className='text-center'>Панель администратора для добавления аниме</h1>
        <h2 className='text-center'>Серии:</h2>
        <div className='table-responsive responsive_table'>
            <Table variant="light"  bordered size="sm">
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>Серия</th>
                        <th>Айди аниме</th>
                    </tr>
                </thead>
                <tbody>
                    {seriesArray.map((el, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{el._id}</td>
                                <td>{el.Series.join(", ")}</td>
                                <td>{el.animeId}</td>
                            </tr>)
                    })}

                </tbody>
            </Table>
        </div>

        <Form.Select aria-label="Default select example" className='mb-3' onChange={(el) => { SetOpSer(el.target.value) }}>
            <option>Выберите опцию</option>
            <option value={1}>Добавление серий к аниме</option>
            <option value={2}>Удаление по идефикационнному ключу (_id)</option>
            <option value={3}>Создание серии к новому аниме</option>
        </Form.Select>
        {SelectedOptionInSeries == 3 ? <Form>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="1">
                    Сcылка на след серию или серии(строго писать ссылку запятую и пробел и дальше)
                </Form.Label>
                <Col sm="9">
                    <Form.Control type="url" placeholder="Сcылка на серию(строго писать ссылку запятую и пробел и дальше)" required onChange={(el) => { SetLinkForSerie(el.target.value) }} />
                    <small>Пример: ссылка1, ссылка2, ссылка3</small>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" >
                <Form.Label column sm="1">
                    Выбери аниме куда нужно закинуть серии
                </Form.Label>
                <Col sm="9">
                    <Form.Select aria-label="Default select example" required onChange={(el) => { SetSeresAddId(el.target.value) }}>
                        <option>Выбери аниме</option>
                        {Animes.map((el, ind) => {
                            return (<option key={ind} value={el._id}>{el.title}</option>)
                        })}
                    </Form.Select>

                </Col>
            </Form.Group>
            <Button className='w-100' onClick={() => AddSerie()}>Добавить серию к аниме</Button>
        </Form>

            : null}
        {SelectedOptionInSeries == 1 ? <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="1">
                    Сcылка на серию или несколько серий
                </Form.Label>

                <Col sm="9">
                    <Form.Control type="url" placeholder="Сcылка на серию" required onChange={(el) => {
                        var arr = el.target.value.split(', ')
                        SetLinkForSerie(arr)
                    }} />
                    <small>Пример: ссылка1, ссылка2, ссылка3</small>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" >
                <Form.Label column sm="1">
                    Выбери аниме куда добавить 1 серию
                </Form.Label>
                <Col sm="9">
                    <Form.Select aria-label="Default select example" required onChange={(el) => { SetSeresAddId(el.target.value) }}>
                        <option>Выбери аниме</option>
                        {Animes.map((el, ind) => {
                            return (<option key={ind} value={el._id}>{el.title}</option>)
                        })}
                    </Form.Select>
                </Col>
            </Form.Group>
            <Button className='w-100' onClick={() => CreateSeries()}>Закинуть серии к аниме</Button>
        </Form>

            : null}
        <h2 className='text-center'>Аниме:</h2>
        <div className='table-responsive responsive_table'>
            <Table variant="light" bordered size="sm">
                <thead>
                    <tr>
                        <th>Айди аниме</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Теги</th>
                        <th>Кол-во просмотров</th>
                        <th>Главная картинка</th>
                        <th>Картинки в описании</th>
                    </tr>
                </thead>
                <tbody>
                    {Animes.map((el, ind) => {
                        return (<tr key={ind}>
                            <td>{el._id}</td>
                            <td>{el.title}</td>
                            <td>{el.desc}</td>
                            <td>{el.tags.join(", ")}</td>
                            <td>{el.viewsCount}</td>
                            <td>{el.imageFontUrl}</td>
                            <td>{el.screensUrls.join(", ")}</td>
                        </tr>)
                    })}
                </tbody>

            </Table>
        </div>

        <h4 className='text-center'>Добавить аниме</h4>
        <Paper sx={{ padding: 1 }}>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="1">
                        Название аниме
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="url" placeholder="Название аниме" defaultValue='' required onChange={(el) => { SetAnimeName(el.target.value) }} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="1">
                        Описание аниме
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="url" placeholder="Описание аниме" defaultValue='' required onChange={(el) => { SetAnimeDesc(el.target.value) }} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="1">
                        Ссылка на главную картинку
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="url" placeholder="Сcылка на картинку!" defaultValue='' required onChange={(el) => { SetLinkAnimeImage(el.target.value) }} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="1">
                        Ссылки на картинки для описания
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="url" placeholder="Ссылки на картинки писать строго через запятую с пробелом после" defaultValue='' required onChange={(el) => {
                            var arr = el.target.value.split(', ')
                            SetLinksAnimeDescImages(arr)
                        }} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="1">
                        Теги
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="url" placeholder="Теги писать строго через запятую с пробелом после" defaultValue='' required onChange={(el) => {
                            var arr = el.target.value.split(', ')
                            SetAnimeTags(arr)
                        }} />
                    </Col>
                </Form.Group>
                <Button className='w-100' onClick={() => CreateAnime()}>Добавить аниме</Button>
            </Form>
        </Paper>
        <h4 className='text-center'>Добавить новость</h4>
        <Paper sx={{ padding: 1 }}>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="1">
                        Название новости
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control placeholder="Название новости" defaultValue='' required onChange={(el) => { SetNewsTitle(el.target.value) }} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="1">
                        Описание новости
                    </Form.Label>
                    <Col sm="9">
                        <div data-color-mode='light'>
                            <MDEditor value={Newsvalue} onChange={setValue} />
                        </div>
                    </Col>
                </Form.Group>
                <Button className='w-100' onClick={() => CreateNew()}>Добавить новость</Button>
            </Form>
        </Paper>
    </Container >)
}