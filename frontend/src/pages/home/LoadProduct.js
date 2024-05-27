import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";

import { Link } from "react-router-dom";
const cardTextStyle = {
  maxWidth: "80%",
};
const LoadProduct = (category) => {
  const { categoryName, categoryId } = category;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    GET_ALL(`products/getlatest?categoryid=${categoryId}`).then((item) =>
      setProducts(item.data)
    );
  }, [categoryId]);
  return (
    <section class="padding-bottom">
      <header class="section-heading mb-4">
        <h3 class="title-section">{categoryName}</h3>
      </header>
      <div class="row">
        {products.length > 0 &&
          products.map((row) => (
           <div class="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
  <div class="card card-product-grid">
    <Link to={`/detailProduct?productId=${row.id}`} class="img-wrap">
      <img src={`./images/items/${row.thumbnail}`} alt={row.title} className="img-fluid" />
    </Link>
    <figcaption class="info-wrap">
      <div class="rating-stars mb-1">
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
      </div>
      <div>
        <Link to={`/detailProduct?productId=${row.id}`} class="title">{row.title}</Link>
      </div>
      <div class="price h5 mt-2">${row.price}</div>
    </figcaption>
  </div>
</div>

          ))}
      </div>
    </section>
  );
};
export default LoadProduct;
