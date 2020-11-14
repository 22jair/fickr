import React from 'react';
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    maxWidth: "1000px",
    minWidth: "450px",
    height: 560,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function FotosList({data = [], title = "Titulo de Lista"}) {
  const classes = useStyles();
  const dataReverse = [...data].reverse()
  return (
    <div className={classes.root}>
      
    <Typography variant="h4"  style={{ marginBottom: "20px",   textAlign: "center"}} >{title}</Typography>

      <GridList cellHeight={180} className={classes.gridList} cols={3}>
        
        {dataReverse.map((img,index) => (
          <GridListTile key={img.id}>
            <img src={img.url} alt={img.title} style={{objectFit:"cover"}} />
            {/* <img src={img.img} alt={img.title} /> */}
            <GridListTileBar
              title={img.title}
              subtitle={<span>by: {img.user.name}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${img.title}`} className={classes.icon}>
                  {/* <InfoIcon /> */}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}