import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Product = React.lazy(() => import('./views/product/Product'))
const AddProduct = React.lazy(() => import('./views/product/AddProduct'))
const EditProduct = React.lazy(() => import('./views/product/EditProduct'))
const Category = React.lazy(() => import('./views/category/Category'))
const AddCategory = React.lazy(() => import('./views/category/AddCategory'))
const EditCategory = React.lazy(() => import('./views/category/EditCategory'))
const User = React.lazy(() => import('./views/user/User'))
const AddUser = React.lazy(() => import('./views/user/AddUser'))
const EditUser = React.lazy(() => import('./views/user/EditUser'))
const Tag = React.lazy(() => import('./views/tag/Tag'))
const AddTag = React.lazy(() => import('./views/tag/AddTag'))
const EditTag = React.lazy(() => import('./views/tag/EditTag'))
const Order = React.lazy(() => import('./views/order/Order'))
const AddOrder = React.lazy(() => import('./views/order/AddOrder'))
const EditOrder = React.lazy(() => import('./views/order/EditOrder'))
const OrderItem = React.lazy(() => import('./views/orderitem/OrderItem'))
const AddOrderItem = React.lazy(() => import('./views/orderitem/AddOrderItem'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Bảng Điều Khiển', element: Dashboard },

  { path: '/Product/all-product', name: 'Product', element: Product },
  { path: '/Product/add-product', name: 'Product', element: AddProduct },
  { path: '/Product/edit/product/:id', name: 'Product', element: EditProduct },

  { path: '/Category/all-category', name: 'Category', element: Category },
  { path: '/Category/add-category', name: 'Category', element: AddCategory },
  { path: '/Category/edit/category/:id', name: 'Category', element: EditCategory },

  { path: '/User/all-user', name: 'User', element: User },
  { path: '/User/add-user', name: 'User', element: AddUser },
  { path: '/User/edit/user/:id', name: 'User', element: EditUser },

  { path: '/Order/all-order', name: 'Order', element: Order },
  { path: '/Order/add-order', name: 'Order', element: AddOrder },
  { path: '/Order/edit/order/:id', name: 'Order', element: EditOrder },

  { path: '/OrderItem/all-orderItem/:orderId', name: 'OrderItem', element: OrderItem },
  { path: '/OrderItem/add-orderItem', name: 'OrderItem', element: AddOrderItem },
]

export default routes
