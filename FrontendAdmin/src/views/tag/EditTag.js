import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import {  editTag, getTagById } from '../../api/apiService'

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

const EditTag = () => {
  const classes = useStyles()
  const [checkUpdate, setCheckUpdate] = useState(false)
  const { id: idTag } = useParams()
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tag = await getTagById('tags', idTag)
        console.log(tag.data)
        setName(tag.data.name)
        setIcon(tag.data.icon)
       
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [idTag])
  const handleEditTag = async (event) => {
    event.preventDefault()
    if (  
        name !== "" &&
        icon !== ""
    ) {
      const tag = {
        name,
        icon,
        
      }
      console.log(tag)
      try {
        const editedTag = await editTag(`tags/${idTag}`, tag)
        if (editedTag.status === 200) {
            setCheckUpdate(true)         
        } else {
          alert('Bạn chưa nhập đủ thông tin!')
        }
      } catch (error) {
        console.error('Error editing tag:', error)
      }
    }
  }

  useEffect(() => {
    if (checkUpdate) {
      const timeout = setTimeout(() => {
        navigate('/Tag/all-tag')
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
              Cập Nhật Thương Hiệu
            </Typography>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Thương hiệu
                </Typography>
                <TextField
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="name"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Biểu tượng
                </Typography>
                <TextField
                  id="icon"
                  onChange={(e) => setIcon(e.target.value)}
                  value={icon}
                  name="icon"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"

                />
              </Grid>
     
              <Grid item xs={12} style={{ marginTop: '30px' }}>
                <Button
                  type="button"
                  onClick={handleEditTag}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Cập Nhật Thương hiệu
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default EditTag
