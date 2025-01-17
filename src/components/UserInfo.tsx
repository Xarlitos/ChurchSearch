import React from "react";
import { Avatar, Button, Typography, Box } from "@mui/material";
import "../styles/UserInfo.css";

interface UserInfoProps {
    name: string;
    avatarUrl: string;
    onLogout: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, avatarUrl, onLogout }) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" className="user-info">
            <Box display="flex" alignItems="center">
                <Avatar src={avatarUrl} alt={`${name}'s avatar`} className="user-avatar" />
                <Typography variant="h6" component="p" className="user-name" marginLeft={2}>
                    Welcome, {name}
                </Typography>
            </Box>
            <Button variant="outlined" onClick={onLogout} className="logout-button">
                Logout
            </Button>
        </Box>
    );
};

export default UserInfo;
