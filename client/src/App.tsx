import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword";
import { NotFound } from "./pages/NotFound";
import { UpdateProfileForm } from "./pages/Profile";
import RequestResetPassword from "./pages/RequestResetPassword";
import { ResetPassword } from "./pages/ResetPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<RequestResetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/settings/change-password" element={<ChangePassword />} />
      <Route path="/settings/profile" element={<UpdateProfileForm />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
