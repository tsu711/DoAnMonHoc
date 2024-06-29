import React from "react";
const Wishlist = () =>(
    <section class="section-content padding-y">
<div class="container">


<div class="row">
<aside class="col-md-3">
		<nav class="list-group">
			<a class="list-group-item" href="/profile/main"> Account overview  </a>
			<a class="list-group-item" href="/profile/address"> My Address </a>
			<a class="list-group-item" href="/profile/order"> My Orders </a>
			<a class="list-group-item active" href="/profile/wishlist"> My wishlist </a>
			<a class="list-group-item" href="/profile/seller"> My Selling Items </a>
			<a class="list-group-item" href="/profile/setting"> Settings </a>

			
		</nav>
	</aside> 
	<main class="col-md-9">

		<article class="card">
			<div class="card-body">

		<div class="row">
				<div class="col-md-6">
					<figure class="itemside mb-4">
						<div class="aside">
                        <img src={require("../../assets/images/items/aocsgo1.jpg")}style={{width:"80%"}}/>
                            </div>
						<figcaption class="info">
							<a href="#" class="title">Great product name goes here</a>
							<p class="price mb-2">$80</p>
							<a href="#" class="btn btn-secondary btn-sm"> Add to cart </a>
							<a href="#" class="btn btn-danger btn-sm" data-toggle="tooltip" title="" data-original-title="Remove from wishlist"> <i class="fa fa-times"></i> </a>
						</figcaption>
					</figure>
				</div> 

				<div class="col-md-6">
					<figure class="itemside mb-4">
						
                        <div class="aside">
						<img src={require("../../assets/images/items/aocsgo2.jpg")}style={{width:"80%"}}/>
                            </div>
						<figcaption class="info">
							<a href="#" class="title">Men's Jackeet for Winter </a>
							<p class="price mb-2">$1280</p>
							<a href="#" class="btn btn-secondary btn-sm"> Add to cart </a>
							<a href="#" class="btn btn-danger btn-sm" data-toggle="tooltip" title="" data-original-title="Remove from wishlist"> <i class="fa fa-times"></i> </a>
						</figcaption>
					</figure>
				</div> 

				<div class="col-md-6">
					<figure class="itemside mb-4">
					
                        <div class="aside">
						<img src={require("../../assets/images/items/aocsgo3.jpg")}style={{width:"80%"}}/>
                            </div>
						<figcaption class="info">
							<a href="#" class="title">Another book of item goes here </a>
							<p class="price mb-2">$280</p>
							<a href="#" class="btn btn-secondary btn-sm"> Add to cart </a>
							<a href="#" class="btn btn-danger btn-sm" data-toggle="tooltip" title="" data-original-title="Remove from wishlist"> <i class="fa fa-times"></i> </a>
						</figcaption>
					</figure>
				</div> 
			</div> 

			</div>
		</article>


	</main> 
</div>

</div>
</section>
    

);
export default Wishlist