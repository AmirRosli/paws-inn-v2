
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { AuthContext } from "../components/AuthProvider";
import { getAuth } from "firebase/auth";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";




export default function Cart() {



    // NEW RECOMMENDATION

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    // console.log("m:", currentUser)
    // console.log("data:", data)

    useEffect(() => {
        const fetchReservation = async (userId) => {
            try {
                const response = await fetch(`https://eea21eef-cffb-483f-8dbe-dbe7123206b0-00-1vsza6zufsofs.riker.replit.dev/reservations/user/${userId}`);
                const responseData = await response.json();
                setData(responseData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        if (!currentUser) {
            navigate("/login");
        } else {
            setLoading(true);
            fetchReservation(currentUser.uid);
        }
    }, [currentUser, navigate]);

    const auth = getAuth();

    const handleLogout = () => {
        auth.signOut();
    };


    const handleDelete = async (userId) => {
        try {
            await axios.delete(`https://eea21eef-cffb-483f-8dbe-dbe7123206b0-00-1vsza6zufsofs.riker.replit.dev/reservations/${userId}`);
            window.alert("Reservation deleted!");
            navigate("/cart");
        } catch (error) {
            console.log("Error deleting reservation:", error);
        }
    };


    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51P9OaE01k9Ov39NRPtF1aq9222DZ9URGZBSTPW9V7BiCO71nPpizheriZaWoxJeLvMXJznwez8sUWITkmF54sjVa00Ai3KO8DY");
        const body = {
            products: data
        };
        const headers = {
            "Content-Type": "application/json"
        };
        const response = await fetch("https://eea21eef-cffb-483f-8dbe-dbe7123206b0-00-1vsza6zufsofs.riker.replit.dev/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });
        if (result.error) {
            console.log(result.error);
        }
    };



    return (
        <>
            <SideBar handleLogout={handleLogout} />

            <div className="cart-container">


                <h2>Reservation Cart</h2>
                {loading && loading ? (
                    <p>Loading...</p>
                ) : data.length === 0 ? (
                    <div className="cart-empty">
                        <p>Your cart is currently empty</p>
                        <div className="start-shopping">
                            <Link to="/rooms">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-arrow-left"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                    />
                                </svg>
                                <span>Start Boarding</span>
                            </Link>
                            <p>cart is empty</p>
                        </div>
                    </div>
                ) : (
                    <div>

                        <div className="titles">
                            <h3 className="product-title">Product</h3>
                            <h3 className="quantity">Check-In Date</h3>
                            <h3 className="quantity">Check-Out Date</h3>
                            <h3 className="total">Total</h3>
                        </div>
                        <div className="cart-items">
                            {data.length && data.map((reservation) => (
                                <div className="cart-item" key={reservation.user_id}>
                                    <div className="cart-product">
                                        {/* <img src={reservation.image} alt={reservation.name} /> */}
                                        <div>
                                            <h3>{reservation.selected_room}</h3>
                                            <p>Guest Name: {reservation.guest_name}</p>
                                            <p>Contact No: {reservation.phone_number}</p>
                                            <button onClick={() => handleDelete(reservation.user_id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-product-quantity">
                                        {reservation.check_in}
                                    </div>
                                    <div className="cart-product-quantity">
                                        {reservation.check_out}
                                    </div>
                                    <div className="cart-product-total-price">
                                        RM{reservation.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">

                            <button className="clear-btn" >
                                Clear Cart
                            </button>
                            <div className="cart-checkout">
                                <div className="subtotal">
                                    {/* <span>Subtotal: RM{}</span> */}
                                    {/* <span className="amount">RM{reservation.cartTotalAmount}</span> */}
                                </div>
                                <p>Taxes and shipping calculated at checkout</p>
                                <button onClick={makePayment}>Check out</button>
                                <div className="continue-shopping">
                                    <Link to="/">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="bi bi-arrow-left"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                            />
                                        </svg>
                                        <span>Continue Shopping</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )


}