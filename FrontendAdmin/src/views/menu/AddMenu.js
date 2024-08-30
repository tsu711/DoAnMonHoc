import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { addMenu } from '../../api/apiService'
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

export default function AddMenu() {
  const classes = useStyles()
  const [checkAdd, setCheckAdd] = useState(false)
  const [menu, setMenu] = useState('')
  const [href, setHref] = useState('')
  const navigate = useNavigate()

  // handle add menu
  const handleAddMenu = (event) => {
    event.preventDefault()

    if (menu !== '' && href !== '') {
      const menu = {
        menu,
        href,
      }
      console.log(menu)
      addMenu('menus', menu).then((item) => {
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
        navigate('/Menu/all-menu')
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
                  id="menu"
                  onChange={(e) => setMenu(e.target.value)}
                  name="menu"
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
                  <InputLabel id="href-label">Trạng thái</InputLabel>
                  <Select
                    labelId="href-label"
                    id="href"
                    value={href}
                    onChange={(e) => setHref(e.target.value)}
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
                  onClick={handleAddMenu}
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
