import {
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  TextField,
  Box,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { PhotoCamera } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FotosList from "../components/FotosList";
import {} from "path";
import PhotoPreview from "../components/PhotoPreview";
import { useHistory } from "react-router-dom";
import { URL_API_IMG } from "../utils";

const StyledCanva = styled(Grid)`
  height: ${(props) => props.height || "initial"};
  width: ${(props) => props.width || "initial"};
`;

const TopContainer = styled(Container)`
  margin: 10px;
  padding: 20px;
`;
function Home2() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <StyledCanva
        style={{ background: "red" }}
        // width={"100%"}
        height={"100%"}
        container
        direction="column"
      >
        <Grid style={{ background: "#ccc", height: "10%" }}
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
              nombre
            </Typography>
            <Button  variant="outlined">
              Salir
            </Button>
          </div>
        </Grid>

        <Grid container style={{ background: "yellow", height: "90%"}}>
           
            <Grid 
              item 
              xs={8} 
              // direction="column"     
              style={{ background: "pink"}}>
                <div style={{ display:"flex", justifyContent: "center"}}>
                  <div>foro</div>
                  <div>foro</div>
                  <div>foro</div>
                </div>

              </Grid>

            <Grid item xs={4} style={{ background: "skyblue"}}>

              <div style={{ display:"flex", justifyContent: "center"}}>
                  <div>foro</div>
                  <div>foro</div>
                  <div>foro</div>
                </div>

            </Grid>
        </Grid>



      </StyledCanva>
    </div>
  );
}

export default Home2;
