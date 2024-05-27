import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GET_PAGE, GET_ID } from "../api/apiService";
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
    return pageNumbers;
  };
  useEffect(() => {
    if (categoryId === "null") {
      categoryId = null;
    }
    GET_PAGE(`products`, currentPage - 1, numItems, categoryId).then(
      (response) => {
        setProducts(response.data);
        const contentRangeHeader = response.headers["content-range"];
        const [, totalItems] = contentRangeHeader.match(/\/(\d+)/);
        const calculatedTotalPages = Math.ceil(totalItems / numItems);
        setTotalPages(calculatedTotalPages);
      }
    );
    if (categoryId !== null) {
      GET_ID(`categories`, categoryId).then((item) => setCategories(item.data));
    } else {
      setCategories({ name: "Tất cả sản phẩm" });
    }
  }, [categoryId, currentPage]);
  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2"> Bạn đang ở đây: </div>
              <nav className="col-md-8">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>{categories.name}</a>
                  </li>
                </ol>
              </nav>
              {/*<!-- col.// -->*/}
            </div>
            {/*<!-- row.// -->*/}
            <hr />
            <header className="mb-3">
              <div className="form-inline">
                <strong className="mr-md-auto">Kết quả tiềm kiếm: </strong>
                  <select className="mr-2 form-control">
                    <option>Giá tăng dần</option>
                    <option>Giá giảm dần</option>
                    <option>Bán chạy</option>
                    <option>Hàng mới</option>
                  </select>
                
              </div>
            </header>
            {/*<!-- Tiêu đề phía trên -->*/}
            <div className="row">
              {products.length > 0 &&
                products.map((row) => (
                  <div className="col-md-3">
                    <figure className="card card-product-grid">
                      <div className="img-wrap">
                        <span className="badge badge-danger"> MỚI </span>
                        <Link
                  to={`/detailProduct?productId=${row.id}`}
                  class="img-wrap"
                >
                  <img src={`./images/items/${row.thumbnail}`} />
                </Link>
                      </div>
                      {/*<!-- img-wrap.// -->*/}
                      <figcaption className="info-wrap">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="title mb-2">
                          {row.title}
                        </a>
                        <div className="price-wrap">
                          <span className="price">${row.price}</span>
                          <small className="text-muted">/mỗi sản phẩm</small>
                        </div>
                        {/*<!-- price-wrap.// -->*/}
                        <p className="mb-2">
                          2 Cái{" "}
                          <small className="text-muted">
                            (Số lượng tối thiểu)
                          </small>
                        </p>
                       
                        <hr />
                        <p className="mb-3">
                          
                          <span className="tag"> 23 đánh giá </span>
                         
                        </p>
                       
                      </figcaption>
                    </figure>
                  </div>
                ))}
            </div>
            {/*<!-- Hết dòng -->*/}
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
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
            <div className="box text-center">
              
            </div>
          </div>
          {/*<!-- container .// -->*/}
        </div>
      </div>
    </section>
  );
};
export default FilterTop;
