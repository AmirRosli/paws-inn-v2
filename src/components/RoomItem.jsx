
import { Col, Container, Row } from "react-bootstrap";
import Reserve from "./Reserve";
import { useState } from "react";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RoomItem() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container className="py-3">
            <Row className="row-cols-1 row-cols-md-3 mb-3 text-center">
                <Col>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Economy
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <ul className="mt-3 mb-4">
                                    <li>For 1 cat</li>
                                    <li>2x Feeding time</li>
                                    <li>24-hour air conditioning</li>
                                    <li>Litter and pet bowls are provided</li>
                                </ul>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className="btn btn-warning" onClick={handleShow}>
                                Reserve Now!
                            </Button>
                            <Reserve show={show} handleClose={handleClose} />
                        </CardActions>
                    </Card>
                </Col>
                <Col>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Comfy
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <ul className="mt-3 mb-4">
                                    <li>Suitable and can fit up to 3 adult cats</li>
                                    <li>Add RM25 for additional cat</li>
                                    <li>2x Feeding time</li>
                                    <li>1x Playtime in 2 days</li>
                                    <li>Litter and pet bowls are provided</li>
                                    <li>24-hour air conditioning</li>
                                </ul>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className="btn btn-warning" onClick={handleShow}>
                                Reserve Now!
                            </Button>
                            <Reserve show={show} handleClose={handleClose} />
                        </CardActions>
                    </Card>
                </Col>
                <Col>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Suite
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <ul className="mt-3 mb-4">
                                    <li>Suitable and can fit up to 2-4 adult cats</li>
                                    <li>Add RM35 for additional cat</li>
                                    <li>2x Feeding time</li>
                                    <li>2x Playtime in 2 days</li>
                                    <li>Litter and pet bowls are provided</li>
                                    <li>24-hour air conditioning</li>
                                    <li>Live on phone monitoring available</li>
                                </ul>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className="btn btn-warning" onClick={handleShow}>
                                Reserve Now!
                            </Button>
                            <Reserve show={show} handleClose={handleClose} />
                        </CardActions>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

