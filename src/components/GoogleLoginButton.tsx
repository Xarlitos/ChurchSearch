import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

interface GoogleLoginButtonProps {
  onSuccess: (response: CredentialResponse) => void;
  onError: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onError }) => {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      render={(renderProps) => (
        <Button
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          sx={{
            width: "100%", // Optional: makes the button fill available width
            boxShadow: "none",
            textTransform: "none",
          }}
        >
          Login with Google
        </Button>
      )}
    />
  );
};

export default GoogleLoginButton;