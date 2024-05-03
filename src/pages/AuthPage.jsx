import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth"
import { useState, useContext } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import pawsinnhomepage from "../assets/pawsinnhomepage.png";


export default function AuthPage() {
    // const loginImage = url("./assets/bimage2.jpg");
    // const url = "https://a86e4163-1534-4571-9ce4-f6d2b231320e-00-elrlyh4fb5uj.janeway.replit.dev";

    // Possible values: null(no modal shows), "Login", "SignUp"
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);


    const navigate = useNavigate();



    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            );
            console.log(res.user);
            handleClose();
            window.alert("You have successfully signed up as a user!");
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            const uid = userCredential.user.uid;

            // Store the UID as a token in local storage
            localStorage.setItem('token', uid);

            if (currentUser) {
                navigate("/rooms");
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleClose = () => setModalShow(null);
    return (
        <Row>
            <Col sm={6}>
                <Image src={pawsinnhomepage} fluid />
            </Col>
            <Col sm={6} className="p-4">
                <i className="" style={{ fontSize: 50, color: "dodgerblue" }}></i>

                <p className="mt-5" style={{ fontSize: 100 }}>Paws Inn</p>
                <h2 className="my-5" style={{ fontSize: 26 }}>Own by cats, run by humans.</h2>

                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-google">Sign Up with Google</i>
                    </Button>
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple">Sign Up with Apple</i>
                    </Button>
                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="btn btn-warning" onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    <p style={{ fontSize: "12px" }}>
                        By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use
                    </p>

                    <p className="mt-5" style={{ fontWeight: "bold" }}>
                        Already have an account?
                    </p>
                    <Button
                        className="btn btn-outline-secondary"
                        variant="outline-primary"
                        onClick={handleShowLogin}
                    >
                        Sign In
                    </Button>

                </Col>
                <Modal
                    show={modalShow !== null}
                    onHide={handleClose}
                    animation={false}
                    centered
                >
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === " SignUp"
                                ? "Create your account"
                                : "Log in to your account"}
                        </h2>
                        <Form
                            className="d-grid gap-2 px-5"
                            onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                        >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="email"
                                    placeholder="Enter username"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <p style={{ fontSize: "12" }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Paws Inn may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalising our services, including ads. Leran more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                            </p>

                            <Button className="rounded-pill" type="submit">
                                {modalShow === "SignUp" ? "Sign up" : "Log in"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    );
}