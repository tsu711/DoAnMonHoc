import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/images/logo.png'
class Footer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <footer class="section-footer bg-dark">
	<div class="container">
		<section class="footer-top padding-y-lg text-white">
			<div class="row">
				<aside class="col-md col-6">
					
				<h5>Về chúng tôi</h5>
            <p>
              <span style={{ fontsize: "90%" }}>
                Website chính thức và duy nhất của MixiShop. Hiện tại chúng mình
                chỉ nhận đơn hàng trên website chứ không nhận bất kỳ nơi nào
                khác nhé!
              </span>
            </p>
				</aside>
				<aside class="col-md col-6">
					
				<h5>Danh mục sản phẩm</h5>
					<ul class="list-unstyled">
					<li>
                      <a href="https://shop.mixigaming.com/danh-muc/ao-csgo/">
                        Áo CSGO
                      </a>
                    </li>
                    <li>
                      <a href="https://shop.mixigaming.com/danh-muc/ao-mixi/">
                        Áo Mixi
                      </a>
                    </li>
                    <li>
                      <a href="https://shop.mixigaming.com/danh-muc/ao-pubg/">
                        Áo PUBG
                      </a>
                    </li>
                    <li>
                      <a href="https://shop.mixigaming.com/danh-muc/ao-refund-gaming/">
                        Áo Refund Gaming
                      </a>
                    </li>
                    <li>
                      <a href="https://shop.mixigaming.com/danh-muc/do-luu-niem-mixi/">
                        Đồ lưu niệm Mixi
                      </a>
                    </li>
                    <li>
                      <a href="https://shop.mixigaming.com/danh-muc/ao-ba-lo/">
                        Áo ba lỗ
                      </a>
                    </li>
					</ul>
				</aside>
				<aside class="col-md col-6">
				<h5>Thông tin</h5>
					<ul class="list-unstyled">
					<li>
                      <a href="https://shop.mixigaming.com/gioi-thieu/">
                        Giới thiệu
                      </a>
                    </li>
                    <li>
                      <a href="https://shop.mixigaming.com/chinh-sach-bao-mat/">
                        Chính sách bảo mật
                      </a>
                    </li>
                    <li>
                      <a href="https://shop.mixigaming.com/dieu-khoan/">
                        Điều khoản&nbsp;
                      </a>
                    </li>
                    <li>
                      <a href="https://shop.mixigaming.com/sitemap_index.xml">
                        Sitemap
                      </a>
                    </li>
					</ul>
				</aside>
				<aside class="col-md col-6">
				<h5>Hỗ trợ</h5>
            <p>
              <span style={{ fontsize: "90%" }}>
                Mọi thắc mắc và góp ý cần hỗ trợ xin vui lòng liên hệ Fanpage và
                Instagram
              </span>
            </p>
				</aside>
				<aside class="col-md">
					<h6 class="title">Social</h6>
					<ul class="list-unstyled">
						<li><a href="#"> <i class="fab fa-facebook"></i> Facebook </a></li>
						<li><a href="#"> <i class="fab fa-twitter"></i> Twitter </a></li>
						<li><a href="#"> <i class="fab fa-instagram"></i> Instagram </a></li>
						<li><a href="#"> <i class="fab fa-youtube"></i> Youtube </a></li>
					</ul>
				</aside>
			</div> 
		</section>	

		
	</div>
</footer>

        )}}
        export  default Footer