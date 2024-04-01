
import { Button, Card, Col, Row } from "react-bootstrap";
import Reserve from "./Reserve";
import { useState } from "react";

export default function RoomItem() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Col sm={10} className="bg-light" style={{ border: "1px solid lightgrey" }}>

            <Card className="mb-2 mt-2">
                <Card.Body>
                    <Row>
                        <Col sm={4} xs={4} md={2}>
                            <Card.Img
                                variant="top"
                                src={`https://i.im.ge/2024/03/28/Wsm35x.Deluxeroom.png`}
                            // alt={room.name}
                            />
                        </Col>
                        <Col sm={4} xs={8} md={6}>
                            <Card.Title>STANDARD ROOM</Card.Title>
                            <Card.Subtitle className="mb-2">RM50/night</Card.Subtitle>
                            <Card.Text className="mb-3">Standard Room, where comfort and coziness await your feline friend. This inviting space offers all the essentials for a delightful stay, including soft bedding and a cozy atmosphere</Card.Text>

                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="mb-2 mt-2">
                <Card.Body>
                    <Row>
                        <Col sm={4} xs={4} md={2}>
                            <Card.Img
                                variant="top"
                                src={`https://i.im.ge/2024/03/31/W0c9Z6.suite.png`}
                            // alt={room.name}
                            />
                        </Col>
                        <Col xs={8} md={6}>
                            <Card.Title>DELUXE ROOM</Card.Title>
                            <Card.Subtitle className="mb-2">RM120/night</Card.Subtitle>
                            <Card.Text className="mb-3">Featuring plush bedding with soothing ambiance and ample space to roam, your beloved companion will feel right at home in our Deluxe Room.</Card.Text>

                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Card className="mb-2 mt-2">
                <Card.Body>
                    <Row>
                        <Col xs={4} md={2}>
                            <Card.Img
                                variant="top"
                                src={`https://i.im.ge/2024/03/31/W0cwhK.presidentialSuite.png`}
                            // alt={room.name}
                            />
                        </Col>
                        <Col xs={8} md={6}>
                            <Card.Title>PRESIDENTIAL ROOM</Card.Title>
                            <Card.Subtitle className="mb-2">RM220/night</Card.Subtitle>
                            <Card.Text className="mb-3">Indulge your cat in the ultimate retreat with our Presidential Suite, where opulence and comfort harmonize to create a truly remarkable experience. </Card.Text>

                        </Col>
                    </Row>
                </Card.Body>
            </Card>


            <Button className="btn btn-warning" onClick={handleShow}>
                Reserve Now!
            </Button>
            <Reserve show={show} handleClose={handleClose} />


        </Col>
    )
}