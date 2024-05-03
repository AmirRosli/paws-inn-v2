import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import SideBar from "../components/SideBar";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Typography } from "@mui/material";





export default function ReserveComfy() {

    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;


    const [name, setName] = useState("");
    const [dateIn, setDateIn] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [roomType] = useState("Comfy");
    const [price] = useState("55.00");
    const [quantity] = useState("1");

    const auth = getAuth();
    console.log("auth:", auth)
    const navigate = useNavigate();

    if (!currentUser) {
        navigate("/login");
    }

    const handleLogout = () => {
        auth.signOut();
    };



    const handleDateIn = (date) => {
        setDateIn(date);
        console.log('Date In:', date);
    }

    const handleDateOut = (date) => {
        setDateOut(date);
        console.log('Date Out:', date);
    }





    const handleReserve = () => {


        console.log('Reserve button clicked');
        console.log('Date In String:', dateIn.toISOString().slice(0, 10));
        console.log('Date Out String:', dateOut.toISOString().slice(0, 10));
        const dateInString = dateIn.toISOString().slice(0, 10);
        const dateOutString = dateOut.toISOString().slice(0, 10);

        //Prepare data to be sent
        const reservationDetails = {
            user_id: userId,
            selected_room: roomType,
            guest_name: name,
            phone_number: phoneNo,
            check_in: dateInString,
            check_out: dateOutString,
            price: price,
            quantity: quantity
        };

        //Make API call here
        axios
            .post("https://eea21eef-cffb-483f-8dbe-dbe7123206b0-00-1vsza6zufsofs.riker.replit.dev/reservations", reservationDetails)
            .then((response) => {
                console.log("Success:", response.data);
                // handleClose();
                window.alert("You have successfully made a reservations!");

            })
            .catch((error) => {
                console.error("Error", error);
            });




    }
    return (
        <>
            <SideBar handleLogout={handleLogout} />
            <div className="bannerComfy"></div>

            <Col className="container-fluid">
                <Row>

                    <Container className="main-content">

                        <Form >

                            <Typography gutterBottom variant="h5" component="div" className="typography-header">
                                COMFY
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="typography-body">
                                <ul className="mt-3 mb-4">
                                    <li>Suitable and can fit up to 3 adult cats</li>
                                    <li>Add RM25 for additional cat</li>
                                    <li>2x Feeding time</li>
                                    <li>1x Playtime in 2 days</li>
                                    <li>Litter and pet bowls are provided</li>
                                    <li>24-hour air conditioning</li>
                                </ul>
                            </Typography>






                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Guest Name:</Form.Label>
                                <Form.Control
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPhoneNo">
                                <Form.Label>Phone No:</Form.Label>
                                <Form.Control
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    type="text"
                                    placeholder="e.g: 012345678"
                                    required
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDateIn">
                                <Form.Label>Check In Date:  </Form.Label>
                                <DatePicker
                                    selected={dateIn}
                                    onChange={handleDateIn}
                                    dateFormat="MM/dd/yyyy"

                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDateOut">
                                <Form.Label>Check Out Date:</Form.Label>
                                <DatePicker
                                    selected={dateOut}
                                    onChange={handleDateOut}
                                    dateFormat="MM/dd/yyyy"

                                />

                            </Form.Group>

                            <Typography gutterBottom variant="h4" component="div" className="typography-header">
                                RM 55
                            </Typography>

                            <Button
                                variant="warning"
                                className="rounded-pill button-rounded"
                                onClick={handleReserve}
                            >
                                Add to reservation cart
                            </Button>

                        </Form>
                    </Container>
                </Row>
            </Col>
        </>
    )
}
