import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Register =()=>{
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setfullname] = useState("");
  const [address, setaddress] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState('');


  
  const handleRegister = () => {
	if ( email != "" && password != "" && fullname != "" && address != "" && phone_number != "")
	{
		axios
		.post(`http://localhost:8080/api/users`, {
		  email,
		  password,
		  fullname,
		  address,
		  phone_number,
		})
		.then((response) => {
			const userData = response.data;
			if (userData) {
			  
	  console.log(userData)
	  console.log(userData.id)
		
        // // Lưu thông tin người dùng vào localStorage
        // localStorage.setItem("email", userData.email);
        // localStorage.setItem("fullname", userData.fullname);
        // localStorage.setItem("address", userData.address);
        // localStorage.setItem("phone_number", userData.phone_number);
	  
			  alert("Đăng ký thành công"); 
		// 	  navigate("/");
        //   window.location.reload();
			
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    })
    .catch((error) => {
      console.error(error);
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
    });
}};

		return(
			<section class="section-content padding-y">
		<div class="card mx-auto" style={{ width: '520px' }} >
			<article class="card-body">
				<header class="mb-4"><h4 class="card-title">Sign up</h4></header>
				<form class="mx-auto">
				

						<label>Họ và tên</label>
						<input required="name"
						class="form-control"
							type="fullname"
							placeholder="Họ và tên"
							value={fullname}
							onChange={(e) => setfullname(e.target.value)}
						/>


					
					
						<label>Email</label>
						<input required="email"
						class="form-control"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

					

					
						<label>Mật khẩu</label>
						<input required="Password"
						class="form-control"
							type="password"
							placeholder="Mật khẩu"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					

				
						<label>Địa chỉ</label>
						<input required="address"
						class="form-control"
							type="address"
							placeholder="Địa chỉ"
							value={address}
							onChange={(e) => setaddress(e.target.value)}
						/>
				
				
					
						<label>Số điện thoại</label>
						<input required="phone_number"
						class="form-control"
							type="phone_number"
							placeholder="Số điện thoại"
							value={phone_number}
							onChange={(e) => setphone_number(e.target.value)}
						/>
					

					<div class="mt-3">
					{error && <p className="text-danger">{error}</p>}
<button    onClick={handleRegister} type="submit" class="btn btn-primary btn-block"> Register  </button>
					</div>
					
				</form>
			</article>
		</div>
		

		</section>

		);


};
export default Register