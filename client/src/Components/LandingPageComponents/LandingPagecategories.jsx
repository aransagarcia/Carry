import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { LandingContext } from "../../Contexts/LandingPageDetailsContext"
// styling 
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import customTheme from "../styling/customTheme";
// import IconButton from "@material-ui/core/IconButton";
// import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    spacing: "20px"
  },
  title: {
    color: customTheme.palette.secondary.dark,
  },
  titleBar: {
    background: "white",
    textAlign: "center",
    // 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  imgFullHeight: {
    height: "100%",
    transform: "translateX(-50%)",
    position: "relative",
    left: '50px',
    borderRadius: '50%'
  },
  imgFullWidth: {
    width: "100%",
    position: "relative",
    transform: "translateY(-50%)",
    top: "50%",
  },
}));

export default function Categories() {
  const classes = useStyles();
  const { categories, setCategories } = useContext(	LandingContext)
  
  // make network request to server to get all categories
  useEffect(() => {
     async function fetchCategories() {
      try {
        const res =  await axios.get('/products/categories/all')
        setCategories(res.data.payload);
      } catch (error) {
        setCategories([]);
        console.log(error);
      }
    }
    fetchCategories();
  }, []);

console.log('landing page categories',categories)
  return (
    <div>
      <div>
        <h2  style={{
            fontFamily: "Palatino Linotype",
            textAlign: "left",
            // fontSize: "20px",
            color: customTheme.palette.secondary.dark,
          }}
        > Shop By Category </h2>
      </div>
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.5} 
             item xs= {12} sm={6} md= {4} lg={3} xl= {2}
             spacing= {25} 
             cellHeight = {350}
            >
        {categories.map((tile)  => (
          <GridListTile  
          key={tile.category_id} >
           <Link to={`/categories/${tile.categories_name}`}>
            <img
              src={tile.category_logo}
              alt={tile.title}
              style={{ width: '100%' , height: '100%', objectScale: 'scale-down'}}
            />
              <GridListTileBar
                title={tile.categories_name}
                
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
    </div>
  );
}
