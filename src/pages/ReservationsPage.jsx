import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";





export default function ReservationsPage() {

    
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();

    // check for authToken immediately upon component mount and whenever authToken changes
    useEffect(() => {
        if (!authToken) {
            navigate("/login"); // redirect to login if no auth token is present
        }
    }, [authToken, navigate]);

    const handleLogout = () => {
        setAuthToken(""); // clear token from localStorage
    };

    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const fetchReservation = (userId) => {
        fetch(`https://a86e4163-1534-4571-9ce4-f6d2b231320e-00-elrlyh4fb5uj.janeway.replit.dev/reservations/user/${userId}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error:", error));
    }

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchReservation(userId);
        }
    }, []);

    const handleEdit = (userId) => {
        setEditId(userId);
    }

    const handleUpdate = (userId) => {
        axios.put(`https://a86e4163-1534-4571-9ce4-f6d2b231320e-00-elrlyh4fb5uj.janeway.replit.dev/reservations/${userId}`, {
            selected_room: selectedRoom,
            guest_name: name,
            phone_number: phoneNo
        })
            .then(res => {
                console.log(res);
                fetchReservation();
                setEditId(null);
                setSelectedRoom("");
                setName("");
                setPhoneNo("");
                window.alert("Reservation updated! Refresh page to see your updated reservation :)");
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (userId) => {
        axios.delete(`https://a86e4163-1534-4571-9ce4-f6d2b231320e-00-elrlyh4fb5uj.janeway.replit.dev/reservations/${userId}`)
            .then(res => {
                console.log(res);
                fetchReservation(); // Refresh reservations after deletion
                window.alert("Reservation deleted!");
            })
            .catch(err => console.log(err));
    }

    return (
        <Container>
            <Row>
                <SideBar handleLogout={handleLogout} />
                <Col>
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Room</th>
                                    <th>Name</th>
                                    <th>PhoneNo</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   data.length > 0 && data.length > 0 && data.map((reservation) => (
                                        <tr key={reservation.user_id}>
                                            {editId === reservation.user_id ? (
                                                <>
                                                    {/* <td><input type="text" value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} /></td> */}
                                                   <td>
                                                    <Form>
                                                    <Form.Group className="mb-0" controlId="formRoomType">
                            <Form.Select onChange={(e) => setSelectedRoom(e.target.value)}>
                                <option value="">Select Room Type</option>
                                <option value="Standard Room">Single Room</option>
                                <option value="Deluxe Room">Double Room</option>
                                <option value="Presidential Suite">Suite</option>
                            </Form.Select>
                        </Form.Group>
                                                    </Form>
                                                    </td>

                                                    <td><input type="text" value={name} onChange={e => setName(e.target.value)} /></td>
                                                    <td><input type="text" value={phoneNo} onChange={e => setPhoneNo(e.target.value)} /></td>
                                                    <td>{reservation.check_in}</td>
                                                    <td>{reservation.check_out}</td>
                                                    <td>
                                                        <Button onClick={() => handleUpdate(reservation.user_id)}>Save</Button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{reservation.selected_room}</td>
                                                    <td>{reservation.guest_name}</td>
                                                    <td>{reservation.phone_number}</td>
                                                    <td>{reservation.check_in}</td>
                                                    <td>{reservation.check_out}</td>
                                                    <td>
                                                        <Button onClick={() => handleEdit(reservation.user_id)}>Edit</Button>
                                                        <span style={{ marginLeft: '5px' }}></span>
                                                        <Button onClick={() => handleDelete(reservation.user_id)}>Delete</Button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}





// export default function ReservationsPage() {

    
//     const [bookings, setBookings] = useState([])

//     const fetchBookings = (userId) => {
//         fetch(
//             `https://a86e4163-1534-4571-9ce4-f6d2b231320e-00-elrlyh4fb5uj.janeway.replit.dev/reservations/user/${userId}`
//         )
//             .then((response) => response.json())
//             .then((data) => {
//                 setBookings(data)
//                 console.log("setBookings:", data)
//             })

//             .catch((error) => console.error("Error:", error));
//     };

//     useEffect(() => {
//         const token = localStorage.getItem("authToken");
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             const userId = decodedToken.id;
//             fetchBookings(userId);
//         }
//     }, []);





//     return (
//         <>
//             <Col sm={6}>
//                 <Row>
//                     <SideBar />
//                     {bookings && bookings.length > 0 && bookings.map((booking) => (
//                         <ReservedCard
//                             key={booking.id}
//                             roomType={booking.roomType}
//                             name={booking.name}
//                             phoneNo={booking.phoneNo}
//                             dateIn={booking.dateIn}
//                             dateOut={booking.dateOut}
//                         />

//                     ))}
//                 </Row>
//             </Col>
//         </>
//     )
// }