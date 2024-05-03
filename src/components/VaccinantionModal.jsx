import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export default function VaccinationModal({ show, handleClose }) {
    const url = "https://eea21eef-cffb-483f-8dbe-dbe7123206b0-00-1vsza6zufsofs.riker.replit.dev"
    const { currentUser } = useContext(AuthContext);
    const [certificatesFile, setCertificatesFile] = useState(null);
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
        const storedImageUrl = localStorage.getItem(`uploadedCertificateUrl_${currentUser.uid}`);
        if (storedImageUrl) {
            setPreviewUrl(storedImageUrl);
        }
    }, [currentUser]);

    const uploadImage = async (certificateFile) => {
        try {
            if (!certificateFile) {
                return null;
            }

            const certificatefileName = certificateFile.name;
            console.log("File Name:", certificatefileName);

            const imageRef = ref(storage, `usercertificates/${certificatefileName}`);
            await uploadBytes(imageRef, certificateFile);
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
        if (!certificatesFile) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }

        setLoading(true);

        try {
            const imageUrl = await uploadImage(certificatesFile);

            if (imageUrl) {
                const response = await axios.post(`${url}/usercertificates`, {
                    imageurl: imageUrl,
                    username: username
                });
                console.log(response.data);
                setPreviewUrl(imageUrl);
                // Save the uploaded image URL to local storage
                localStorage.setItem(`uploadedCertificateUrl_${currentUser.uid}`, imageUrl);
                window.alert('Image uploaded successfully!')
                handleClose();


            }

        } catch (error) {
            console.error('Error adding image:', error);
        } finally {
            setLoading(false);
        }
    };



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setCertificatesFile(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(imageUrl);
        setShowMessage(false);

    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="profileimage">
                            <Form.Label style={{ fontFamily: "Arial", fontWeight: "bold" }}>Upload Image:</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/jpeg"
                                onChange={handleFileChange}
                                disabled={loading}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Col md={6} className="text-center">
                        {showMessage && <p className="text-danger">Please attach an image.</p>}
                        <Button variant="primary" onClick={handleSubmit} disabled={loading} style={{ backgroundColor: "#007bff", borderRadius: "8px", fontSize: "16px" }}>
                            {loading ? 'Uploading...' : 'Upload Image'}
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    )
}