import React, { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


export default function ReleasedMoviesList() {
  const classes = useStyles();

  const [result,setResult] = useState([]);

  async function getMovieList() {    
      const rawResponse = await fetch('http://localhost:8085/api/v1/movies?page=1&limit=50');  
      const data = await rawResponse.json();
      setResult(data.movies);    
  }


  useEffect(() => {
    getMovieList();  
  }, [])

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList} cols={4}>
        <ImageListItem key="Subheader" cols={2} style={{ height: '350' }}>
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem>
        {result.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.poster_url} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
