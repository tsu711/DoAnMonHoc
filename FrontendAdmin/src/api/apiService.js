import axios from 'axios'

const API_URL = 'http://localhost:8080/api'
export function callApi(endpoint, method = 'GET', body) {
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch((e) => {
    console.log(e)
  })
}

// product
export function getAllProducts(endpoint) {
  return callApi(endpoint, 'GET')
}

export function getProductById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'GET')
}

export function addProduct(endpoint, data) {
  return callApi(endpoint, 'POST', data)
}

export function editProduct(endpoint, data) {
  return callApi(endpoint, 'PUT', data)
}

export function deleteProductById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'DELETE')
}

// category
export function getAllCategories(endpoint) {
  return callApi(endpoint, 'GET')
}

export function getCategoryById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'GET')
}
export function addCategory(endpoint, data) {
  return callApi(endpoint, 'POST', data)
}

export function editCatgory(endpoint, data) {
  return callApi(endpoint, 'PUT', data)
}
export function deleteCategoryById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'DELETE')
}

// user
export function getAllUsers(endpoint) {
  return callApi(endpoint, 'GET')
}
export function getUserById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'GET')
}
export function addUser(endpoint, data) {
  return callApi(endpoint, 'POST', data)
}
export function editUser(endpoint, data) {
  return callApi(endpoint, 'PUT', data)
}
export function deleteUserById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'DELETE')
}

// tag
export function getAllTags(endpoint) {
  return callApi(endpoint, 'GET')
}
export function getTagById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'GET')
}
export function addTag(endpoint, data) {
  return callApi(endpoint, 'POST', data)
}
export function editTag(endpoint, data) {
  return callApi(endpoint, 'PUT', data)
}
export function deleteTagById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'DELETE')
}

// order
export function getAllOrders(endpoint) {
  return callApi(endpoint, 'GET')
}
export function getOrderById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'GET')
}
export function addOrder(endpoint, data) {
  return callApi(endpoint, 'POST', data)
}
export function editOrder(endpoint, data) {
  return callApi(endpoint, 'PUT', data)
}
export function deleteOrderById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'DELETE')
}

// orderitem
export function getAllOrderItems(endpoint) {
  return callApi(endpoint, 'GET')
}
export function getOrderItemById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'GET')
}
export function addOrderItem(endpoint, data) {
  return callApi(endpoint, 'POST', data)
}
export function editOrderItem(endpoint, data) {
  return callApi(endpoint, 'PUT', data)
}
export function deleteOrderItemById(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'DELETE')
}

// quantity user truy cập
export function getAllVisitors(endpoint) {
  return callApi(endpoint, 'GET')
}

// color
export function getAllColors(endpoint) {
  return callApi(endpoint, 'GET')
}

// size
export function getAllSizes(endpoint) {
  return callApi(endpoint, 'GET')
}
