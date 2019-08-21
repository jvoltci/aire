import React from 'react';
import {Redirect} from 'react-router-dom';

import useStyles, {Centered} from  '../useStyles.jsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ButtonMaterialUI from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SvgIcon from '@material-ui/core/SvgIcon';


const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const LivePoll = ({switchPage, onPage}) => {
	const classes = useStyles();
	const {iconHover, title} = classes;

	if(onPage === 0) return <Redirect to={'/'} />

	return(
		<div>
			<AppBar position="static">
                <Toolbar>
	                    <Centered>
	                    	<ButtonMaterialUI onClick={() => switchPage('', 0)}>
		                        <HomeIcon 
		                            className={iconHover} 
		                            style={{ fontSize: 30, color:'#03fc98' }} />
		                    </ButtonMaterialUI>
	                    </Centered>
	                <Typography variant="h6" className={title}>
	                    &nbsp; aire
	                </Typography>
	            </Toolbar>
	        </AppBar>

	        <React.Fragment>
		      <CssBaseline />
		      <Container maxWidth="sm">
		        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
		      </Container>
		    </React.Fragment>
		</div>
	)
}

export default LivePoll;