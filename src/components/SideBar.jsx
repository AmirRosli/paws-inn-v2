import { Col } from "react-bootstrap";
import IconButton from "./IconButton";
import { useNavigate } from "react-router-dom";




export default function SideBar({ handleLogout }) {
    const navigate = useNavigate();

    const handleReservations = () => {
        navigate("/reservationsPage")
    }

    const handleRooms = () => {
        navigate("/rooms")
    }

    return (
        <Col
            sm={2}
            className="d-flex flex-column justify-content-start align-items-start bg-light vh-100"
            style={{ position: "sticky", top: 0 }}
        >

            <p className="align-centered" style={{ fontSize: 30 }}>Paws Inn</p>
            <IconButton
                className="bi bi-clipboard2"
                text="Reservations"
                onClick={handleReservations}

            />
            <IconButton
                className="bi bi-building-fill"
                text="Select Room"
                onClick={handleRooms}

            />
            <IconButton
                className="bi bi-door-closed justify-content-end"
                text="Logout"
                onClick={handleLogout}
            />

        </Col>
    );
}