import { Col, Container, Row } from "react-bootstrap";


import VaccinationModal from "./VaccinantionModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";





export default function VaccinantionItem() {


    const { currentUser } = useContext(AuthContext);


    const [previewUrl, setPreviewUrl] = useState(null);
    // const [showMessage, setShowMessage] = useState(false);




    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        // Retrieve stored image URL from local storage
        const storedImageUrl = localStorage.getItem(`uploadedCertificateUrl_${currentUser.uid}`);
        if (storedImageUrl) {
            setPreviewUrl(storedImageUrl);
        }
    }, [currentUser]);






    return (
        <div className='roomItem'>
            <div className='cert_banner'>
                <div className='banner__info'>
                    <h1>Ease your check-in process NOW!</h1>
                    <h5>You are two steps away from updating Vax Certs :3</h5>

                </div>
            </div>
            <div className='roomItem_section'>
                <Container className="py-3">

                    <Row className="row-cols-1 row-cols-md-3 mb-3 text-left">
                        <Col>
                            <div className="card" onClick={handleShow}>
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Profile"
                                        style={{ width: "200px", height: "200px" }}
                                    />
                                ) : (
                                    <i className="bi bi-person-circle" style={{ fontSize: "150px" }}></i>
                                )}
                            </div>
                            <VaccinationModal show={show} handleClose={handleClose} />
                        </Col>
                    </Row>

                </Container>
            </div>
        </div >

    )
}

