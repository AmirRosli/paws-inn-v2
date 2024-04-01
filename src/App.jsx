import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import RoomSelection from "./pages/RoomSelection";
import ReservationsPage from "./pages/Reservations";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rooms" element={<RoomSelection />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}
