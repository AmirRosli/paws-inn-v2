import { Button, Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import EditReservation from "./EditReservation";

export default function ReservedCard({ roomType, name, phoneNo, dateIn, dateOut }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeCard = async () => {
        try {
            await axios.delete(`https://a86e4163-1534-4571-9ce4-f6d2b231320e-00-elrlyh4fb5uj.janeway.replit.dev/reservations/${phoneNo}`);

            console.log("Reservation deleted successfully");
            handleClose();
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    return (
        <Col sm={10} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            <Card className="mb-2 mt-2">
                <Card.Body>
                    <Row>
                        <Col xs={8} md={6}>
                            <Card.Title>Guest: {roomType}</Card.Title>
                            <Card.Subtitle className="mb-2">Phone No: {name}</Card.Subtitle>
                            <Card.Subtitle className="mb-2">Phone No: {phoneNo}</Card.Subtitle>
                            <Card.Text className="mb-3">Check In: {dateIn}</Card.Text>
                            <Card.Text className="mb-3">Check Out: {dateOut}</Card.Text>
                            <Button variant="secondary" className="ms-2" onClick={handleShow}>
                                <i className="bi bi-pencil"></i>
                            </Button>
                            <Button variant="danger" className="ms-2" onClick={removeCard}>
                                <i className="bi bi-trash3"></i>
                            </Button>
                            <EditReservation show={show} handleClose={handleClose} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}