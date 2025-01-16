import React from "react";
import "../styles/UserInfo.css"

interface UserInfoProps {
    name: string;
    avatarUrl: string;
    onLogout: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, onLogout }) => {
    const sampleAvatarUrl = "/avatar.png"; // Przykładowy link do obrazka

    return (
        <div className="user-info">
            <img src={sampleAvatarUrl} alt={`${name}'s avatar`} className="user-avatar" />
            <p className="user-name">Welcome, {name}</p>
            <button onClick={onLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default UserInfo;