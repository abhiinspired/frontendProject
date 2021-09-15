import React from 'react';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import SimpleTabs from '../../Components/loginAndRegister';
import './Header.css';


  
  function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function Header() {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <SimpleTabs />
      </div>
    );
    

    return (
        <div className = "flexContainer">
            <img src={logo} />
            <div>
                <Button 
                  className = "bookShowButton" 
                  variant="contained" 
                  color="primary">
                    Book Show
                </Button>
                
                <Button 
                    className= "logoutButton"
                    variant="contained" 
                    color="default">                    
                    Logout
                </Button>

                <Button 
                    variant="contained" 
                    color="default"
                    onClick={handleOpen}
                    className="loginButton">                    
                    Login
                </Button>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                 </Modal>
            </div>
        </div>
    );
}