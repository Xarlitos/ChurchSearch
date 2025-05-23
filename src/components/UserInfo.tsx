import React from "react";
import { Avatar, Typography, Box, Fab } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";  // Ikona do wylogowania

interface UserInfoProps {
    name: string;
    avatarUrl: string;
    onLogout: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, avatarUrl, onLogout }) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
                <Avatar src={avatarUrl} alt={`${name}'s avatar`} />
                <Typography variant="h6" component="p" marginLeft={2}>
                    Witaj, {name}
                </Typography>
            </Box>
            {/* Dodajemy przerwę między nazwiskiem a przyciskiem */}
            <Fab
                variant="extended"
                size="medium"
                color="primary"
                onClick={onLogout}
                sx={{ marginBottom: "10px", minWidth: "120px", marginLeft: 2 }}
            >
                <ExitToAppIcon sx={{ mr: 1 }} />
                <Typography variant="caption">Wyloguj się</Typography>
            </Fab>
        </Box>
    );
};

export default UserInfo;
