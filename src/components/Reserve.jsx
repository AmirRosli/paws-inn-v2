import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"



export default function Reserve({ show, handleClose }) {


    const [name, setName] = useState("");
    const [dateIn, setDateIn] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [roomType, setRoomType] = useState("");


    const handleDateIn = (date) => {
        setDateIn(date);
    }

    const handleDateOut = (date) => {
        setDateOut(date);
    }





    const handleReserve = () => {


        //Get stored JWT Token
        const token = localStorage.getItem("authToken");

        //Decode the token to fetch user id
        const decode = jwtDecode(token);
        const userId = decode.id // May change depending on how the server encode the token



        //Prepare data to be sent


        const data = {
            user_id: userId,
            selected_room: roomType,
            guest_name: name,
            phone_number: phoneNo,
            check_in: dateIn,
            check_out: dateOut

        };

        //Make your API call here
        axios
            .post("https://a86e4163-1534-4571-9ce4-f6d2b231320e-00-elrlyh4fb5uj.janeway.replit.dev/reservations", data)
            .then((response) => {
                console.log("Success:", response.data);
                handleClose();
            })
            .catch((error) => {
                console.error("Error", error);
            });


    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" controlId="formRoomType">
                            <Form.Label>Room Type:</Form.Label>
                            <Form.Select onChange={(e) => setRoomType(e.target.value)}>
                                <option value="">Select Room Type</option>
                                <option value="Standard Room">Single Room</option>
                                <option value="Deluxe Room">Double Room</option>
                                <option value="Presidential Suite">Suite</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name:</Form.Label>
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

                        <Button
                            variant="warning"
                            className="rounded-pill"
                            onClick={handleReserve}
                        >
                            Reserve
                        </Button>

                    </Form>
                </Modal.Body>

            </Modal >
        </>
    )
}

