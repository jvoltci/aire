import React from 'react';

import {Transition} from  '../Styles.jsx';

import ButtonMaterialUI from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from '@material-ui/core/Grid';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const PositiveHead = ({ participantNotify, handleHomeClick, toggleDialog, warnClick, warning, onPage, switchPage }) => {
    const classes = useStyles();
    return(
        <AppBar position="static">
            <Toolbar>
                    <ButtonMaterialUI onClick={() => handleHomeClick()}>
                        <HomeIcon 
                            className={classes.iconHover} 
                            style={{ fontSize: 30, color:'#03fc98' }} />
                    </ButtonMaterialUI>
                <Dialog
                    open={warning}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                >
                    <DialogActions>
                        <DialogContentText>
                            <span className={classes.warn}>
                                Are you sure?
                            </span>
                        </DialogContentText>
                        <ButtonMaterialUI 
                        color="secondary"
                        variant="outlined"
                        onClick={() => toggleDialog("warn", false)}
                        >
                        Cancel
                        </ButtonMaterialUI>
                        <ButtonMaterialUI
                        onClick={() => {
                          warnClick();
                        }}
                        color="secondary"
                        variant="contained"
                        >
                        Confirm
                        </ButtonMaterialUI>
                    </DialogActions>
                </Dialog>
                


                <Typography variant="h6" className={classes.title}>
                    &nbsp; aire
                </Typography>
                {
                    onPage === 2?

                    <ButtonMaterialUI onClick={() => {
                        if(onPage !== 1)
                            switchPage(onPage-1)
                    }}>
                        <Grid item xs={8}>
                            <ThreeSixtyIcon 
                                className={classes.icon}
                                style={{color:'#03fc98'}}
                            />
                        </Grid>
                    </ButtonMaterialUI> :

                    null
                }
            </Toolbar>
        </AppBar>
    )
       
    }

const useStyles = makeStyles(theme => ({
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: "black",
    },
  },
  icon: {
    margin: theme.spacing(0),
    fontSize: 30,
  },
  title: {
    flexGrow: 1,
  },
  warn: `
    color: red;
    padding: 0 30px;
  `,
}));

export default PositiveHead;