import SideBar from "../components/SideBar";
import { Form, Button, Col, Container, Row } from "react-bootstrap"
import { useState, useEffect, useContext } from "react";
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { AuthContext } from "../components/AuthProvider";
import axios from "axios"

import cat from "../assets/cat.mp4";


export default function ProfilePage() {
    const url = "https://eea21eef-cffb-483f-8dbe-dbe7123206b0-00-1vsza6zufsofs.riker.replit.dev"
    const { currentUser } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const username = currentUser.email;
                setUsername(username);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (currentUser) {
            fetchUserEmail();
        }

        // Retrieve stored image URL from local storage
        const storedImageUrl = localStorage.getItem(`uploadedImageUrl_${currentUser.uid}`);
        if (storedImageUrl) {
            setPreviewUrl(storedImageUrl);
        }
    }, [currentUser]);

    const uploadImage = async (file) => {
        try {
            if (!file) {
                return null;
            }

            const fileName = file.name;
            console.log("File Name:", fileName);

            const imageRef = ref(storage, `userimages/${fileName}`);
            await uploadBytes(imageRef, file);
            console.log("File uploaded successfully!");

            const imageURL = await getDownloadURL(imageRef);
            return imageURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) {
            return;
        }
        if (!file) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }

        setLoading(true);

        try {
            const imageUrl = await uploadImage(file);

            if (imageUrl) {
                const response = await axios.post(`${url}/userimages`, {
                    imageurl: imageUrl,
                    username: username
                });
                console.log(response.data);
                setPreviewUrl(imageUrl);
                // Save the uploaded image URL to local storage
                localStorage.setItem(`uploadedImageUrl_${currentUser.uid}`, imageUrl);
                window.alert('Image uploaded successfully!')

            }

        } catch (error) {
            console.error('Error adding image:', error);
        } finally {
            setLoading(false);
        }
    };



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(imageUrl);
        setShowMessage(false);
    };

    return (
        <>

            <SideBar />
            <video autoPlay loop muted style={{ position: "fixed", right: 0, bottom: 0, minWidth: "100%", minHeight: "100%", zIndex: -1 }}>
                <source src={cat} type="video/mp4" />
            </video>

            <div className="profile-section p-4 border text-center rounded shadow" style={{ width: "600px", height: "600px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "transparent" }}>

                <Container>
                    <Row className="justify-content-center">
                        <Col md={6} className="text-center">
                            <div className="circle-profile-image mx-auto mb-3">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Profile"
                                        className="img-thumbnail rounded-circle"
                                        style={{ width: "200px", height: "200px" }}
                                    />
                                ) : (
                                    <i className="bi bi-person-circle" style={{ fontSize: "150px" }}></i>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={6} className="text-center">
                            {showMessage && <p className="text-danger">Please attach an image.</p>}
                            <Button variant="primary" onClick={handleSubmit} disabled={loading} style={{ backgroundColor: "#007bff", borderRadius: "8px", fontSize: "16px" }}>
                                {loading ? 'Uploading...' : 'Upload Image'}
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <h2 className="mb-3" style={{ fontFamily: "Arial", fontWeight: "bold", color: "#007bff" }}>My Profile</h2>
                            <Form encType="multipart/form-data">
                                <Form.Group controlId="profileimage">
                                    <Form.Label style={{ fontFamily: "Arial", fontWeight: "bold" }}>Upload Image:</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/jpeg"
                                        onChange={handleFileChange}
                                        disabled={loading}
                                    />
                                </Form.Group>
                                <Form.Group controlId="username" >
                                    <Form.Label style={{ fontFamily: "Arial", fontWeight: "bold" }}>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        readOnly
                                        style={{ fontFamily: "Arial", fontWeight: "normal" }}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>


        </>
    );
}