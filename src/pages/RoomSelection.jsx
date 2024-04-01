import { Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import SideBar from "../components/SideBar";
import RoomItem from "../components/RoomItem";

export default function RoomSelection() {
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









    return (
        <>
            <Container>
                <Row>
                    <SideBar handleLogout={handleLogout} />
                    <RoomItem />
                </Row>
            </Container>
        </>
    )
}