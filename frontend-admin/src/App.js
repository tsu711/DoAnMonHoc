import React from "react";
import { Admin, Resource, ListGuesser, fetchUtils } from "react-admin";
import AdminPanel from "./component/AdminPanel";

import {
  listCategory,
  editCategory,
  createCategory,
} from "./component/Category";

import { createProduct, editProduct, listProduct } from "./component/Product";
import {
  createFeedback,
  editFeedback,
  listFeedback,
} from "./component/Feedback";
import simpleRestProvider from "ra-data-simple-rest";
import { createGallery, editGallery, listGallery } from "./component/Gallery";
import {
  createOrderDetail,
  editOrderDetail,
  listOrderDetail,
} from "./component/OrderDetail";
import { createOrder, editOrder, listOrder } from "./component/Order";
import { createRole, editRole, listRole } from "./component/Role";
import { createToken, editToken, listToken } from "./component/Token";
import { createUser, editUser, listUser } from "./component/User";
import { createMenu, editMenu, listMenu } from "./component/Menu";
import { createBanner, editBanner, listBanner } from "./component/Banner";
import dataProvider from "./component/CustomDataProvider";
import { createColor, editColor, listColor } from "./component/Color";
import { createSize, editSize, listSize } from "./component/Size";
import { createCart, editCart, listCart } from "./component/Cart";

const App = () => (
  <Admin dashboard={AdminPanel} dataProvider={dataProvider}>
    <Resource
      name="categories"
      list={listCategory}
      edit={editCategory}
      create={createCategory}
    />
    <Resource
      name="products"
      list={listProduct}
      edit={editProduct}
      create={createProduct}
    />
    {/* <Resource name="feedbacks"
      list={listFeedback}
      edit={editFeedback}
      create={createFeedback}
      /> */}
    {/* <Resource name="galleries"
      list={listGallery}
      edit={editGallery}
      create={createGallery}
      /> */}
    <Resource
      name="orderDetails"
      list={listOrderDetail}
      // edit={editOrderDetail}
      // create={createOrderDetail}
    />
    <Resource
      name="orders"
      list={listOrder}
      edit={editOrder}
      // create={createOrder}
    />
    {/* <Resource name="roles"
      list={listRole}
      edit={editRole}
      create={createRole}
      /> */}
    {/* <Resource name="tokens"
      list={listToken}
      edit={editToken}
      create={createToken}
      /> */}
    <Resource
      name="users"
      list={listUser}
      edit={editUser}
      create={createUser}
    />
    <Resource
      name="menus"
      list={listMenu}
      edit={editMenu}
      create={createMenu}
    />
    {/* <Resource name="banners"
      list={listBanner}
      edit={editBanner}
      create={createBanner}
      /> */}
    <Resource
      name="colors"
      list={listColor}
      edit={editColor}
      create={createColor}
    />
     <Resource
      name="sizes"
      list={listSize}
      edit={editSize}
      create={createSize}
    />
      {/* <Resource
      name="carts"
      list={listCart}
      edit={editCart}
      create={createCart}
    /> */}
    <Resource
      name="menus"
      list={listMenu}
      edit={editMenu}
      create={createMenu}
    />
  </Admin>
);
export default App;
