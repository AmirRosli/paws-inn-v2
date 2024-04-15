import { getAuth } from "firebase/auth";
import { Container, Row } from "react-bootstrap";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
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

    // // check for authToken immediately upon component mount and whenever authToken changes
    // useEffect(() => {
    //     if (!authToken) {
    //         navigate("/login"); // redirect to login if no auth token is present
    //     }
    // }, [authToken, navigate]);

    // const handleLogout = () => {
    //     setAuthToken(""); // clear token from localStorage
    // };









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