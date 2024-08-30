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
import { getAllTags, deleteTagById } from '../../api/apiService'
import TablePagination from '@mui/material/TablePagination'
import { AiTwotoneDelete } from 'react-icons/ai'
import { LiaEdit } from 'react-icons/lia'
import TextField from '@mui/material/TextField';
const Tag = () => {
  const [tags, setTags] = useState([])
  const [checkDeleteTag, setCheckDeleteTag] = useState(false)
  const [filteredTags, setFilteredTags] = useState([]);
  const [page, setPage] = useState(0) // Thêm state cho trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5) // Thêm state cho số hàng trên mỗi trang
  const navigate = useNavigate()
  const [dataChanged, setDataChanged] = useState(false);
  useEffect(() => {
    getAllTags('tags').then((item) => {
      setTags(item.data)
      setFilteredTags(item.data)
    })
  }, [dataChanged, navigate])

   // search
   const handleSearchChange = (searchValue) => {
    const filteredTags = tags.filter(tag =>
      tag.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredTags(filteredTags);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const deleteTagByIdHandler = (id) => {
    deleteTagById('tags', id).then((item) => {
      console.log(item)
      if (item.status === 204) {
        setCheckDeleteTag(true)
        setDataChanged(!dataChanged);
        setTags(tags.filter((key) => key.id !== id))
      }
    })
  }

  return (
    <div style={{ flexGrow: 1, marginTop: 20 }}>
      <div className="flex items-center gap-3 my-2 text-end">
      <TextField
          label="Tìm kiếm thương hiệu"
          variant="outlined"
          size="small"
          onChange={(e) => handleSearchChange(e.target.value)} 
        />
        <Link to={`/Tag/add-tag`} style={{ textDecoration: 'none' }}>
          <button
            style={{
              border: '2px solid #33FF66',
              color: '#fff',
              padding: '5px 10px', 
              borderRadius: '5px', 
              backgroundColor: '#339966',
            }}
          >
            Thêm Thương Hiệu
          </button>
        </Link>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ width: '100%', margin: 'auto' }}>
            {checkDeleteTag && (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setCheckDeleteTag(false)
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
                    <TableCell >Id: </TableCell>
                    <TableCell >Tên thương hiệu: </TableCell>
                    <TableCell >biểu tượng: </TableCell>
                    <TableCell align="center">Cập nhật</TableCell>
                    <TableCell align="center">Xoá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredTags.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredTags
                  ).map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell width={260} component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell width={260} component="th" scope="row">
                          {row.name}
                        </TableCell>

                        <TableCell width={260} component="th" scope="row">
                          {row.icon}
                        </TableCell>


                        <TableCell align="center">
                          <Link to={`/Tag/edit/tag/${row.id}`}>
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
                            onClick={() => deleteTagByIdHandler(row.id)}
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
              count={tags.length}
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

export default Tag
