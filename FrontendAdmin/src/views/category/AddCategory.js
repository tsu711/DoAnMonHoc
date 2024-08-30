import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { addCategory } from '../../api/apiService'
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  txtInput: {
    width: '98%',
    margin: '10px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function AddCategory() {
  const classes = useStyles()
  const [checkAdd, setCheckAdd] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [isHome, setIsHome] = useState('')
  const navigate = useNavigate()

  // handle add category
  const handleAddCategory = (event) => {
    event.preventDefault()

    if (categoryName !== '' && isHome !== '') {
      const category = {
        categoryName,
        isHome,
      }
      console.log(category)
      addCategory('categories', category).then((item) => {
        console.log('add', item)
        if (item.status === 201) {
          setCheckAdd(true)
        } else {
          alert('Bạn chưa nhập đủ thông tin!')
        }
      })
    } else {
      alert('Bạn chưa nhập đủ thông tin!')
    }
  }

  // get data
  useEffect(() => {
    if (checkAdd) {
      const timeout = setTimeout(() => {
        navigate('/Category/all-category')
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [checkAdd, navigate])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Thêm danh mục sản phẩm
            </Typography>

            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Danh mục sản phẩm
                </Typography>
                <TextField
                  id="categoryName"
                  onChange={(e) => setCategoryName(e.target.value)}
                  name="categoryName"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Hiện trang chủ
                </Typography>
                <FormControl variant="outlined" className={classes.txtInput}>
                  <InputLabel id="isHome-label">Trạng thái</InputLabel>
                  <Select
                    labelId="isHome-label"
                    id="isHome"
                    value={isHome}
                    onChange={(e) => setIsHome(e.target.value)}
                    label="Trạng thái"
                  >
                    <MenuItem value={1}>Hiện</MenuItem>
                    <MenuItem value={0}>Ẩn</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} style={{ marginTop: '30px' }}>
                <Button
                  type="button"
                  onClick={handleAddCategory}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Thêm Danh mục Sản Phẩm
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
