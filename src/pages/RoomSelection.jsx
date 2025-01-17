import { getAuth } from "firebase/auth";
import { Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import RoomItem from "../components/RoomItem";
import { AuthContext } from "../components/AuthProvider";





export default function RoomSelection() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    // check if currentUser is Logged In
    if (!currentUser) {
        navigate("/login");
    }

    const handleLogout = () => {
        auth.signOut();
    };


    return (
        <>
            <SideBar handleLogout={handleLogout} />
            <Col>
                <Row>
                    <Container>
                        <RoomItem />
                    </Container>
                </Row>
            </Col>
        </>
    )
}