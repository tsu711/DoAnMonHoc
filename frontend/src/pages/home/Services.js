import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";
import { Link } from "react-router-dom";

const Mixi = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const categoryId = 4; // Set this dynamically if needed
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const countdownTime = 5 * 24 * 60 * 60;

  useEffect(() => {
    // Fetch products with the specified category_id
    GET_ALL(`products/getlatest?categoryid=${categoryId}`).then((item) =>
      setProducts(item.data)
    );
    // Fetch all categories
    GET_ALL("categories").then((item) => setCategories(item.data));
    startCountdown();
  }, [categoryId]);

  const startCountdown = () => {
    const startTime = Date.now();
    const endTime = startTime + countdownTime * 1000;

    const updateCountdown = () => {
      const timeLeft = endTime - Date.now();

      if (timeLeft <= 0) {
        // Countdown has ended
        clearInterval(intervalId);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        // Calculate remaining time
        const remainingSeconds = Math.floor((timeLeft / 1000) % 60);
        const remainingMinutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const remainingHours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const remainingDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

        // Update state with remaining time
        setCountdown({
          days: remainingDays,
          hours: remainingHours,
          minutes: remainingMinutes,
          seconds: remainingSeconds,
        });
      }
    };

    // Initial call to update countdown
    updateCountdown();

    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1000);
  };

  const handleProductClick = (productId) => {
    window.location.href = `/detailProduct?productId=${productId}`;
  };

  const categoryName =
    categories.find((cat) => cat.id === categoryId)?.categoryName || "Category";

  return (
    <section className="padding-y">
      <div className="card card-deal">
        <div className="row no-gutters padding-y">
          <div className="col text-center">
            <h2 className="section-title px-5">
              <h3 className="title-section">{categoryName}</h3>
            </h2>
            <div className="timer">
              <div>
                <span className="num">{countdown.days}</span>{" "}
                <small>Days</small>
              </div>
              <div>
                <span className="num">{countdown.hours}</span>{" "}
                <small>Hours</small>
              </div>
              <div>
                <span className="num">{countdown.minutes}</span>{" "}
                <small>Min</small>
              </div>
              <div>
                <span className="num">{countdown.seconds}</span>{" "}
                <small>Sec</small>
              </div>
            </div>
          </div>
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col-md col-6" key={product.id}>
                <figure className="card-product-grid card-sm">
                  <div
                    className="img-wrap"
                    onClick={() => handleProductClick(product.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* <span className="badge badge-danger"> MỚI </span> */}
                    <img
                      src={`./images/items/${product.thumbnail}`}
                      alt={product.title}
                      className="img-fluid"
                    />
                  </div>
                  <div className="text-wrap p-3">
                    <a className="title text-truncate">{product.title}</a>
                    <span className="badge badge-danger"> -20% </span>
                    <div className="price">
                    <span className="original-price">
                                ${product.price.toFixed(2)}
                              </span>{" "}
                              <span className="discount-price">
                                ${(product.price * 0.8).toFixed(2)}
                              </span>
                    </div>
                  </div>
                </figure>
              </div>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Mixi;
