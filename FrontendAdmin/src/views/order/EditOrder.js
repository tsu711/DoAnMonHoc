import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { editOrder, getOrderById } from '../../api/apiService'
import { MenuItem, Select } from '@mui/material'

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

const EditOrder = () => {
  const classes = useStyles()
  const [checkUpdate, setCheckUpdate] = useState(false)
  const { id: idOrder } = useParams()
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [totalMoney, setTotalMoney] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  // get data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = await getOrderById('orders', idOrder)
        console.log(order.data)
        setFullname(order.data.fullname)
        setEmail(order.data.email)
        setPhoneNumber(order.data.phoneNumber)
        setAddress(order.data.address)
        setTotalMoney(order.data.totalMoney)
        setStatus(order.data.status)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [idOrder])

  // handle edit order
  const handleEditOrder = async (event) => {
    event.preventDefault()
    if (
      fullname !== '' &&
      email !== '' &&
      phoneNumber !== '' &&
      address !== '' &&
      totalMoney !== ''
    ) {
      const order = {
        fullname,
        email,
        phoneNumber,
        address,
        totalMoney,
        status,
      }
      console.log(order)
      try {
        const editedOrder = await editOrder(`orders/${idOrder}`, order)
        if (editedOrder.status === 200) {
          setCheckUpdate(true)
        } else {
          alert('Bạn chưa nhập đủ thông tin!')
        }
      } catch (error) {
        console.error('Error editing order:', error)
      }
    }
  }

  // navigate after update
  useEffect(() => {
    if (checkUpdate) {
      const timeout = setTimeout(() => {
        navigate('/Order/all-order')
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [checkUpdate, navigate])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Cập Nhật Đơn Hàng
            </Typography>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Họ và tên
                </Typography>
                <TextField
                  id="fullname"
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
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
                  value={phoneNumber}
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
                  value={email}
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
                  value={address}
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
                  value={totalMoney}
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
                  <MenuItem value="Chưa thanh toán">Chưa thanh toán</MenuItem>
                  <MenuItem value="Đã thanh toán">Đã thanh toán</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} style={{ marginTop: '30px' }}>
                <Button
                  type="button"
                  onClick={handleEditOrder}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Cập Nhật Đơn hàng
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default EditOrder
