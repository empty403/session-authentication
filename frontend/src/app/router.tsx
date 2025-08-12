import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "../components/layout/AuthLayout";
import { ErrorLayout } from "../components/layout/ErrorLayout";
import { LandingPage } from "./public/landing/LandingPage";
import { LoginPage } from "./public/login/LoginPage";
import { RegisterPage } from "./public/register/RegisterPage";
import { ForgotPasswordPage } from "./public/forgot-password/ForgotPasswordPage";
import { ResetPasswordPage } from "./public/reset-password/ResetPasswordPage";
import { VerifyEmailPage } from "./public/verify-email/VerifyEmailPage";
import { ProfilePage } from "./private/profile/ProfilePage";
import { SettingsPage } from "./private/settings/SettingsPage";
import { NotFoundPage } from "./public/error/NotFoundPage";
import { ServerErrorPage } from "./public/error/ServerErrorPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route element={<ErrorLayout />}>
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
