import { Paper } from "@mui/material";
import { ThreeCards } from "./Components/ForMainPageCard/ThreeCard";
import { News } from "./Components/ForNews/NewsofSite";

export function MainPage() {
    return (<Paper sx={{padding: 4,minHeight: '100vh'}}>
    
        <h3 className="text-center">Новости сайта</h3>
        <News/>
        <h3 className="text-center">Выбор пользователей</h3>
        <ThreeCards/>
    </Paper>)

}