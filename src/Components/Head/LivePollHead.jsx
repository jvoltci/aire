import React from 'react';
import {Redirect} from 'react-router-dom';
import {Centered} from  '../Styles.jsx';

import Typography from '@material-ui/core/Typography';
import ButtonMaterialUI from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';


const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const LivePollHead = ({
    onPage,
    switchPage,
}) => {
    const classes = useStyles();

    if(onPage === 0) return <Redirect to={'/'} />

    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                        <ButtonMaterialUI onClick={() => switchPage('', 0)}>
                            <HomeIcon 
                                className={classes.iconHover} 
                                style={{ fontSize: 30, color:'#03fc98' }} />
                        </ButtonMaterialUI>
                    <Typography variant="h6" className={classes.title}>
                        &nbsp; aire
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper>
              
                <Typography variant="h6" className={classes.title}>
                  <Centered>
                     Live Polls
                  </Centered>
                </Typography>
            </Paper>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: "black",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default LivePollHead;