import "./App.css";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import DevicePage from "./pages/DeviceAvailabilityPage";
import NearestPage from "./pages/NearestCenterPage";
import DeviceCheckIn from "./pages/DeviceCheckIn";
import DeviceCheckOut from "./pages/DeviceCheckOut";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Admin from "./pages/AdminDashboardPage";
import EligibilityPage from "./pages/EligibilityPage";
import CreateDeviceForm from "./components/CreateDeviceForm";
import EditDeviceForm from "./components/EditDeviceForm";
import CreateUserForm from "./components/CreateUserForm";
import EditUserForm from "./components/EditUserForm";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/device" element={<DevicePage />} />
        <Route path="/nearest" element={<NearestPage />} />
        <Route path="/DeviceCheckIn" element={<DeviceCheckIn />} />
        <Route path="/DeviceCheckOut" element={<DeviceCheckOut />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/eligibility" element={<EligibilityPage />} />
        <Route path="/devices/edit/:id" element={<EditDeviceForm />} />
        <Route path="/devices/create" element={<CreateDeviceForm />} />
        <Route path="/users/create" element={<CreateUserForm />} />
        <Route path="/users/edit/:id" element={<EditUserForm />} />
      </Routes>
    </>
  );
}

export default App;
