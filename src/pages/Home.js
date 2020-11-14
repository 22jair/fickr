import {
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  TextField,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { PhotoCamera } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FotosList from "../components/FotosList";
import {} from "path";
import PhotoPreview from "../components/PhotoPreview";
import { useHistory } from "react-router-dom";
import { URL_API_IMG } from "./../utils";

const StyledRoot = styled(Grid)`
  height: 100vh;
  width: 100%;
`;

const StyledCanva = styled(Grid)`
  height: ${(props) => props.height || "initial"};
  width: ${(props) => props.width || "initial"};
`;

const TopContainer = styled(Grid)`
  /* margin: 10px;
  padding: 20px; */
`;

function Home() {
  const history = useHistory();

  const [imageUrl, setImageUrl] = useState("No has seleccionado ninguna foto");
  const [showPreview, setShowPreview] = useState(false);

  const [loadingPage, setLoadingPage] = useState(true);
  const [user, setUser] = useState({ id: 0, name: "Usuario" });
  const [title, setTitle] = useState("");
  const [imgLoad, setImgLoad] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setLoadingPage(true);
    if (localStorage.getItem("fickrUser") === null) {
      history.push("/");
    }
    getUser();
    getAllImagesList();
    setLoadingPage(false);
  }, []);

  const getUser = async () => {
    setUser(JSON.parse(localStorage.getItem("fickrUser")));
  };

  const getAllImagesList = async () => {
    const resp = await fetch(URL_API_IMG);
    resp.status === 200
      ? resp.json().then((r) => setImages(r))
      : resp.text().then((r) => alert(r));
  };

  const getImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      /*let reader = new FileReader();
            reader.onload = (e) => {
            this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);*/
      //console.log(event.target.files[0])
      setImageUrl(URL.createObjectURL(event.target.files[0]));
      setShowPreview(true);

      setImgLoad(event.target.files[0]);
    }
  };

  const handleLoadImg = async () => {
    if (title === "") return alert("Ingrese un título");

    let formData = new FormData();
    formData.append("file", imgLoad);
    formData.append("title", title);
    formData.append("userid", user.id);

    const header = {
      method: "POST",
      body: formData,
    };
    const resp = await fetch(URL_API_IMG + "create", header);
    console.log(resp);
    resp.status === 201
      ? imgSuccessCreate()
      : resp.text().then((r) => alert(r));
  };

  const imgSuccessCreate = () => {
    alert("La imagen fue subida con exito");
    getAllImagesList();
    ClearAll();
  };

  const handleSignUp = () => {
    setUser(localStorage.removeItem("fickrUser"));
    history.push("/");
  };

  const ClearAll = () => {
    setImageUrl("No has seleccionado ninguna foto");
    setShowPreview(false);
    setTitle("");
    setImgLoad(null);
  };

  const handleMyPhotos = () => {

  }
  const handleAllPhotos = () => {

  }
  return (
    <>
      {loadingPage ? (
        <div>Cargando</div>
      ) : (
        <div style={{ height: "100vh", width: "100%" }}>
          <StyledCanva height={"100%"} container direction="column">
            <TopContainer
              style={{
                height: "10%",
                borderBottom: "1px solid rgba(0,0,0,.2)",
              }}
              container
              justify="space-evenly"
              direction="row"
              alignItems="center"
            >
              <div>
                <Typography variant="h4">Flickr</Typography>
              </div>

              <div style={{ display: "flex" }}>
                <Typography
                  style={{ marginRight: "20px", alignSelf: "center" }}
                  variant="subtitle1"
                >
                  {user.name}
                </Typography>
                <Button onClick={handleSignUp} variant="outlined">
                  Salir
                </Button>
              </div>
            </TopContainer>

            {/* MAIN CONTAINER */}
            <Grid container style={{ height: "90%", padding: "70px 100px" }}>
              {/* Subir Img */}
              <Grid item xs={12} md={4}>
                <div
                  style={{
                    maxWidth: "300px",
                    margin: "0  auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h4">
                    ¡Comparte tu foto con los demás!
                  </Typography>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => getImage(e)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Título"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginBottom: "20px" }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      style={{ marginBottom: "20px", width: "100%" }}
                      startIcon={<CloudUploadIcon />}
                    >
                      Elige una foto
                    </Button>
                  </label>
                  {showPreview && (
                    <PhotoPreview image={imageUrl} onClick={handleLoadImg} />
                  )}
                </div>
              </Grid>
              {/* Lista de Fotos */}
              <Grid item xs={12} md={8}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: "0 40px",
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px"
                  }}>
                    {/* <Button onClick={handleMyPhotos} variant="outlined" style={{ margin: "0 10px", width:"40%"}}>
                      Mis Fotos
                    </Button>
                    <Button onClick={handleAllPhotos} variant="outlined"  style={{ margin: "0 10px",  width:"40%" }}>
                      Todas Las Fotos
                    </Button> */}
                  </div>
                  <FotosList data={images} title={"Ultimas Publicaciones"} />
                </div>
              </Grid>
            </Grid>
          </StyledCanva>
        </div>
      )}
    </>
  );
}

export default Home;
