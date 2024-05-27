import React, { useState } from "react";
import Content from "../pages/detailProduct/Content";
import Cart from "../pages/shopping/Cart";




const DetailProduct = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const existingItemIndex = cart.findIndex((item) => item.id === product.id);
      
        if (existingItemIndex !== -1) {
          // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += 1;
          setCart(updatedCart);
        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào
          setCart((prevCart) => [
            ...prevCart,
            {
              id: product.id,
              name: product.name,
              image: product.image, // Thêm URL hình ảnh ở đây
              quantity: 1,
              price: product.price,
              // Thêm các chi tiết sản phẩm khác nếu cần
            },
          ]);
        }
      };

return(
    <div>
      <Content addToCart={addToCart} />
      <Cart cart={cart} />
     
    </div>
    
  );
};
export default DetailProduct