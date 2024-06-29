import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear all data in localStorage
        navigate("/login");
        window.location.reload();
      };

    return (
            <div>
                 <button onClick={handleLogout}>Logout</button>
            </div>
    );
};

export default Logout;
