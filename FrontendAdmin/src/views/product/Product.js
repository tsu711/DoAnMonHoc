import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/icons-material/IosShare'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link, useNavigate } from 'react-router-dom'
import { getAllProducts, deleteProductById } from '../../api/apiService'
import TablePagination from '@mui/material/TablePagination'
import { AiTwotoneDelete } from 'react-icons/ai'
import { LiaEdit } from 'react-icons/lia'
import TextField from '@mui/material/TextField'

const Product = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]) // filter products when search
  const [checkDeleteProduct, setCheckDeleteProduct] = useState(false)
  const [page, setPage] = useState(0) // Thêm state cho trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5) // Thêm state cho số hàng trên mỗi trang
  const navigate = useNavigate()
  const [dataChanged, setDataChanged] = useState(false)

  // render UI
  useEffect(() => {
    getAllProducts('products').then((item) => {
      setProducts(item.data)
      setFilteredProducts(item.data)
    })
  }, [dataChanged, navigate])

  // update page when user change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // update số hàng mỗi page when user change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // delete category
  const deleteProductByIdHandler = (id) => {
    deleteProductById('products', id).then((item) => {
      console.log(item)
      if (item.status === 204) {
        setCheckDeleteProduct(true)
        setDataChanged(!dataChanged)
        setProducts(products.filter((key) => key.id !== id))
      }
    })
  }
  // search
  const handleSearchChange = (searchValue) => {
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    setFilteredProducts(filteredProducts)
  }

  return (
    <div style={{ flexGrow: 1, marginTop: 20 }}>
      <div className="flex items-center gap-3 my-2 text-end">
        <TextField
          label="Tìm kiếm sản phẩm"
          variant="outlined"
          size="small"
          onChange={(e) => handleSearchChange(e.target.value)} // search
        />
        <Link to={`/Product/add-product`} style={{ textDecoration: 'none' }}>
          <button
            style={{
              border: '2px solid #33FF66',
              color: '#fff',
              padding: '5px 10px',
              borderRadius: '5px',
              backgroundColor: '#339966',
            }}
          >
            Thêm Sản Phẩm
          </button>
        </Link>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ width: '100%', margin: 'auto' }}>
            {checkDeleteProduct && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setCheckDeleteProduct(false)
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Delete successfully
              </Alert>
            )}
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell width={260} align="center">
                      Id:
                    </TableCell>
                    <TableCell align="center">Tên sản phẩm</TableCell>
                    <TableCell align="center">Giá</TableCell>
                    <TableCell align="center">Giá gốc </TableCell>
                    <TableCell align="center">Số lượng </TableCell>
                    <TableCell align="center">Mô tả </TableCell>
                    <TableCell align="center">Hình ảnh</TableCell>
                    <TableCell align="center">Màu</TableCell>
                    <TableCell align="center">Kích thước</TableCell>
                    <TableCell align="center">Danh mục</TableCell>
                    <TableCell align="center">Cập nhật</TableCell>
                    <TableCell align="center">Xoá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredProducts
                  ).map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell align="center" component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="center" width={100} component="th" scope="row">
                          {row.title}
                        </TableCell>

                        <TableCell align="center">
                          <strong>{Number(row.price).toLocaleString('vi-VN')}.VNĐ</strong>
                        </TableCell>
                        <TableCell align="center">
                          <strong>{Number(row.discount).toLocaleString('vi-VN')}.VNĐ</strong>
                        </TableCell>

                        <TableCell width={100} component="th" scope="row" align="center">
                          {row.quantity}
                        </TableCell>
                        <TableCell width={360} component="th" scope="row" align="center">
                          {row.description}
                        </TableCell>

                        <TableCell align="center">{row.thumbnail}</TableCell>
                        <TableCell align="center" width={100} component="th" scope="row">
                          {row.colors?.name}
                        </TableCell>
                        <TableCell align="center" width={100} component="th" scope="row">
                          {row.sizes?.name}
                        </TableCell>
                        <TableCell width={100} align="center">
                          {row.category?.categoryName || ''}
                        </TableCell>

                        <TableCell align="center">
                          <Link to={`/Product/edit/product/${row.id}`}>
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{ backgroundColor: '#66FF99', color: 'white', height: '40px' }}
                            >
                              <LiaEdit size={20} />
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() => deleteProductByIdHandler(row.id)}
                            style={{ backgroundColor: '#CC0000', color: 'white', height: '40px' }}
                          >
                            <AiTwotoneDelete size={20} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Product
