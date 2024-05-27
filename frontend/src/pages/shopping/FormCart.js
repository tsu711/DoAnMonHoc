import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const FormCart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    note: "",
    order_date: "",
    thumbnail: "",
    total_money: "", // Initialize total_money
    shipping_method: "cod", // Default shipping method
  });

  // Lấy thông tin người dùng từ localStorage trong trang form
  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    const fullname = localStorage.getItem("fullname") || "";
    const address = localStorage.getItem("address") || "";
    const phone_number = localStorage.getItem("phone_number") || "";

    setFormData((prevData) => ({
      ...prevData,
      email: email,
      fullname: fullname,
      address: address,
      phone_number: phone_number,
    }));
  }, []);

  useEffect(() => {
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Định dạng ngày thành yyyy-MM-dd

    // Calculate total money based on the cart items
    const totalMoney = cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.price * currentItem.quantity,
      0
    );
    // Get thumbnails from cart items
    const thumbnails = cartItems.map((item) => item.thumbnail);
    // Update form data with cart information
    setFormData((prevData) => ({
      ...prevData,
      total_money: totalMoney,
      order_date: formattedDate,
      thumbnail: thumbnails.join(", "), // Join thumbnails into a string separated by commas
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      formData.fullname.trim() === "" ||
      formData.email.trim() === "" ||
      formData.phone_number.trim() === "" ||
      formData.address.trim() === ""
    ) {
      alert("Vui lòng điền đầy đủ thông tin trước khi đặt hàng.");
      return; // Stop the submission process
    }

    if (formData.shipping_method === "payment") {
      try {
        // Create payment request to the backend
        const response = await axios.get(
          "http://localhost:8080/api/payment/create_payment"
        );
        const { status, messenge, url } = response.data;
        if (status === "OK" && url) {
          // Redirect user to the payment URL
          window.location.href = url;
        } else {
          alert("Failed to retrieve payment URL: " + messenge);
        }
      } catch (error) {
        console.error("Error creating payment:", error);
        alert("An error occurred while creating the payment");
      }
    }  
      // Handle COD payment
      try {
        const response = await fetch("http://localhost:8080/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Successful response, handle success logic
          console.log("Order placed successfully!");
          // Clear the form after successful submission
          setFormData({
            fullname: "",
            email: "",
            phone_number: "",
            address: "",
            note: "",
            order_date: "",
            thumbnail: "",
            total_money: "",
            shipping_method: "cod",
          });

          // Remove cart items from localStorage
          localStorage.removeItem("cartItems");

          // Display success message to the user
          alert("Đặt hàng thành công!");

          // Redirect after successful submission
          navigate("/");
          window.location.reload();
        } else {
          // Handle errors from the server
          console.error(
            "Error placing order:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error:", error.message);
      }
    
  };

  return (
    <div className="container">
      <h2>Thông tin đặt hàng</h2>
      <form onSubmit={handleSubmit} method="POST">
        <div className="form-group">
          <label htmlFor="fullname">Họ và tên:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className="form-control"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Số điện thoại:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="form-control"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ giao hàng:</label>
          <textarea
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Ghi chú:</label>
          <textarea
            id="note"
            name="note"
            className="form-control"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="order_date">Ngày đặt hàng:</label>
          <input
            type="date"
            id="order_date"
            name="order_date"
            className="form-control"
            value={formData.order_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail">Hình ảnh:</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            className="form-control"
            value={formData.thumbnail}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="total_money">Tổng số tiền:</label>
          <input
            type="text"
            id="total_money"
            name="total_money"
            className="form-control"
            value={formData.total_money}
            onChange={handleChange}
            readOnly // Make the input read-only
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipping_method">Phương thức thanh toán:</label>
          <select
            id="shipping_method"
            name="shipping_method"
            className="form-control"
            value={formData.shipping_method}
            onChange={handleChange}
          >
            <option value="cod">COD</option>
            <option value="payment">Payment</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Đặt hàng
        </button>
      </form>
    </div>
  );
};

export default FormCart;
