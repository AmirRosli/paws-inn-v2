import IconButton from "./IconButton";
import { useContext } from "react"
import { Link, useLocation } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthContext } from "../components/AuthProvider";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";







export default function SideBar({ handleLogout }) {

    const location = useLocation();
    const isProfilePage = location.pathname === "/profilepage";
    const { currentUser } = useContext(AuthContext);
    const storedImageUrl = localStorage.getItem(`uploadedImageUrl_${currentUser.uid}`);

    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav",
        );
    };





    return (
        <>

            <header>

                {!isProfilePage && (
                    <Link to="/profilepage">
                        {storedImageUrl ? (
                            <img src={storedImageUrl} alt="Profile" style={{ width: "60px", height: "60px", marginLeft: "25px", borderRadius: "50%" }} />
                        ) : (
                            <i className="bi bi-person-circle text-muted" style={{ fontSize: "60px", marginLeft: "25px" }}></i>
                        )}
                    </Link>
                )}



                <nav ref={navRef}>
                    <a href="/checkout-success">Manage Reservations</a>
                    <a href="/vaccinationproof">Vaccine Certs</a>

                    <a href="/rooms">Cat Boarding</a>
                    <a href="/cart">Reservation Cart</a>




                    <IconButton
                        className="bi bi-door-closed justify-content-end"
                        text="Logout"
                        onClick={handleLogout}
                    />


                    <button
                        className="nav-btn nav-close-btn"
                        onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>
                <button
                    className="nav-btn"
                    onClick={showNavbar}>
                    <FaBars />
                </button>
            </header>
        </>
    );
}