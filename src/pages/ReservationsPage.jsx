import { Button, Col, Container, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
// import { useDispatch } from "react-redux";
// import { fetchReservationsByUserId } from "../features/reservations/reservationsSlice";







export default function ReservationsPage() {

    const [editId, setEditId] = useState(null);
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    // const dispatch = useDispatch();


    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservation = async (userId) => {
            try {
                const response = await fetch(`https://eea21eef-cffb-483f-8dbe-dbe7123206b0-00-1vsza6zufsofs.riker.replit.dev/reservations/user/${userId}`);
                const responseData = await response.json();
                setData(responseData);
                // console.log(setData)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        if (!currentUser) {
            navigate("/login");
        } else {
            setLoading(true);
            fetchReservation(currentUser.uid);
        }
    }, [currentUser, navigate]);

    const auth = getAuth();

    const handleLogout = () => {
        auth.signOut();
    };


    const handleEdit = (userId) => {
        setEditId(userId);
    }

    const handleUpdate = (userId) => {
        axios.put(`https://eea21eef-cffb-483f-8dbe-dbe7123206b0-00-1vsza6zufsofs.riker.replit.dev/reservations/${userId}`, {

            guest_name: name,
            phone_number: phoneNo
        })
            .then(res => {
                console.log(res);
                setEditId(null);
                setName("");
                setPhoneNo("");
                window.alert("Reservation updated! Refresh page to see your updated reservation :)");
                // dispatch(fetchReservationsByUserId(userId));
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (userId) => {

        axios.delete(`https://eea21eef-cffb-483f-8dbe-dbe7123206b0-00-1vsza6zufsofs.riker.replit.dev/reservations/${userId}`)
            .then(res => {
                console.log(res);
                window.alert("Reservation deleted!");
                // dispatch(fetchReservationsByUserId(userId));    // Refresh reservations after deletion

            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <SideBar handleLogout={handleLogout} />
            <Container>
                <Row>

                    <Col>
                        <div className="container" style={{
                            display: 'flex',
                            alignItems: 'center', // Centers vertically in the container
                            justifyContent: 'center', // Centers horizontally in the container
                            width: '100%' // Full viewport width
                        }}>
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
                                                        <td>{reservation.selected_room}</td>

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
        </>
    )
}