import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { URL_API_USER } from "./../utils";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Solution Cloud
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();

  const [loadingPage, setLoadingPage] = useState(true);
  const [login, setLogin] = useState({
    name: "",
    email: "usuario01@usuario01.com",
    password: "123",
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [createUser, setCreateUser] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    if (localStorage.getItem("fickrUser") !== null) {
      history.push("/home");
    }
    setLoadingPage(false);
  }, []);

  async function handleLogin() {
    if (login.email === "") return alert("Ingrese emial");
    if (login.password === "") return alert("Ingrese password");
    const header = {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch(URL_API_USER + "login", header);
    resp.status === 200
      ? resp.json().then((r) => saveUser(r))
      : resp.text().then((r) => alert(r));
  }

  async function handleCreateUser() {
    if (login.name === "") return alert("Ingrese name");
    if (login.email === "") return alert("Ingrese emial");
    if (login.password === "") return alert("Ingrese password");
    const header = {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch(URL_API_USER + "create", header);
    resp.status === 201
      ? resp.json().then((r) => saveUser(r))
      : resp.text().then((r) => alert(r));
  }

  function saveUser(user) {
    localStorage.setItem("fickrUser", JSON.stringify(user));
    goToMainPage();
  }

  function goToMainPage() {
    //VALIDAR ANTES DE IR AL MAINPAGE
    history.push("/home");
  }

  return (
    <>
      {loadingPage ? (
        <div>Cargando</div>
      ) : (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                {createUser ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={login.name}
                    onChange={(e) =>
                      setLogin({ ...login, name: e.target.value })
                    }
                  />
                ) : null}

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={login.email}
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={login.password}
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}

                {createUser ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    className={classes.submit}
                    onClick={handleCreateUser}
                  >
                    Sign up
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={handleLogin}
                  >
                    Sign In
                  </Button>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => setCreateUser(!createUser)}
                >
                  {createUser ? "Login" : "Create Account"}
                </Button>

                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
}
