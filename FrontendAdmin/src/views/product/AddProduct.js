import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { getAllCategories, addProduct, getAllColors, getAllSizes } from '../../api/apiService'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'

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

export default function Product() {
  const classes = useStyles()
  const [checkAdd, setCheckAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(null)
  const [discount, setDiscount] = useState(null)
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [quantity, setQuantity] = useState('')
  const [categories, setCategories] = useState([])
  const [categoryAll, setCategoryAll] = useState([])
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [colors, setColors] = useState([])
  const [selectedColor, setSelectedColor] = useState({})
  const [sizes, setSizes] = useState([])
  const [selectedSize, setSelectedSize] = useState({})

  // get data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getAllCategories('categories')
        setCategoryAll(categoryData.data)
        const colorData = await getAllColors('colors')
        setColors(colorData.data)
        const sizeData = await getAllSizes('sizes')
        setSizes(sizeData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  // check validation
  const validateFields = () => {
    const newErrors = {}
    if (thumbnail.length === 0) {
      newErrors.thumbnail = 'Bạn phải chọn ít nhất một ảnh.'
    }
    if (isNaN(price) || price === null || price === '') {
      newErrors.price = 'Giá tiền phải là số và không được để trống.'
    }
    if (isNaN(discount) || discount === null || discount === '') {
      newErrors.discount = 'Giảm giá phải là số và không được để trống.'
    }
    if (isNaN(quantity) || quantity === null || quantity === '') {
      newErrors.quantity = 'Số lượng phải là số và không được để trống.'
    }
    if (!title) {
      newErrors.title = 'Tên sản phẩm không được để trống.'
    }
    if (!description) {
      newErrors.description = 'Mô tả không được để trống.'
    }
    if (!selectedColor.id) {
      newErrors.colors = 'Màu không được để trống.'
    }
    if (!selectedSize.id) {
      newErrors.sizes = 'Kích thước không được để trống.'
    }

    if (categories.length === 0) {
      newErrors.categories = 'Bạn phải chọn ít nhất một danh mục.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // handle add product
  const handleAddProduct = (event) => {
    event.preventDefault()
    if (validateFields()) {
      const product = {
        title,
        price,
        discount,
        description,
        quantity,
        colors: { id: selectedColor.id, name: selectedColor.name },
        sizes: { id: selectedSize.id, name: selectedSize.name },
      }
      addProduct('products', product).then((item) => {
        if (item.status === 201) {
          setCheckAdd(true)
          console.log(item)
        } else {
          alert('Bạn chưa nhập đủ thông tin!')
        }
      })
    } else {
      alert('Bạn chưa nhập đủ thông tin!')
    }
  }

  // navigate when update
  useEffect(() => {
    if (checkAdd) {
      const timeout = setTimeout(() => {
        navigate('/Product/all-product')
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [checkAdd, navigate])

  // add categories
  const handleChangeCategories = (event) => {
    const selectedIds = event.target.value
    setCategories(selectedIds)
  }

  // add color
  const handleChangeColor = (event) => {
    const selectedColorId = event.target.value
    const color = colors.find((c) => c.id === selectedColorId)
    setSelectedColor(color)
  }

  // add size
  const handleChangeSize = (event) => {
    const selectedSizeId = event.target.value
    const size = sizes.find((c) => c.id === selectedSizeId)
    setSelectedSize(size)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Thêm sản phẩm
            </Typography>

            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Sản phẩm
                </Typography>
                <TextField
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Giá tiền
                </Typography>
                <TextField
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  error={!!errors.price}
                  helperText={errors.price}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Giá gốc
                </Typography>
                <TextField
                  id="discount"
                  onChange={(e) => setDiscount(e.target.value)}
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  error={!!errors.discount}
                  helperText={errors.discount}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Số lượng
                </Typography>
                <TextField
                  id="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Mô tả sản phẩm
                </Typography>
                <TextField
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  className={classes.txtInput}
                  multiline
                  rows={4}
                  variant="outlined"
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Hình ảnh
                </Typography>
                <TextField
                  id="thumbnail"
                  onChange={(e) => setThumbnail(e.target.value)}
                  className={classes.txtInput}
                  multiline
                  rows={4}
                  variant="outlined"
                  error={!!errors.thumbnail}
                  helperText={errors.thumbnail}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Chọn màu sản phẩm
                </Typography>
                <TextField
                  id="colors"
                  select
                  value={selectedColor.id}
                  onChange={handleChangeColor}
                  variant="outlined"
                  className={classes.txtInput}
                  error={!!errors.colors}
                  helperText={errors.colors}
                >
                  {colors.map((color) => (
                    <MenuItem key={color.id} value={color.id}>
                      {color.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Chọn kích thước sản phẩm
                </Typography>
                <TextField
                  id="sizes"
                  select
                  value={selectedSize.id}
                  onChange={handleChangeSize}
                  variant="outlined"
                  className={classes.txtInput}
                  error={!!errors.sizes}
                  helperText={errors.sizes}
                >
                  {sizes.map((size) => (
                    <MenuItem key={size.id} value={size.id}>
                      {size.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Chọn danh mục
                </Typography>
                <TextField
                  id="categories"
                  name="categories"
                  select
                  value={categories}
                  onChange={handleChangeCategories}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => {
                      const selectedCategories = selected.map((id) => {
                        const category = categoryAll.find((category) => category.id === id)
                        return category ? category.categoryName : ''
                      })
                      return selectedCategories.join(', ')
                    },
                  }}
                  variant="outlined"
                  className={classes.txtInput}
                  error={!!errors.categories}
                  helperText={errors.categories}
                >
                  {categoryAll.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '30px' }}>
                <Button
                  type="button"
                  onClick={handleAddProduct}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Thêm Sản Phẩm
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
