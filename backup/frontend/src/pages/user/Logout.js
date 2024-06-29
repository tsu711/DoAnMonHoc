import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa token khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("fullname");

        // Thực hiện các xử lý khác nếu cần thiết (ví dụ: chuyển hướng người dùng)
        // ...

        // Hiển thị thông báo đăng xuất thành công (tuỳ chọn)
        alert("Logout successful");

        // Chuyển hướng người dùng (ví dụ: trở về trang đăng nhập)
        navigate("/");
   
    };

    return (
            <div>
                 <button onClick={handleLogout}>Logout</button>
            </div>
    );
};

export default Logout;
