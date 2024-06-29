import React from "react";
import { Link } from "react-router-dom";

const Infor = () => (
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
                  </li>
                  <li className="breadcrumb-item">Thông báo</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="container">
      <div className="card mb-3">
        <div className="card-body">
          <p className="has-text-align-center has-vivid-red-color has-text-color">
            <strong>THÔNG BÁO</strong>
          </p>
          <p>
            MixiShop xin thông báo hiện Shop KHÔNG có chương trình tri ân khách
            hàng nào bằng việc tặng nước hoa, quà, hoặc một vài sản phẩm khác
            như một số bạn đã nhận được thông tin.
          </p>
          <p>
            Các bạn lưu ý tránh để kẻ gian trục lợi làm ảnh hưởng uy tín của
            Shop nhé ạ. Số điện thoại check đơn của nhân viên MixiShop lần lượt
            ở dưới đây. Các bạn vui lòng kiểm tra tin nhắn hoặc cuộc gọi check
            thông tin đơn hàng có khớp với các số này hay không nhé?
          </p>
          <p className="has-vivid-red-color has-text-color">
            ☎️ Chi tiết xin liên hệ Hotline: 0822221992
          </p>
          <p className="has-black-color has-text-color">
            Bạn nào có tin nhắn hoặc cuộc gọi về việc nhận được quà tặng từ
            chương trình tri ân khách hàng vui lòng comment vào bài đăng inbox
            hoặc gọi trực tiếp vào hotline giúp chúng mình.
          </p>
          <p className="has-black-color has-text-color">
            CÓ MỘT YÊU CẦU NHỎ TRONG LẦN NÀY, CÁC BẠN QUAY LẠI VIDEO BÓC KIỆN
            HÀNG GIÚP SHOP. TRONG TRƯỜNG HỢP ĐỔI TRẢ (ĐỐI VỚI SẢN PHẨM LÀ ÁO,
            YÊU CẦU PHẢI CÒN NGUYÊN TAG MAC), NHẬN THIẾU HÀNG, CÁC BẠN GỬI LẠI
            VIDEO ĐÓ VÀ INBOX PAGE MIXISHOP ĐỂ ĐƯỢC HỖ TRỢ NHANH HẾT SỨC CÓ THỂ
            Ạ.
          </p>
          <p className="has-black-color has-text-color">
            Nếu có bất kì thắc mắc vui lòng inbox fanpage MixiShop để được giải
            đáp. Xin chân thành cám ơn và yêu thương rất nhiều
          </p>
          <p>
            Hiện tại bên shop CHƯA có bất cứ chương trình tri ân nào. Nếu có ưu
            đãi cũng sẽ được thông báo công khai trên các kênh CHÍNH THỨC VÀ DUY
            NHẤT sau đây:
          </p>
          <p>
            Website:{" "}
            <a href="https://shop.mixigaming.com/">
              https://shop.mixigaming.com/
            </a>
          </p>
          <p>
            Fanpage:{" "}
            <a href="https://www.facebook.com/MixiShop-182674912385853/">
              https://www.facebook.com/MixiShop-182674912385853/
            </a>
          </p>
          <p>
            Instagram:{" "}
            <a href="https://www.instagram.com/mixi.shop/">
              https://www.instagram.com/mixi.shop/
            </a>
          </p>
          <p>Email: Mixiishop@gmail.com</p>
          <p>MixiShop xin vui lòng được phục vụ quý khách!</p>
        </div>
      </div>
    </div>
  </section>
);

export default Infor;
