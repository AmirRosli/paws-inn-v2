import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import RoomSelection from "./pages/RoomSelection";
import ReservationsPage from "./pages/ReservationsPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./components/AuthProvider";
import { Provider } from "react-redux";
import store from "./store";




export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/rooms" element={<RoomSelection />} />
            <Route path="/reservationsPage" element={<ReservationsPage />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}
