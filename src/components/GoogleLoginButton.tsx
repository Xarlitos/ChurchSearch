import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import "../styles/GoogleLoginButton.css";

interface GoogleLoginButtonProps {
    onSuccess: (response: CredentialResponse) => void;
    onError: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onError }) => {
    return (
        <div className="google-login-button">
            <GoogleLogin onSuccess={onSuccess} onError={onError} />
        </div>
    );
};

export default GoogleLoginButton;