import { Box, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Badge } from "react-bootstrap";

export function Footer() {

    return (<footer className="page-footer font-small blue pt-4">
        <Box sx={{ backgroundColor: "white" }}>
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5>Animes<Badge bg="warning" text="dark">GO</Badge></h5>
                        <Divider />
                        <p>Данная площадка сделана одним человеком и поддерживается им и по сей день</p>
                        <a href="mailto:animesgodemo@gmail.com">Хочешь связаться по поводу ошибок? </a>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0" />



                    <div className="col-md-6 mb-md-0 mb-3">
                        <h5 className="text-uppercase">МЫ В РАЗНЫХ СОЦ СЕТЯХ</h5>
                        <Divider />
                        <ul className="list-unstyled">
                            <li><a className="text-decoration-none link-color" href="https://discord.gg/ngRG76MH">Дискорд</a></li>
                            <li><a className="text-decoration-none link-color" href="#!">ВК</a></li>
                            <li><a className="text-decoration-none link-color" href="#!">Telegram</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-copyright text-center py-3">© 2023 Copyright:
                <p>Animes<Badge bg="warning" text="dark">GO</Badge></p>
            </div>
        </Box>


    </footer>)
}