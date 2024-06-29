import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GET_PAGE } from "../api/apiService";
// import imgNoSearch from '../assets/images/empty-search.webp';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allResultsLoaded, setAllResultsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLoadMore = async () => {
    try {
      if (allResultsLoaded) {
        return;
      }

      const nextPage = currentPage + 1;
      const products = await GET_PAGE(
        "products",
        nextPage - 1,
        10,
        null,
        null,
        searchQuery
      );

      if (products.data.length === 0) {
        setAllResultsLoaded(true);
        return;
      }

      const newResults = products.data;

      setAllProducts((prevProducts) => [...prevProducts, ...newResults]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("title");
    setSearchQuery(query);

    // Chỉ thực hiện fetch dữ liệu khi có sự thay đổi trong searchQuery
    if (query && query !== searchQuery) {
      setLoading(true);
      setCurrentPage(1); // Reset trang về 1 khi có sự thay đổi searchQuery
      setAllResultsLoaded(false);

      const fetchSearchResults = async () => {
        try {
          const products = await GET_PAGE("products", 0, 10, null, null, query);
          setAllProducts(products.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [location.search, searchQuery]);

  const filteredResults = allProducts.filter((row) =>
    row.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                      <a>Trang tìm kiếm</a>
                    </li>
                  </ol>
                </nav>
              </div>
              <header className="mb-3">
              <div className="form-inline">
                <strong className="mr-md-auto">
                  Kết quả tìm kiếm: {`${searchQuery}`}
                </strong>
              </div>
            </header>
            </div>
           
          </div>
         
        </div>
        
      </section>
    
      
      <div className="container">
        {filteredResults.length > 0 ? (
          <>
            <div className="row">
              {filteredResults.map((row) => (
                <div className="col-md-3" key={row.id}>
                  <figure className="card card-product-grid">
                    <div className="img-wrap">
                      {/* <span className="badge badge-danger"> MỚI </span> */}
                      <a
                        href={`/detailProduct?productId=${row.id}`}
                        className="img-wrap"
                        style={{
                          height: "300px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      >
                        <img
                          src={`./images/items/${row.thumbnail}`}
                           className="img-fluid"
                          alt={row.title}
                        />
                      </a>
                    </div>
                    <figcaption className="info-wrap">
                      <a href="#" className="title mb-2">
                        {row.title}
                      </a>
                      <div className="price-wrap">
                        <span className="price">${row.price}</span>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary mb-3"
              style={{ marginLeft: "590px" }}
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </>
        ) : (
          <div className="container d-flex flex-column align-items-center justify-content-center mt-3">
            <>
              <img src={""} alt="No search results" />
              <p className="mt-3 mb-3">Không có sản phẩm bạn cần tìm.</p>
            </>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
