import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/SiteHeaderAndFooter/Header.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimesList } from './Animes.js';
import { FullCardPost } from './FullCardPost.js';
import '@fontsource/public-sans';
import { useDispatch} from 'react-redux';
import { FecthAuthMe} from './Redux/Slices/Auth.js';
import { Admin } from './Components/AdminPage/Admin.js';
import { RegForm } from './Components/LoginAndRegistrationForm/RegForm.js';
import { LoginForm } from './Components/LoginAndRegistrationForm/LoginForm.js';
import { MainPage } from './Main.js';
import { Profile } from './Profile.js';

import { FecthIsActivated } from './Redux/Slices/IsActivated.js';
import { FecthIsAdmin } from './Redux/Slices/IsAdmin.js';
import { Footer } from './Components/SiteHeaderAndFooter/Footer.js';
import { FullNews } from './Components/ForNews/FullNews.js';
import { FecthIsModer } from './Redux/Slices/IsModerator.js';
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
                <Route path='/anime/:id' element={<FullCardPost />} />
                <Route path='/reg' element={<RegForm />} />
                <Route path='/news' element={<FullNews />} />
                <Route path='/log' element={<LoginForm />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </>)
}