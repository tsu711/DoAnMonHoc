import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {addTag } from "../../api/apiService";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  txtInput: {
    width: "98%",
    margin: "10px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddTag() {
  const classes = useStyles();
  const [checkAdd, setCheckAdd] = useState(false);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();

  const handleAddTag = (event) => {
    event.preventDefault();
    if (
        name !== "" &&
        icon !== ""
    ) {
      const tag = {
        name,
        icon,
      };
      console.log(tag);
      addTag("tags", tag).then((item) => {
        console.log("added", item);
        if (item.status === 201) {
          setCheckAdd(true);
        } else {
          alert("Bạn chưa nhập đủ thông tin!");
        }
      });
    } else {
      alert("Bạn chưa nhập đủ thông tin!");
    }
  };
  useEffect(() => {
    if (checkAdd) {
      const timeout = setTimeout(() => {
        navigate("/Tag/all-tag");
      }, 1000); 
      return () => clearTimeout(timeout);
    }
  }, [checkAdd, navigate]);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h4">
              Thêm Thương Hiệu
            </Typography>

            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  Tên thương hiệu
                </Typography>
                <TextField
                  id="name"
                  onChange={(e) => setName(e.target.value)}
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
                  name="icon"
                  variant="outlined"
                  className={classes.txtInput}
                  size="small"
                />
              </Grid>           

              <Grid item xs={12} style={{ marginTop: "30px" }}>
                <Button
                  type="button"
                  onClick={handleAddTag}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Thêm Thương Hiệu
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
