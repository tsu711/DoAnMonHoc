import React, { useEffect, useState } from "react";
import { GET_ALL, GET_ID, POST_ADD } from "../api/apiService";
import { useLocation, Link, useNavigate } from "react-router-dom";

const cardTextStyle = {
  maxWidth: "80%",
};

const DetailProduct = () => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const sizesData = ["S", "M", "L", "XL"];
  const [selectedColor, setSelectedColor] = useState("");
  const colorsData = ["Trắng", "Đen"];
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId");

  useEffect(() => {
    GET_ALL(`products`).then((item) => setProducts(item.data));
    GET_ID(`products`, productId).then((item) => setProduct(item.data));
    // Fetch cart items from the new API
 
  }, [productId]);

  const userId = localStorage.getItem("id");
  console.log(userId)
  const handleAddToCart = async () => {
    if (!userId ) {
      console.error("Product is not defined or does not have an id.");
      return;
    }

    const convertDataSubmit = (value) => {
      return {
        id: value.id,
        productId:value.id,
        userId:userId,
        quantity: quantity,
        thumbnail: product.thumbnail,
        price:product.price,
        size: selectedSize,
        color: selectedColor,
      };
  };
console.log(userId?.id)

    try {
      const response = await POST_ADD("carts", convertDataSubmit(product));
      console.log(response);
      alert("Product added to cart successfully!");
      setQuantity(1);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
    window.location.reload();
  };

  const handleIncreaseQuantity = () => setQuantity(quantity + 1);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleColorSelect = (color) => setSelectedColor(color);

  return (
    <section>
      <section className="py-3 bg-light">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a>Home</a>
            </li>
            <li className="breadcrumb-item">
              <a>{product.category && product.category.name}</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.title}
            </li>
          </ol>
        </div>
      </section>
      <section className="section-content bg-white padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-md-6">
              <div className="card">
                <article className="gallery-wrap">
                  <div className="img-big-wrap">
                    <div>
                      <a href="#">
                        <img src={`./images/items/${product.thumbnail}`} />
                      </a>
                    </div>
                  </div>
                  <div className="thumbs-wrap">
                    <a href="#" className="item-thumb">
                      <img src={`./images/items/${product.thumbnail}`} />
                    </a>
                  </div>
                </article>
              </div>
            </aside>
            <main className="col-md-6">
              <article className="product-info-aside">
                <h2 className="title mt-3">{product.title} </h2>
                <div className="rating-wrap my-3">
                  <ul className="rating-stars">
                    <li jstyle={cardTextStyle} className="stars-active">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                  <small className="label-rating text-muted">132 reviews</small>
                  <small className="label-rating text-success">
                    <i className="fa fa-clipboard-check"></i> 154 orders
                  </small>
                </div>
                <div className="mb-3">
                  <var className="price h4">{product.price}</var>
                  <span className="text-muted">USD</span>
                </div>
                <p>{product.description}</p>
                <img
                  src={`https://shop.mixigaming.com/wp-content/uploads/2023/11/395362325_341779731837013_8023262359953421821_n-700x400.jpg`}
                />
                <ul className="navbar-nav ml-md-auto">
                  <li
                    className="nav-item dropdown "
                    aria-labelledby="navbarDropdown"
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Kích cỡ:{selectedSize && <a> {selectedSize}</a>}
                    </a>

                    <div className="dropdown-menu">
                      {sizesData.map((size, index) => (
                        <a
                          key={index}
                          className="dropdown-item"
                          href=""
                          onClick={(e) =>{
                            e.preventDefault();
                            handleSizeSelect(size)}
                          }
                          
                        >
                          {size}
                        </a>
                      ))}
                    </div>
                  </li>
                </ul>
                <ul className="navbar-nav ml-md-auto">
                  <li
                    className="nav-item dropdown "
                    aria-labelledby="navbarDropdown"
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Màu sắc:{selectedColor && <a> {selectedColor}</a>}
                    </a>

                    <div className="dropdown-menu">
                      {colorsData.map((color, index) => (
                        <a
                          key={index}
                          className="dropdown-item"
                          href="#"
                          onClick={(e) =>{
                            e.preventDefault();
                             handleColorSelect(color)}}
                        >
                          {color}
                        </a>
                      ))}
                    </div>
                  </li>
                </ul>

                <dl className="row">
                  <dt className="col-sm-3">Danh mục</dt>

                  <a>{product.category && product.category.name}</a>
                </dl>
                <div className="form-row mt-4">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-primary"
                      onClick={handleIncreaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      style={{ width: "100px" }} // Thêm class custom-input
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1} // Disable button khi quantity <= 1
                    >
                      -
                    </button>
                  </div>
                  <div className="form-group col-md">
                    <a className="btn btn-primary">
                      <i className="fas fa-shopping-cart"></i>{" "}
                      <span onClick={handleAddToCart}>Thêm vào giỏ hàng</span>
                    </a>
                    <a href="#" className="btn btn-light">
                      <i className="fas fa-envelope"></i>{" "}
                      <span className="text">Contact supplier</span>
                    </a>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </section>
      <section className="section-name padding-y bg">
        <div className="container">
          <h5 className="title-description">Đánh giá</h5>

          <h5 className="title-description">Sản phẩm tương tự</h5>
          <div className="row">
            {products.length > 0 &&
              products.map((row) => (
                <div className="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
                  <div className="card card-product-grid">
                    <Link
                      to={`/detailProduct?productId=${row.id}`}
                      className="img-wrap"
                    >
                      <img src={`./images/items/${row.thumbnail}`} />{" "}
                    </Link>
                    <figcaption className="info-wrap">
                      <div>
                        <Link
                          to={`/detailProduct?productId=${row.id}`}
                          className="title"
                        >
                          {row.title}
                        </Link>
                      </div>
                      <div className="price h5 mt-2">${row.price}</div>
                    </figcaption>
                  </div>
                </div>
              ))} 
          </div>
        </div>
      </section>
    </section>
  );
};

export default DetailProduct;
