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
import { getAllCategories, deleteCategoryById } from '../../api/apiService'
import TablePagination from '@mui/material/TablePagination'
import { AiTwotoneDelete } from 'react-icons/ai'
import { LiaEdit } from 'react-icons/lia'
import TextField from '@mui/material/TextField'

const Category = () => {
  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [checkDeleteCategory, setCheckDeleteCategory] = useState(false)
  const [page, setPage] = useState(0) // Thêm state cho trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5) // Thêm state cho số hàng trên mỗi trang
  const navigate = useNavigate()
  const [dataChanged, setDataChanged] = useState(false)

  // render UI
  useEffect(() => {
    getAllCategories('categories').then((item) => {
      setCategories(item.data)
      setFilteredCategories(item.data)
    })
  }, [dataChanged, navigate])

  // search
  const handleSearchChange = (searchValue) => {
    const filteredCategories = categories.filter((category) =>
      category.categoryName.toLowerCase().includes(searchValue.toLowerCase()),
    )
    setFilteredCategories(filteredCategories)
  }

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
  const deleteCategoryByIdHandler = (id) => {
    deleteCategoryById('categories', id).then((item) => {
      console.log(item)
      if (item.status === 204) {
        setCheckDeleteCategory(true)
        setDataChanged(!dataChanged)
        setCategories(categories.filter((key) => key.id !== id))
      }
    })
  }

  return (
    <div style={{ flexGrow: 1, marginTop: 20 }}>
      <div className="flex items-center gap-3 my-2 text-end">
        <TextField
          label="Tìm kiếm danh mục"
          variant="outlined"
          size="small"
          onChange={(e) => handleSearchChange(e.target.value)} // search
        />
        <Link to={`/Category/add-category`} style={{ textDecoration: 'none' }}>
          <button
            style={{
              border: '2px solid #33FF66',
              color: '#fff',
              padding: '5px 10px',
              borderRadius: '5px',
              backgroundColor: '#339966',
            }}
          >
            Thêm Danh Mục
          </button>
        </Link>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ width: '100%', margin: 'auto' }}>
            {checkDeleteCategory && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setCheckDeleteCategory(false)
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
                    <TableCell>Id:</TableCell>
                    <TableCell>Tên danh mục</TableCell>

                    <TableCell>Hiện trang chủ </TableCell>
                    <TableCell align="center">Cập nhật</TableCell>
                    <TableCell align="center">Xoá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredCategories
                  ).map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell width={260} component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell width={260} component="th" scope="row">
                          {row.categoryName}
                        </TableCell>

                        <TableCell width={260} component="th" scope="row">
                          {row.isHome === 1 ? 'Hiện' : 'Ẩn'}
                        </TableCell>

                        <TableCell align="center">
                          <Link to={`/Category/edit/category/${row.id}`}>
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
                            onClick={() => deleteCategoryByIdHandler(row.id)}
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
              count={categories.length}
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

export default Category
