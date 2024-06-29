import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkUsernameExists = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/check-username/${username}`);
      if (response.status === 200) {
        return false;
      }
    } catch (error) {
      console.error("Error checking username:", error);
    }
    return true; 
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhoneNumber = (phone_number) => {
    const re = /^\d{10,11}$/; // Assuming Vietnamese phone numbers (10 or 11 digits)
    return re.test(String(phone_number));
  };

  const validateFullname = (fullname) => {
    const re = /^[^\d]+$/; // Regex to ensure no digits
    return re.test(fullname);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setError(""); // Clear any previous errors

      if (!email || !password || !confirmPassword || !username || !fullname || !address || !phone_number) {
        setError("Please fill in all fields");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }

      if (!validatePhoneNumber(phone_number)) {
        setError("Please enter a valid phone number (10-11 digits)");
        return;
      }

      if (!validateFullname(fullname)) {
        setError("Full name should not contain numbers");
        return;
      }

      if (username.includes(" ")) {
        setError("Username should not contain spaces");
        return;
      }

      // Check if username exists
      const usernameExists = await checkUsernameExists();
      if (usernameExists) {
        setError("Tên đăng nhập đã tồn tại");
        return;
      }

      // Proceed with registration if all validations pass
      const response = await axios.post("http://localhost:8080/api/users", {
        email,
        password,
        username,
        fullname,
        address,
        phone_number,
      });

      const userData = response.data;
      if (userData) {
        alert("Registration successful");
        navigate("/login");
        console.log(userData);
        window.scrollTo(0, 0);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="section-content padding-y">
      <div className="card mx-auto" style={{ width: "520px" }}>
        <article className="card-body">
          <header className="mb-4">
            <h4 className="card-title">Đăng ký</h4>
          </header>
          <form onSubmit={handleRegister} className="mx-auto">
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <input
                className="form-control"
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={20}
                required
              />
            </div>
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                className="form-control"
                type="text"
                placeholder="Họ và tên"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                maxLength={50}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={50}
                required
              />
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                className="form-control"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                maxLength={20}
                required
              />
            </div>
            <div className="form-group">
              <label>Xác nhận mật khẩu</label>
              <input
                className="form-control"
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                maxLength={20}
                required
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                className="form-control"
                type="text"
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={100}
                required
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                className="form-control"
                type="tel"
                placeholder="Số điện thoại"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={11}
                required
              />
            </div>
            <div className="mt-3">
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
};

export default Register;
