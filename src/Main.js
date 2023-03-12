import { Paper } from "@mui/material";
import { ThreeCards } from "./Components/ThreeCard";
import { News } from "./Components/NewsofSite";

export function MainPage() {
    return (<Paper sx={{padding: 4,minHeight: '100vh'}}>
    
        <h3 className="text-center">Новости сайта</h3>
        <News/>
        <h3 className="text-center">Выбор пользователей</h3>
        <ThreeCards/>
    </Paper>)

}