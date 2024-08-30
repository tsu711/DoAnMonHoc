import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import {  editUser, getUserById } from '../../api/apiService'

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

const EditUser = () => {
  const classes = useStyles()
  const [checkUpdate, setCheckUpdate] = useState(false)
  const { id: idUser } = useParams()
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById('users', idUser)
        console.log(user.data)
        setFullName(user.data.fullname)
        setEmail(user.data.email)
        setPhoneNumber(user.data.phone_number)
        setAddress(user.data.address)
        setPassword(user.data.password)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [idUser])
  const handleEditUser = async (event) => {
    event.preventDefault()
    if (
        fullname !== "" &&
        email !== "" &&
        phone_number !== "" &&
        address !== "" &&
        password !== "" 
    ) {
      const user = {
        fullname,
        email,
        phone_number,
        address,
        password,
      }
      console.log(user)
      try {
        const editedUser = await editUser(`users/${idUser}`, user)
        if (editedUser.status === 200) {
            setCheckUpdate(true)         
        } else {
          alert('Bạn chưa nhập đủ thông tin!')
        }
      } catch (error) {
        console.error('Error editing user:', error)
      }
    }
  }

  useEffect(() => {
    if (checkUpdate) {
      const timeout = setTimeout(() => {
        navigate('/User/all-user')
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
              Cập Nhật Thông Tin Người Dùng
            </Typography>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Họ và tên
                </Typography>
                <TextField
                  id="fullname"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullname}
                  name="fullname"
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
                  Số điện thoại
                </Typography>
                <TextField
                  id="phone_number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={[phone_number]}
                  name="phone_number"
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
                  Mật khẩu
                </Typography>
                <TextField
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"

                />
              </Grid>

              <Grid item xs={12} style={{ marginTop: '30px' }}>
                <Button
                  type="button"
                  onClick={handleEditUser}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Cập Nhật Người Dùng
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default EditUser
