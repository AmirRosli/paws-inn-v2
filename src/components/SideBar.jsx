import { Col } from "react-bootstrap";
import IconButton from "./IconButton";
import { useContext } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthContext } from "../components/AuthProvider";





export default function SideBar({ handleLogout }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isProfilePage = location.pathname === "/profilepage";
    const { currentUser } = useContext(AuthContext);
    const storedImageUrl = localStorage.getItem(`uploadedImageUrl_${currentUser.uid}`);


    const handleReservations = () => {
        navigate("/reservationsPage")
    }

    const handleRooms = () => {
        navigate("/rooms")
    }



    return (
        <>
            <Col
                sm={2}
                className="d-flex flex-column justify-content-start align-items-start bg-light vh-100"
                style={{ position: "sticky", top: 0 }}
            >

                {!isProfilePage && (
                    <Link to="/profilepage">
                        {storedImageUrl ? (
                            <img src={storedImageUrl} alt="Profile" style={{ width: "100px", height: "100px", marginLeft: "25px", borderRadius: "50%" }} />
                        ) : (
                            <i className="bi bi-person-circle text-muted" style={{ fontSize: "100px", marginLeft: "25px" }}></i>
                        )}
                    </Link>
                )}

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
        </>
    );
}