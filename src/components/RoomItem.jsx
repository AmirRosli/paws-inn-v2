import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import room1 from "../assets/room1.jpg";
import room2 from "../assets/room2.jpg";
import room3 from "../assets/room3.jpg";
import Banner from "./Banner";





export default function RoomItem() {


    const navigate = useNavigate();


    const handleReserve1 = () => {
        navigate("/reserveeconomy")
    }

    const handleReserve2 = () => {
        navigate("/reservecomfy")
    }

    const handleReserve3 = () => {
        navigate("/reservesuite")
    }

    return (
        <div className='roomItem'>
            <Banner />
            <div className='roomItem_section'>
                <Container className="py-3">

                    <Row className="row-cols-1 row-cols-md-3 mb-3 text-left">
                        <Col>
                            <div className='card' onClick={handleReserve1}>
                                <img src={room1} alt="" />
                                <div className="card__info">
                                    <h2>ECONOMY</h2>
                                    <h4>Only for 1 cat </h4>
                                    <h3>RM25/night</h3>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='card' onClick={handleReserve2}>
                                <img src={room2} alt="" />
                                <div className="card__info">
                                    <h2>COMFY</h2>
                                    <h4>For 2-3 cats</h4>
                                    <h3>RM55/night</h3>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='card' onClick={handleReserve3}>
                                <img src={room3} alt="" />
                                <div className="card__info">
                                    <h2>SUITE</h2>
                                    <h4>For 3-4 cats</h4>
                                    <h3>RM75/night</h3>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        </div >

    )
}

