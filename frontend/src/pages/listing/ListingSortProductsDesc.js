import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GET_PAGE, GET_ID, GET_SORT_PAGE } from "../api/apiService";
const FilterTop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const numItems = 8;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  let categoryId = queryParams.get("categoryId");
  const handlePageChange = (page) => {
    // Navigate to a new URL with the updated page parameter
    navigate(`/listing?page=${page}&categoryId=${categoryId}`);
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <Link
            className="page-link"
            to={`?page=${i}&categoryId=${categoryId}`}
            onClick={(event) => handlePageChange(i, event)}
          >
            {i}
          </Link>
        </li>
      );
    }
    window.scrollTo(0, 0);
    return pageNumbers;
  };
  useEffect(() => {
    if (categoryId === "null") {
      categoryId = null;
    }
    GET_SORT_PAGE(
      `products/price-range?sortOption=price-desc&minPrice=79000&maxPrice=100000`,
      currentPage - 1,
      numItems,
      categoryId
    ).then((response) => {
      setProducts(response.data);
      const contentRangeHeader = response.headers["content-range"];
      const [, totalItems] = contentRangeHeader.match(/\/(\d+)/);
      const calculatedTotalPages = Math.ceil(totalItems / numItems);
      setTotalPages(calculatedTotalPages);
    });
    if (categoryId !== null) {
      GET_ID(`categories`, categoryId).then((item) => setCategories(item.data));
    } else {
      setCategories({ name: "Tất cả sản phẩm" });
    }
  }, [categoryId, currentPage]);

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    if (selectedSort === "price-asc") {
      navigate("/listingSortAsc");
    }
    if (selectedSort === "price-desc") {
      navigate("/listingSortDesc");
    }
    if (selectedSort === "price-default") {
      navigate("/listing");
    }
  };
  const handleProductClick = (productId) => {
    window.location.href = `/detailProduct?productId=${productId}`;
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  return (
    <section className="section-content padding-y">
      <section className="bg-white">
        <div className="container">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2"> Bạn đang ở đây: </div>
                <nav className="col-md-8">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <a>{categories.name}</a>
                    </li>
                  </ol>
                </nav>
              </div>

              <header className="mb-3">
                <div className="form-inline">
                  <strong className="mr-md-auto">Kết quả tìm kiếm: </strong>
                  <select
                    className="mr-2 form-control"
                    onChange={handleSortChange}
                  >
                     <option value="price-desc">Giá giảm dần</option>
                     <option value="price-asc">Giá tăng dần</option>
                    <option value="price-default">Mặc định</option>
                   
                   
                  </select>
                </div>
              </header>
            </div>
          </div>
        </div>
      </section>
            <div className="container">
        <div className="row">
          {products.length > 0 &&
            products.map((row) => (
              <div className="col-md-3" key={row.id}>
                <figure className="card card-product-grid">
                  <div
                    className="img-wrap"
                    onClick={() => handleProductClick(row.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* <span className="badge badge-danger"> MỚI </span> */}
                    <img
                      src={`./images/items/${row.thumbnail}`}
                      alt={row.title}
                      className="img-fluid"
                    />
                  </div>

                  <figcaption className="info-wrap">
                    <a href="#" className="title mb-2">
                      {row.title}
                    </a>
                    <div className="price-wrap">
                      <span className="price">{formatPrice(row.price)}</span>
                      <small className="text-muted">/mỗi sản phẩm</small>
                    </div>
                    {/* <p className="mb-2">
                      2 Cái{" "}
                      <small className="text-muted">(Số lượng tối thiểu)</small>
                    </p> */}

                    {/* <p className="mb-3">
                      <span className="tag"> 23 đánh giá </span>
                    </p> */}
                  </figcaption>
                </figure>
              </div>
            ))}
        </div>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Trang trước
              </button>
            </li>
            {renderPageNumbers()}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Trang sau
              </button>
            </li>
          </ul>
        </nav>
        <div className="box text-center"></div>
      </div>
    </section>
  );
};
export default FilterTop;

