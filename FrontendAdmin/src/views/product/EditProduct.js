import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'
import { getAllCategories, editProduct, getProductById, getAllColors, getAllSizes } from '../../api/apiService'

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

const EditProduct = () => {
  const classes = useStyles()
  const [checkUpdate, setCheckUpdate] = useState(false)
  const { id: idProduct } = useParams()
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([])
  const [categoryAll, setCategoryAll] = useState([])
  const [errors, setErrors] = useState({});
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState({});
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});

  const navigate = useNavigate()

  // get data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getProductById('products', idProduct)
        console.log(product.data)
        console.log(product.data.category.categoryName)

        setTitle(product.data.title)
        setPrice(product.data.price)
        setDiscount(product.data.discount)
        setQuantity(product.data.quantity)
        setDescription(product.data.description)
        setThumbnail(product.data.thumbnail)
        setSelectedColor(product.data.colors)
        setSelectedSize(product.data.sizes)
        setSelectedCategory(product.data.category)
        setCategories(product.data.category.categoryName)
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
  }, [idProduct])

  // check validation
  const validateFields = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Vui lòng nhập thông tin.";
    }

    if (!description.trim()) {
      newErrors.description = "Vui lòng nhập thông tin.";
    }

    if (!thumbnail.trim()) {
      newErrors.thumbnail = "Vui lòng nhập thông tin.";
    }

    if (isNaN(price)) {
      newErrors.price = "Giá tiền phải là số.";
    } else if (!price) {
      newErrors.price = "Giá tiền không được để trống.";
    }

    if (isNaN(discount)) {
      newErrors.discount = "Giảm giá phải là số.";
    } else if (!discount) {
      newErrors.discount = "Giảm giá không được để trống.";
    }

    if (isNaN(quantity)) {
      newErrors.quantity = "Số lượng phải là số.";
    } else if (!quantity) {
      newErrors.quantity = "Số lượng không được để trống.";
    }

    if (!selectedColor.id) {
      newErrors.colors = "Màu không được để trống.";
    }

    if (!selectedSize.id) {
      newErrors.sizes = "Kích thước không được để trống.";
    }

    if (categories.length === 0) {
      newErrors.categories = "Bạn phải chọn ít nhất một danh mục.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle edit product
  const handleEditProduct = async (event) => {
    event.preventDefault()
    if (
      validateFields()
    ) {
      const product = {
        title,
        price,
        discount,
        quantity,
        description,
        thumbnail,
        colors: { id: selectedColor.id, name: selectedColor.name },
        sizes: { id: selectedSize.id, name: selectedSize.name },
        category: { id: selectedCategory.id, name: selectedCategory.name},
      }
      console.log(product)
      try {
        const editedProduct = await editProduct(`products/${idProduct}`, product)
        if (editedProduct.status === 200) {
          if (thumbnail.length > 0) {
          } else {
            setCheckUpdate(true)
          }
        } else {
          alert('Bạn chưa nhập đủ thông tin!')
        }
      } catch (error) {
        console.error('Error editing product:', error)
      }

    }
  }

  // navigate when update
  useEffect(() => {
    if (checkUpdate) {
      const timeout = setTimeout(() => {
        navigate('/Product/all-product')
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [checkUpdate, navigate])

  // edit categories
  const handleChangeCategories = (event) => {
    const selectedCategoryId = event.target.value;
    const categories = categoryAll.find(c => c.id === selectedCategoryId);
    setSelectedCategory(categories)
  }

  // edit colors
  const handleChangeColor = (event) => {
    const selectedColorId = event.target.value;
    console.log(selectedColorId);
    const color = colors.find(c => c.id === selectedColorId);
    console.log('Selected color object:', color)
    setSelectedColor(color);
  };

  // edit sizes
  const handleChangeSize = (event) => {
    const selectedSizeId = event.target.value;
    console.log(selectedSizeId);
    const size = sizes.find(c => c.id === selectedSizeId);
    console.log('Selected color object:', size)
    setSelectedSize(size);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Cập Nhật sản phẩm
            </Typography>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Sản phẩm
                </Typography>
                <TextField
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  name="title"
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
                  value={price}
                  name="price"
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
                  value={discount}
                  name="discount"
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
                  value={quantity}
                  name="quantity"
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
                  value={description}
                  name="description"
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
                  value={thumbnail}
                  name="thumbnail"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
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
                  value={selectedColor?.id ?? ''}
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
                  value={selectedSize?.id ?? ''}
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
                  id="category"
                  select
                  value={selectedCategory?.id ?? ''}
                  onChange={handleChangeCategories}
                  variant="outlined"
                  className={classes.txtInput}
                  error={!!errors.categories}
                  helperText={errors.categories}
                >
                  {categoryAll.map((categories) => (
                    <MenuItem key={categories.id} value={categories.id}>
                      {categories.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} style={{ marginTop: '30px' }}>
                <Button
                  type="button"
                  onClick={handleEditProduct}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Cập Nhật Sản Phẩm
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default EditProduct
