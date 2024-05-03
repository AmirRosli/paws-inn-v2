import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import RoomSelection from "./pages/RoomSelection";
import ReservationsPage from "./pages/ReservationsPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./components/AuthProvider";



import ReserveEconomy from "./pages/ReserveEconomy";
import Cart from "./pages/Cart";

import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import ReserveComfy from "./pages/ReserveComfy";
import ReserveSuite from "./pages/ReserveSuite";
import VaccinationProof from "./pages/VaccinationProof";





export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>

        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/rooms" element={<RoomSelection />} />
            {/* <Route path="/reservationsPage" element={<ReservationsPage />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-success" element={<ReservationsPage />} />


            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/vaccinationproof" element={<VaccinationProof />} />

            <Route path="/reserveeconomy" element={<ReserveEconomy />} />
            <Route path="/reservecomfy" element={<ReserveComfy />} />
            <Route path="/reservesuite" element={<ReserveSuite />} />



            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>

    </AuthProvider>
  )
}
