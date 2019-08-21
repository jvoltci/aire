import React from 'react';

import {Rightened, Transition} from  '../../../useStyles.jsx';

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


const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const PositiveHead = ({classes, handleHomeClick, toggleDialog, handleWarningClick, warning, onPage, switchPage }) => {
    const {iconHover, warn, title, icon} = classes;
    return(
        <AppBar position="static">
            <Toolbar>
                    <ButtonMaterialUI onClick={() => handleHomeClick()}>
                        <HomeIcon 
                            className={iconHover} 
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
                            <span className={warn}>
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
                          handleWarningClick();
                        }}
                        color="secondary"
                        variant="contained"
                        >
                        Confirm
                        </ButtonMaterialUI>
                    </DialogActions>
                </Dialog>
                


                <Typography variant="h6" className={title}>
                    &nbsp; aire
                </Typography>
                <Rightened>
                        <ButtonMaterialUI onClick={() => {
                            if(onPage !== 1)
                                switchPage('', onPage-1)
                        }}>
                            <Grid item xs={8}>
                                <ThreeSixtyIcon 
                                    className={icon}
                                    style={{color:'#03fc98'}}
                                />
                            </Grid>
                        </ButtonMaterialUI>
                </Rightened>
            </Toolbar>
        </AppBar>
    )
       
    }

    export default PositiveHead;