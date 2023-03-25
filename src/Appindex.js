import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimesList } from './Animes.js';
import { FullCardPost } from './FullCardPost.js';
import '@fontsource/public-sans';
import { useDispatch} from 'react-redux';
import { FecthAuthMe} from './Redux/Slices/Auth.js';
import { Admin } from './Components/Admin.js';
import { RegForm } from './Components/RegForm.js';
import { LoginForm } from './Components/LoginForm.js';
import { MainPage } from './Main.js';
import { Profile } from './Profile.js';

import { FecthIsActivated } from './Redux/Slices/IsActivated.js';
import { FecthIsAdmin } from './Redux/Slices/IsAdmin.js';
import { Footer } from './Components/Footer.js';
import { FullNews } from './Components/FullNews.js';
import { FecthIsModer } from './Redux/Slices/IsModerator.js';
import { ProfileCheck } from './ProfileCheck.js';
import { Onas } from './Onas.js';
export function Appindex() {
    const dispatch = useDispatch();

    useEffect(()=>{
        try{
            dispatch(FecthAuthMe())
            dispatch(FecthIsActivated())
            dispatch(FecthIsAdmin())
            dispatch(FecthIsModer())
        } catch{
            return;
        }

    },[])
    return (<>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path='/' element={<MainPage/>}/>

                <Route  path='/animes' element={<AnimesList />} />
                <Route  path='/profile/:id' element={<ProfileCheck />} />
                <Route path='/anime/:id' element={<FullCardPost />} />
                <Route path='/anime/:id' element={<FullCardPost />} />
                <Route path='/reg' element={<RegForm />} />
                <Route path='/news' element={<FullNews />} />
                <Route path='/log' element={<LoginForm />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/about' element={<Onas/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </>)
}