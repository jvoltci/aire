import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

const ListPoll = ({polls, switchPage}) => {
	const classes = useStyles();
	if(!polls) return null;

	const data = polls.map((unit, i) => {
		return(
			<ListItem key={i} >
		            <SnackbarContent
		              aria-describedby="client-snackbar"
		              message={
		                <Badge 
		                className={classes.margin}
		                invisible={!unit.isSecure}
		                color='secondary'
		                variant="dot" 
		                >
					        <Typography className={classes.padding}>
					        {unit.pseudonym}
					        </Typography>
					    </Badge>
		              }
		            />
		            <Button 
		            onClick={() => switchPage(unit.pseudonym, 4)}
		            className={classes.margin} size="small">
	                	Enter
	                </Button>
		    </ListItem>
		)
	})
	return data;
}

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
   padding: {
    padding: theme.spacing(0, 2),
  },
}));


export default ListPoll;