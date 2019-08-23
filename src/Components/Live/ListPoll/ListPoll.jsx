import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

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

const populate = {
	dummyData: [
	{
		pseudonym: "flai",
		isSecure: true,
	},
	{
		pseudonym: "dejavu",
		isSecure: false,
	},
	{
		pseudonym: "samurai",
		isSecure: false,
	}
	],
}

const ListPoll = ({switchPage}) => {
	const classes = useStyles();
	const data = populate.dummyData.map((unit, i) => {
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
		            onClick={
		            	() => {
		            		if(unit.isSecure)
		            			return switchPage(unit.pseudonym, 4)
		            		else
		            			return switchPage(unit.pseudonym, 5)
		            	}
		            }
		            className={classes.margin} size="small">
	                	Enter
	                </Button>
		    </ListItem>
		)
	})
	return data;
}

export default ListPoll;