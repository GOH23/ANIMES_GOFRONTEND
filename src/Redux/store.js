import { configureStore } from "@reduxjs/toolkit";
import {  AllSeriesReducer } from "./Slices/AllSeries";
import { authReducer } from "./Slices/Auth";
import { CardFullReducer } from "./Slices/CardFullPost";
import { IsActivatedReducer } from "./Slices/IsActivated";
import { IsAdminReducer } from "./Slices/IsAdmin";
import { IsModerReducer } from "./Slices/IsModerator";
import { OptionGetReducer } from "./Slices/OptionOfAnime";
import { RegisterReducer } from "./Slices/Register";
import { StarsGetReducer } from "./Slices/Star";
const store = configureStore({
    reducer:{
        auth: authReducer,
        reg: RegisterReducer,
        anime: CardFullReducer,
        stars: StarsGetReducer,
        allseries: AllSeriesReducer,
        option: OptionGetReducer,
        isactivated: IsActivatedReducer,
        isadmin: IsAdminReducer,
        ismoder: IsModerReducer

    }
})
export default store;