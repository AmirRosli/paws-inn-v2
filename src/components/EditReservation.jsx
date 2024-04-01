import { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";



export default function EditReservation({ edit, user, show, handleClose }) {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        guest_name: edit.guest_name,
        phone_number: edit.phone_number,
        check_in: edit.check_in,
        check_out: edit.check_out
    });

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`https://a86e4163-1534-4571-9ce4-f6d2b231320e-00-elrlyh4fb5uj.janeway.replit.dev/reservations/${user.id}`, formData);
            setEditMode(false);
            handleClose();
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className="edit-reservation">
                    {editMode ? (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Edit Reservation</h2>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="guest_name"
                                    value={formData.guest_name}
                                    onChange={handleChange}
                                />
                                <label>Phone Number:</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                />
                                <label>Check In Date:</label>
                                <input
                                    type="date"
                                    name="check_in"
                                    value={formData.check_in}
                                    onChange={handleChange}
                                />
                                <label>Check Out Date:</label>
                                <input
                                    type="date"
                                    name="check_out"
                                    value={formData.check_out}
                                    onChange={handleChange}
                                />
                                <button onClick={handleSubmit}>Save</button>
                            </div>
                        </div>
                    ) : (
                        <div className="booking-details">
                            <h2>{edit.guest_name}</h2>
                            <p>Guest Name: {edit.guest_name}</p>
                            <p>Phone Number: {edit.phone_number}</p>
                            <p>Check In Date: {edit.check_in}</p>
                            <p>Check Out Date: {edit.check_out}</p>
                            <button onClick={handleEdit}>Edit</button>
                        </div>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}