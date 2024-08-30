import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../../api/apiService'
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

export default function AddUser() {
  const classes = useStyles()
  const [checkAdd, setCheckAdd] = useState(false)
  const [username, setUserName] = useState('')
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // check validation
  const validateFields = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!fullname) {
      newErrors.fullname = 'Tên không được để trống.'
    } else if (/\d/.test(fullname)) {
      newErrors.fullname = 'Tên không được chứa số.'
    }
    if (!email) {
      newErrors.email = 'email không được để trống.'
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'email phải nhập đúng định dạng.'
    }
    if (!phone_number) {
      newErrors.phone_number = 'Số điện thoại không được để trống.'
    } else if (isNaN(phone_number)) {
      newErrors.phone_number = 'Số điện thoại phải là số.'
    } else if (phone_number.length !== 10) {
      newErrors.phone_number = 'Số điện thoại chỉ có đúng 10 số.'
    }
    if (!address) {
      newErrors.address = 'Địa chỉ không được để trống.'
    }
    if (!password) {
      newErrors.password = 'Mật khẩu không được để trống.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleAddUser = async (event) => {
    event.preventDefault()
    if (validateFields()) {
      const user = {
        username,
        fullname,
        email,
        phone_number,
        address,
        password,
      }
      console.log(user)
      try {
        const registeredUser = await addUser('users/register', user)
        navigate('/User/all-user')
        console.log('Registered user:', registeredUser)
      } catch (error) {
        console.error('Error registering user:', error)
      }
    }
  }
  useEffect(() => {
    if (checkAdd) {
      // const timeout = setTimeout(() => {
      //   navigate('/User/all-user')
      // }, 1000)
      // return () => clearTimeout(timeout)
    }
  }, [checkAdd, navigate])
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Thêm Thông tin Khách Hàng
            </Typography>

            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Tên đăng nhập
                </Typography>
                <TextField
                  id="username"
                  onChange={(e) => setUserName(e.target.value)}
                  name="username"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Họ và tên
                </Typography>
                <TextField
                  id="fullname"
                  onChange={(e) => setFullName(e.target.value)}
                  name="fullname"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  error={!!errors.fullname}
                  helperText={errors.fullname}
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
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Số điện thoại
                </Typography>
                <TextField
                  id="phone_number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  name="phone_number"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  error={!!errors.phone_number}
                  helperText={errors.phone_number}
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
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Mật khẩu
                </Typography>
                <TextField
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>

              <Grid item xs={12} style={{ marginTop: '30px' }}>
                <Button
                  type="button"
                  onClick={handleAddUser}
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
