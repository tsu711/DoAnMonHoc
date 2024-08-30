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
import { getAllMenu, deleteMenu } from '../../api/apiService'
import TablePagination from '@mui/material/TablePagination'
import { AiTwotoneDelete } from 'react-icons/ai'
import { LiaEdit } from 'react-icons/lia'
import TextField from '@mui/material/TextField'

const Menu = () => {
  const [menus, setMenus] = useState([])
  const [filteredMenus, setFilteredMenus] = useState([])
  const [checkDeleteMenu, setCheckDeleteMenu] = useState(false)
  const [page, setPage] = useState(0) // Thêm state cho trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5) // Thêm state cho số hàng trên mỗi trang
  const navigate = useNavigate()
  const [dataChanged, setDataChanged] = useState(false)

  // render UI
  useEffect(() => {
    getAllMenus('menus').then((item) => {
      setMenus(item.data)
      setFilteredMenus(item.data)
    })
  }, [dataChanged, navigate])

  // search
  const handleSearchChange = (searchValue) => {
    const filteredMenus = menus.filter((menu) =>
      menu.menu.toLowerCase().includes(searchValue.toLowerCase()),
    )
    setFilteredMenus(filteredMenus)
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
  const deleteMenuByIdHandler = (id) => {
    deleteMenuById('menus', id).then((item) => {
      console.log(item)
      if (item.status === 204) {
        setCheckDeleteMenus(true)
        setDataChanged(!dataChanged)
        setMenus(menus.filter((key) => key.id !== id))
      }
    })
  }

  return (
    <div style={{ flexGrow: 1, marginTop: 20 }}>
      <div className="flex items-center gap-3 my-2 text-end">
        <TextField
          label="Tìm kiếm menu"
          variant="outlined"
          size="small"
          onChange={(e) => handleSearchChange(e.target.value)} // search
        />
        <Link to={`/Menu/add-menu`} style={{ textDecoration: 'none' }}>
          <button
            style={{
              border: '2px solid #33FF66',
              color: '#fff',
              padding: '5px 10px',
              borderRadius: '5px',
              backgroundColor: '#339966',
            }}
          >
            Thêm menu
          </button>
        </Link>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ width: '100%', margin: 'auto' }}>
            {checkDeleteMenu && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setCheckDeleteMenu(false)
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
                    <TableCell>Tên Menu</TableCell>

                    <TableCell>Href </TableCell>
                    <TableCell align="center">Cập nhật</TableCell>
                    <TableCell align="center">Xoá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredMenus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredMenus
                  ).map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell width={260} component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell width={260} component="th" scope="row">
                          {row.menu}
                        </TableCell>

                        <TableCell width={260} component="th" scope="row">
                          {row.href === 1 ? 'Hiện' : 'Ẩn'}
                        </TableCell>

                        <TableCell align="center">
                          <Link to={`/Menu/edit/menu/${row.id}`}>
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
                            onClick={() => deleteMenuByIdHandler(row.id)}
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
              count={menus.length}
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

export default Menu
