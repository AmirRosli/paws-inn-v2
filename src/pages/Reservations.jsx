import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useLocalStorage from "use-local-storage";
import SideBar from "../components/SideBar";
import ReservedCard from "../components/ReservedCard";
import { jwtDecode } from "jwt-decode";


export default function ReservationsPage() {
    const [bookings, setBookings] = useState([])

    const fetchBookings = (userId) => {
        fetch(
            `https://a86e4163-1534-4571-9ce4-f6d2b231320e-00-elrlyh4fb5uj.janeway.replit.dev/reservations/user/${userId}`
        )
            .then((response) => response.json())
            .then((data) => setBookings(data))
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchBookings(userId);
        }
    }, []);





    return (
        <>
            <Container>
                <Row>
                    <SideBar />
                    {bookings.length > 0 && bookings.map((booking) => (
                        <ReservedCard
                            key={booking.id}
                            roomType={booking.roomType}
                            name={booking.name}
                            phoneNo={booking.phoneNo}
                            dateIn={booking.dateIn}
                            dateOut={booking.dateOut}
                        />

                    ))}
                </Row>
            </Container>
        </>
    )
}