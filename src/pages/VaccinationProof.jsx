import { getAuth } from "firebase/auth";
import { Col, Container, Row } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

import { AuthContext } from "../components/AuthProvider";
import VaccinantionItem from "../components/VaccinantionItem";





export default function VaccinationProof() {
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
                        <VaccinantionItem />
                    </Container>
                </Row>
            </Col>
        </>
    )
}