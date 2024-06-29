import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Ngăn chặn việc reload trang khi submit form
    axios
      .post("http://localhost:8080/api/users/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const userData = response.data;
        if (userData) {
          // Lưu thông tin người dùng vào localStorage

          localStorage.setItem("token", userData.token); // Giả sử phản hồi có token
          localStorage.setItem("id", userData.id); // Lưu userId
          localStorage.setItem("email", userData.email);
          localStorage.setItem("phone_number", userData.phoneNumber);
          localStorage.setItem("address", userData.address);
          localStorage.setItem("fullname", userData.fullname);
          localStorage.setItem("username", userData.username);
          alert("Login successful");

          navigate("/");
          window.location.reload();
          console.log(userData);
          console.log(userData.id);
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed");
      });
  };

  // login google
  const handleLoginGoogle = (credentialResponse) => {
    try {
      const userData = jwtDecode(credentialResponse.credential); // giải mã jwt

      localStorage.setItem("token", userData.jti); // Giả sử phản hồi có token
      localStorage.setItem("id", userData.email); // Lưu userId
      localStorage.setItem("email", userData.email);
      localStorage.setItem("phone_number", userData.phoneNumber);
      localStorage.setItem("address", userData.address);
      localStorage.setItem("fullname", userData.name);
      localStorage.setItem("username", userData.username);
      // alert("Login successful");
      // navigate("/");
      // window.location.reload();
      console.log(userData)
    } catch (error) {
      console.error("Error JWT:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="659576084579-tsiki3g4jh9v3v4qg0o5hii0uc4qrnh6.apps.googleusercontent.com">
      <section className="section-content padding-y">
        <div className="card mx-auto" style={{ width: "520px" }}>
          <article className="card-body">
            <header className="mb-4">
              <h4 className="card-title">Đăng nhập</h4>
            </header>
            <form className="mx-auto" onSubmit={handleLogin}>
              <div>
                <label>Tên đăng nhập:</label>
                <input
                  required
                  className="form-control"
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label>Mật khẩu:</label>
                <input
                  required
                  className="form-control"
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary btn-block">
                    Đăng nhập
                  </button>
                </div>

                <div className="mt-3 d-flex justify-content-center">
                  <GoogleLogin
                    onSuccess={handleLoginGoogle}
                    onError={(error) => console.log(error)}
                    useOneTap
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="mt-3">
                  <a
                    href="/register"
                    className="btn btn-outline-primary btn-block"
                  >
                    Đăng ký
                  </a>
                </div>
                <a href="/forgot-password">Quên mật khẩu?</a>
              </div>
            </form>
          </article>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
};

export default Login;
