import React, { useEffect, useState } from "react";
import { GET_ALL, GET_ID, POST_ADD } from "../api/apiService";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const cardTextStyle = {
  maxWidth: "80%",
};

const DetailProduct = () => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId");

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const allProducts = await GET_ALL(`products`);
        setProducts(allProducts.data);

        const productData = await GET_ID(`products`, productId);
        setProduct(productData.data);

        const colorsData = await GET_ALL(`colors`);
        setColors(colorsData.data);

        const sizesData = await GET_ALL(`sizes`);
        setSizes(sizesData.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [productId]);

  const userId = localStorage.getItem("id");

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Đăng nhập để thêm giỏ hàng.");
      navigate("/login")
      return;
    }
    if (!size || !color) {
      alert("Chọn màu và size để thêm giỏ hàng.");
      return;
    }

    const convertDataSubmit = (value) => {
      return {
        id: value.id,
        productId: value.id,
        userId: userId,
        quantity: quantity,
        thumbnail: value.thumbnail,
        price: value.price,
        size: size,
        color: color,
      };
    };

    try {
      const response = await POST_ADD("carts", convertDataSubmit(product));
      console.log(response);
      alert("Product added to cart successfully!");
      setQuantity(1);
      window.location.reload();
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 5) setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleSizeSelect = (selectedSize) => setSize(selectedSize);

  const handleColorSelect = (selectedColor) => setColor(selectedColor);
  const handleProductClick = (productId) => {
    window.location.href = `/detailProduct?productId=${productId}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0 && value <= 5) {
      setQuantity(value);
    }
  };

  return (
    <section className="section-content padding-y">
      <section className="bg-white">
        <div className="container">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">Bạn đang ở đây:</div>
                <nav className="col-md-8">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                      {product.category && product.category.name}
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {product.title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <aside className="col-md-6">
            <div className="card">
              <article className="gallery-wrap">
                <div className="img-big-wrap">
                  <div>
                    <a href="#" onClick={() => setIsOpen(true)}>
                      <img
                        src={`./images/items/${product.thumbnail}`}
                        alt={product.title}
                      />
                    </a>
                  </div>
                </div>
                <div className="thumbs-wrap">
                  <a href="#" className="item-thumb">
                    <img
                      src={`./images/items/${product.thumbnail}`}
                      alt={product.title}
                    />
                  </a>
                  
                </div>
                
              </article>
            </div>
            {isOpen && (
              <Lightbox
                mainSrc={`./images/items/${product.thumbnail}`}
                onCloseRequest={() => setIsOpen(false)}
              />
            )}
          </aside>
          <main className="col-md-6">
            <article className="product-info-aside">
              <h2 className="title mt-3">{product.title}</h2>
              {/* <div className="rating-wrap my-3">
                <ul className="rating-stars">
                  <li style={cardTextStyle} className="stars-active">
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
              </div> */}
              <div className="mb-3">
                <var className="price h4">{formatPrice(product.price)}</var>
              </div>
           
              <img
                src="https://shop.mixigaming.com/wp-content/uploads/2023/11/395362325_341779731837013_8023262359953421821_n-700x400.jpg"
                alt="Example"
                style={{ width: "100%" }}
              />
              <div className="d-flex mb-4">
                <p className="text-dark font-weight-medium mb-0 mr-3">
                  Màu áo:
                </p>
                <form>
                  {colors.map((color) => (
                    <div
                      className="custom-control custom-radio custom-control-inline"
                      key={color.id}
                    >
                      <input
                        type="radio"
                        className="custom-control-input"
                        id={`color-${color.id}`}
                        name="color"
                        value={color.name}
                        onChange={() => handleColorSelect(color)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`color-${color.id}`}
                      >
                        {color.name}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
              <div className="d-flex mb-4">
                <p className="text-dark font-weight-medium mb-0 mr-3">Kích cỡ:</p>
                <form>
                  {sizes.map((size) => (
                    <div
                      className="custom-control custom-radio custom-control-inline"
                      key={size.id}
                    >
                      <input
                        type="radio"
                        className="custom-control-input"
                        id={`size-${size.id}`}
                        name="size"
                        value={size.name}
                        onChange={() => handleSizeSelect(size)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`size-${size.id}`}
                      >
                        {size.name}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
              <dl className="row">
                <dt className="col-sm-3">Danh mục</dt>
                <dd className="col-sm-9">
                  {product.category && product.category.name}
                </dd>
              </dl>
              <div class="d-flex align-items-center mb-4 pt-2">
                <div
                  class="input-group quantity mr-3"
                  style={{ width: "130px" }}
                >
                  <div class="input-group-btn">
                    <button
                      class="btn btn-primary btn-plus"
                      onClick={handleIncreaseQuantity}
                    >
                      <i class="fa fa-plus"></i>
                    </button>
                  </div>

                  <input
                    type="text"
                    class="form-control  text-center"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />

                  <div class="input-group-btn">
                    <button
                      class="btn btn-primary btn-minus"
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <i class="fa fa-minus"></i>
                    </button>
                  </div>
                </div>
                <button class="btn btn-primary px-3" onClick={handleAddToCart}>
                  <i class="fa fa-shopping-cart mr-1"></i>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </article>
          </main>
        </div>
      </div>
      <div class="container-fluid py-5">
        <div class="col">
          <div class="nav nav-tabs justify-content-center border-secondary mb-4">
            <a
              class="nav-item nav-link active"
              data-toggle="tab"
              href="#tab-pane-1"
            >
              Mô tả
            </a>

            <a class="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">
              Đánh giá (0)
            </a>
          </div>
          <div class="tab-content">
            <div class="tab-pane fade show active" id="tab-pane-1">
              <h4 class="mb-3">Mô tả sản phẩm</h4>
              <p>{product.description}</p>
            </div>

            <div class="tab-pane fade" id="tab-pane-3">
              <div class="row">
                <div class="col-md-6">
                  <h4 class="mb-4">1 review for "Colorful Stylish Shirt"</h4>
                  <div class="media mb-4">
                    <img
                      src="img/user.jpg"
                      alt="Image"
                      class="img-fluid mr-3 mt-1"
                      style={{ width: "45px" }}
                    />
                    <div class="media-body">
                      <h6>
                        John Doe
                        <small>
                          {" "}
                          - <i>01 Jan 2045</i>
                        </small>
                      </h6>
                      <div class="text-primary mb-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <i class="far fa-star"></i>
                      </div>
                      <p>
                        Diam amet duo labore stet elitr ea clita ipsum, tempor
                        labore accusam ipsum et no at. Kasd diam tempor rebum
                        magna dolores sed sed eirmod ipsum.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <h4 class="mb-4">Leave a review</h4>
                  <small>
                    Your email address will not be published. Required fields
                    are marked *
                  </small>
                  <div class="d-flex my-3">
                    <p class="mb-0 mr-2">Your Rating * :</p>
                    <div class="text-primary">
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                  </div>
                  <form>
                    <div class="form-group">
                      <label for="message">Your Review *</label>
                      <textarea
                        id="message"
                        cols="30"
                        rows="5"
                        class="form-control"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label for="name">Your Name *</label>
                      <input type="text" class="form-control" id="name" />
                    </div>
                    <div class="form-group">
                      <label for="email">Your Email *</label>
                      <input type="email" class="form-control" id="email" />
                    </div>
                    <div class="form-group mb-0">
                      <input
                        type="submit"
                        value="Leave Your Review"
                        class="btn btn-primary px-3"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid py-5">
        <div class="text-center">
          <h2 class="section-title">
            <span class="px-2">Sản phẩm tương tự</span>
          </h2>
        </div>
        <section className="row padding-y">
          {products.length > 0 &&
            products.map((row) => (
              <div className="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
                <div className="card card-product-grid">
                  <span
                   onClick={() => handleProductClick(row.id)}
                   style={{ cursor: "pointer" }}
                    className="img-wrap"
                  >
                    <img
                      src={`./images/items/${row.thumbnail}`}
                      alt={row.title}
                    />
                  </span>
                  <figcaption className="info-wrap">
                    <div>
                      <span
                      onClick={() => handleProductClick(row.id)}
                      style={{ cursor: "pointer" }}
                        className="title"
                      >
                        {row.title}
                      </span>
                    </div>
                    <div className="price h5 mt-2">{formatPrice(row.price)}</div>
                  </figcaption>
                </div>
              </div>
            ))}
        </section>
      </div>
    </section>
  );
};

export default DetailProduct;
