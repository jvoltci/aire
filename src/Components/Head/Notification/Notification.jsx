import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ButtonMaterialUI from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

const Notification = ({participantNotify, switchPage}) => {
  	const classes = useStyles();
	return(
		<ButtonMaterialUI
		onClick={() => switchPage(3)}
		>
			<Badge color="secondary" className={classes.margin} invisible={participantNotify} variant="dot">
	          <AccountCircleIcon 
	          style={{color:'#03fc98'}}
	          />
	        </Badge>
		</ButtonMaterialUI>
	)
}

export default Notification;