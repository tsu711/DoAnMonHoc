


import axios from "axios";
import React, { useState } from "react";
function Address() {

    return (
    <section class="section-content padding-y">
	<div class="container">
	
	<div class="row">
    <aside class="col-md-3">
		<nav class="list-group">
			<a class="list-group-item" href="/profile/main"> Account overview  </a>
			<a class="list-group-item active" href="/profile/address"> My Address </a>
			<a class="list-group-item" href="/profile/order"> My Orders </a>
			<a class="list-group-item" href="/profile/wishlist"> My wishlist </a>
			<a class="list-group-item" href="/profile/seller"> My Selling Items </a>
			<a class="list-group-item" href="/profile/setting"> Settings </a>
    
            
		
		</nav>
	</aside> 
		<main class="col-md-9">

		<a href="#" class="btn btn-light mb-3"> <i class="fa fa-plus"></i> Add new address </a>

        <div class="row">
            <div class="col-md-6">
                <article class="box mb-4">
                    <h6>London, United Kingdom</h6>
                    <p>Building: Nestone  Floor: 22, Aprt: 12  </p>
                    <a href="#" class="btn btn-light disabled"> <i class="fa fa-check"></i> Default</a> <a href="#" class="btn btn-light"> <i class="fa fa-pen"></i> </a>   <a href="#" class="btn btn-light"> <i class="text-danger fa fa-trash"></i>  </a>
                </article>
            </div>  
            <div class="col-md-6">
                <article class="box mb-4">
                    <h6>Tashkent, Uzbekistan</h6>
                    <p>Building one  Floor: 2, Aprt: 32  </p>
                    <a href="#" class="btn btn-light">Make default</a> <a href="#" class="btn btn-light"> <i class="fa fa-pen"></i> </a>   <a href="#" class="btn btn-light"> <i class="text-danger fa fa-trash"></i>  </a>
                </article>
            </div>  
            <div class="col-md-6">
                <article class="box mb-4">
                    <h6>Moscow, Russia</h6>
                    <p>Lenin street  Building A, Floor: 3, Aprt: 32  </p>
                    <a href="#" class="btn btn-light">Make default</a> <a href="#" class="btn btn-light"> <i class="fa fa-pen"></i> </a>   <a href="#" class="btn btn-light"> <i class="text-danger fa fa-trash"></i>  </a>
                </article>
            </div>  
        </div> 

	</main> 
</div>

</div> 
</section>
);};
export default Address