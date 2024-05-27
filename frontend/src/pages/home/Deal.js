import React from "react";
const Deal = () =>(
<section class ="padding-bottom">
<section class="padding-bottom">
 <div class="card card-deal">
     <div class="col-heading content-body">
      <header class="section-heading">
       <h3 class="section-title">Deals and offers</h3>
       <p>Hygiene equipments</p>
     </header>
     <div class="timer">
       <div> <span class="num">04</span> <small>Days</small></div>
       <div> <span class="num">12</span> <small>Hours</small></div>
       <div> <span class="num">58</span> <small>Min</small></div>
       <div> <span class="num">02</span> <small>Sec</small></div>
     </div>
   </div> 
   <div class="row no-gutters items-wrap">
    <div class="col-md col-6">
     <figure class="card-product-grid card-sm">
      <a href="#" class="img-wrap"> 
      <img src={require("../../assets/images/items/aorefund.jpg")}style={{width:"60%"}}/>
      </a>
      <div class="text-wrap p-3">
       	<a href="#" class="title">Áo Refund gaming</a>
       	<span class="badge badge-danger"> -20% </span>
      </div>
   </figure>
 </div> 
 <div class="col-md col-6">
   <figure class="card-product-grid card-sm">
    <a href="#" class="img-wrap"> 
    <img src={require("../../assets/images/items/aomixi1.jpg")}style={{width:"60%"}}/>
   </a>
   <div class="text-wrap p-3">
     <a href="#" class="title">Áo Mixi</a>
     <span class="badge badge-danger"> -5% </span>
   </div>
 </figure>
</div> 
<div class="col-md col-6">
 <figure class="card-product-grid card-sm">
  <a href="#" class="img-wrap"> 
  <img src={require("../../assets/images/items/hodiemixi1.jpg")}style={{width:"60%"}}/>
 </a>
 <div class="text-wrap p-3">
   <a href="#" class="title">Hodie Mixi</a>
   <span class="badge badge-danger"> -20% </span>
 </div>
</figure>
</div> 
<div class="col-md col-6">
 <figure class="card-product-grid card-sm">
  <a href="#" class="img-wrap"> 
  <img src={require("../../assets/images/items/aopubg1.jpg")}style={{width:"60%"}}/>
 </a>
 <div class="text-wrap p-3">
   <a href="#" class="title">Áo PUBG</a>
   <span class="badge badge-danger"> -15% </span>
 </div>
</figure>
</div> 
<div class="col-md col-6">
 <figure class="card-product-grid card-sm">
  <a href="#" class="img-wrap"> 
  <img src={require("../../assets/images/items/aocsgo1.jpg")}style={{width:"60%"}}/>
 </a>
 <div class="text-wrap p-3">
   <a href="#" class="title text-truncate">Áo CSGO</a>
   <span class="badge badge-danger"> -10% </span>
 </div>
</figure>
</div> 
</div>
</div>

</section>
</section>
);
export default Deal