import { Box, Divider, Paper, Typography } from "@mui/material";
import { Badge, Col, Row } from "react-bootstrap";

import { BsGithub, BsDiscord } from 'react-icons/bs'
import { motion } from 'framer-motion'
export function Onas(props) {
    const itemVariants = {
        initial: {
            opacity: 0,


        },
        anim: custom => ({ opacity: 1, transition: { delay: 0.25 } })
    };
    const textVariants = {
        initial: {
            opacity: 0,
            x: -100

        },
        anim: custom2 => ({ opacity: 1, x: 0, transition: { delay: 0.25 } })
    };
    const DividerVariants = {
        initial: {
            width: 0
        },
        anim: custom3 => ({ width: 100, transition: { delay: 0.25 } })
    };
    const styleDivider = {
        minHeight: "inherit",
        borderColor: '#FFC107',
        borderBottomWidth: '5px',
        opacity: 1
    }
    return (<Box sx={{ minHeight: '100vh' }}>
        <Paper sx={{ marginTop: 1, padding: 1 }}>
            <Typography variant="h4" className="text-center"> Animes<Badge bg="warning" text="dark">GO</Badge></Typography>
            <Row className="mx-auto mt-3" xs={1} md={2}>
                <Col>
                    <motion.div variants={itemVariants} initial='initial' whileInView='anim' custom={1} viewport={{ once: true }}>
                        <img src="/img/3efaeea993580cc954d3918b28667426.jpeg" className="d-block img-fluid rounded-4" alt="Ошибка загрузки страницы" />
                    </motion.div>
                </Col>
                <Col>
                    <motion.div variants={textVariants} initial='initial' whileInView='anim' custom2={2} viewport={{ once: true }}>
                        <Typography variant="h5" sx={{ fontSize: '1.9rem' }}>
                            О компании
                        </Typography>
                    </motion.div>
                    <motion.div variants={DividerVariants} initial='initial' whileInView='anim' custom={3} viewport={{ once: true }}>
                        <Divider sx={styleDivider} />
                    </motion.div>
                    <motion.div variants={textVariants} initial='initial' whileInView='anim' custom2={4} viewport={{ once: true }}>
                        <Typography variant="h5" sx={{ fontSize: '1.3rem' }}>
                            Данные сайт разработат веб верстальщиком. Сайт создан и предназначен для просмотра аниме,оценки качества произведения
                        </Typography>
                    </motion.div>
                </Col>
            </Row>
            <Row className="mx-auto">
                <Col>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <motion.div variants={itemVariants} initial='initial' whileInView='anim' custom={5} viewport={{ once: true }}>
                            <Typography variant="h5" sx={{ fontSize: '1.9rem', textAlign: 'center' }}>
                                Контакты
                            </Typography>
                        </motion.div>
                        <motion.div variants={DividerVariants} initial='initial' whileInView='anim' custom={6} viewport={{ once: true }}>
                            <Divider sx={styleDivider} />
                        </motion.div>
                        <Typography variant="h5" sx={{ fontSize: '1.3rem', display: 'flex', paddingRight: 1 }}>
                            <motion.div whileHover={{ scale: 1.1, color: 'blue' }}><a className="text-reset fs-1" href="https://discord.gg/cRDD3wJf"><BsGithub /></a></motion.div>
                            <motion.div whileHover={{ scale: 1.1, color: 'blue' }} ><a className="text-reset fs-1" href="https://discord.gg/cRDD3wJf"><BsDiscord /></a></motion.div >
                        </Typography>
                    </Box>
                </Col>
            </Row>
        </Paper>
    </Box>)
} 