import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { addOrder } from '../../api/apiService'
import MenuItem from '@mui/material/MenuItem'
import { Select } from '@mui/material'

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

export default function AddOrder() {
  const classes = useStyles()
  const [checkAdd, setCheckAdd] = useState(false)
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [totalMoney, setTotalMoney] = useState('')
  const [status, setStatus] = useState('true')
  const [listIdCart, setListIdCart] = useState('')
  const navigate = useNavigate()

  // handle add order
  const handleAddOrder = (event) => {
    event.preventDefault()
    if (
      fullname !== '' &&
      email !== '' &&
      phoneNumber !== '' &&
      address !== '' &&
      totalMoney !== '' &&
      listIdCart !== ''
    ) {
      const idCartArray = listIdCart.split(',')
      // Chuyển đổi mỗi id giỏ hàng thành số nguyên
      const idCartIntegers = idCartArray.map((id) => parseInt(id.trim(), 10))
      const order = {
        fullname,
        email,
        phoneNumber,
        address,
        totalMoney,
        status: status,
        listIdCart: idCartIntegers,
      }
      console.log(order)
      addOrder('orders', order).then((item) => {
        console.log('added', item)
        if (item.status === 201) {
          setCheckAdd(true)
        } else {
          alert('Thêm đơn hàng không thành công!')
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
        navigate('/Order/all-order')
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
              Thêm Đơn Hàng
            </Typography>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Họ và tên
                </Typography>
                <TextField
                  id="fullname"
                  onChange={(e) => setFullname(e.target.value)}
                  name="fullname"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Số điện thoại
                </Typography>
                <TextField
                  id="phoneNumber"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  name="phoneNumber"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Email
                </Typography>
                <TextField
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Địa chỉ
                </Typography>
                <TextField
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                  name="address"
                  className={classes.txtInput}
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Tổng tiền
                </Typography>
                <TextField
                  id="totalMoney"
                  onChange={(e) => setTotalMoney(e.target.value)}
                  name="totalMoney"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Trạng thái đơn hàng
                </Typography>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  fullWidth
                >
                  <MenuItem value="true">Chưa thanh toán</MenuItem>
                  <MenuItem value="false">Đã thanh toán</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Id giỏ hàng
                </Typography>
                <TextField
                  id="listIdCart"
                  onChange={(e) => setListIdCart(e.target.value)}
                  name="totalPrice"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} style={{ marginTop: '30px' }}>
                <Button
                  type="button"
                  onClick={handleAddOrder}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Thêm Thông tin Khách hàng
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
