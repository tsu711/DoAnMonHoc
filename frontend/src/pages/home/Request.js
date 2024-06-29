import React from "react";
const Requests = () =>(
<div class="container-fluid offer pt-5">
        <div class="row px-xl-5">
            <div class="col-md-6 pb-4">
                <div class="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
				<img src={require("../../assets/images/items/aomixi1-1.jpg")}style={{width:"100%"}}/>                 <div class="position-relative" style={{zIndex:"1"}}>
                        <h5 class="text-uppercase text-primary mb-3">•Chất liệu: Vải pima cotton 100%, dày dặn, mịn mát</h5>
                        <h1 class="mb-4 font-weight-semi-bold">Summer Collection</h1>
                        {/* <a href="" class="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a> */}
                    </div>
                </div>
            </div>
            <div class="col-md-6 pb-4">
                <div class="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
				<img src={require("../../assets/images/items/aomixi1-2.jpg")}style={{width:"100%"}}/>        <div class="position-relative" style={{zIndex:"1"}}>
                        <h5 class="text-uppercase text-primary mb-3">•In decal cao thành với zip cổ siêu mượt🤝</h5>
                        <h1 class="mb-4 font-weight-semi-bold">Winter Collection</h1>
                        {/* <a href="" class="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a> */}
                    </div>
                </div>
            </div>
        </div>
    </div>

);
export default Requests