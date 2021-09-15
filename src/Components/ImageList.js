import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    // color: theme.palette.primary.light,
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      color: theme.palette.primary.light,
  },
}));


export default function SingleLineImageList() {
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

  function tileItems(item){
    return <ImageListItem key={item.img}>
              <img src={item.poster_url} alt={item.title}/>
              <ImageListItemBar
                 title={item.title}
                  classes={{
                   root: classes.titleBar,
                 title: classes.title,
                  }}
              //  actionIcon={
              // <IconButton aria-label={`star ${item.title}`}>
              //   <StarBorderIcon className={classes.title} />
              //  </IconButton>
              // }
             />
          </ImageListItem>
  }

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={6} rowHeight={250}>
        {result.map(tileItems)}
      </ImageList>
    </div>
  );
}



 